import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { Database } from '../../../src/integrations/supabase/types'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function handleSubscriptionCreated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const customerId = subscription.customer as string

  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (customerError || !customer) {
    throw new Error('Customer not found')
  }

  await supabase.from('subscriptions').insert({
    customer_id: customer.id,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    plan_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000),
    current_period_end: new Date(subscription.current_period_end * 1000),
    cancel_at_period_end: subscription.cancel_at_period_end,
  })
}

export async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription

  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id)
}

export async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription

  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
    })
    .eq('stripe_subscription_id', subscription.id)
}