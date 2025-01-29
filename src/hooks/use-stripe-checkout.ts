import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;

      return { url: data?.url, error: null };
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