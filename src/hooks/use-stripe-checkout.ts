import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    setLoading(true);
    try {
      console.log("Creating checkout session for price:", priceId);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) {
        console.error("Supabase function error:", error);
        return { url: null, error };
      }

      console.log("Checkout session response:", data);

      if (!data?.url) {
        console.error("No URL in response:", data);
        return { url: null, error: new Error("No checkout URL returned") };
      }

      return { url: data.url, error: null };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return { url: null, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
  };
}