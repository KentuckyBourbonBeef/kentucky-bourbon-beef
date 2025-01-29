import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    console.log("Creating checkout session for price:", priceId);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      console.log("Checkout session response:", { data, error });

      if (error) {
        console.error("Error creating checkout session:", error);
        return { error, url: null };
      }

      return { error: null, url: data?.url };
    } catch (error) {
      console.error("Error in createCheckoutSession:", error);
      return { error, url: null };
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading
  };
}