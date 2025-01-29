import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature', { status: 400 });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured');
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    console.log('Processing webhook event:', event.type);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(customerId as string);
        if (!customer.email) break;

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
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        const { error } = await supabaseClient
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);

        if (error) throw error;
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});