import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Received request to create-checkout");

  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Parsing request body...");
    const { priceId, items } = await req.json();
    console.log("Request data:", { priceId, items });

    console.log("Initializing Supabase client...");
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    console.log("Getting user from auth header...");
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user?.email) {
      console.error("User authentication error:", userError);
      throw new Error('User not authenticated');
    }

    console.log("Authenticated user:", user.email);

    console.log("Initializing Stripe...");
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    console.log("Checking for existing customer...");
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId = undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    }

    let sessionConfig;
    if (priceId) {
      // Subscription checkout
      sessionConfig = {
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
      };
    } else if (items) {
      // One-time purchase checkout
      sessionConfig = {
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: item.image_url ? [item.image_url] : undefined,
            },
            unit_amount: Math.round(Number(item.price) * 100), // Convert to cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
      };
    } else {
      throw new Error('Invalid checkout configuration');
    }

    // Add success and cancel URLs
    sessionConfig.success_url = `${req.headers.get('origin')}/success`;
    sessionConfig.cancel_url = `${req.headers.get('origin')}/cancel`;

    console.log('Creating checkout session with config:', sessionConfig);
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log("Checkout session created:", session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in create-checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});