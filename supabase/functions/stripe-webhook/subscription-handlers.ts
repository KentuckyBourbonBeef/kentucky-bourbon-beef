import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import Stripe from 'https://esm.sh/stripe@14.21.0'

export async function handleSubscriptionEvent(
  event: Stripe.Event,
  supabaseClient: ReturnType<typeof createClient>,
  subscription: Stripe.Subscription,
  stripe: Stripe
) {
  const customerId = subscription.customer;
  
  // Get customer email from Stripe
  const customer = await stripe.customers.retrieve(customerId as string);
  if (!customer.email) return;

  // Get user from Supabase
  const { data: userData, error: userError } = await supabaseClient
    .from('customers')
    .select('id')
    .eq('email', customer.email)
    .single();

  if (userError) throw userError;

  // Get subscription plan from Supabase
  const { data: planData, error: planError } = await supabaseClient
    .from('subscription_plans')
    .select('id')
    .eq('stripe_price_id', subscription.items.data[0].price.id)
    .single();

  if (planError) throw planError;

  // Update subscription in Supabase
  const { error: subscriptionError } = await supabaseClient
    .from('subscriptions')
    .upsert({
      customer_id: userData.id,
      plan_id: planData.id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      cancel_at_period_end: subscription.cancel_at_period_end,
    });

  if (subscriptionError) throw subscriptionError;
}

export async function handleSubscriptionDeletion(
  supabaseClient: ReturnType<typeof createClient>,
  subscription: Stripe.Subscription
) {
  const { error } = await supabaseClient
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  if (error) throw error;
}