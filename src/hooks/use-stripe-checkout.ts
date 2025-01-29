import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    console.log("Starting createCheckoutSession with priceId:", priceId);
    setLoading(true);
    
    try {
      console.log("Invoking create-checkout function...");
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      console.log("Function response:", { data, error });

      if (error) {
        console.error("Function error:", error);
        return { url: null, error };
      }

      if (!data?.url) {
        console.error("No URL in response:", data);
        return { url: null, error: new Error("No checkout URL returned") };
      }

      console.log("Successfully received checkout URL:", data.url);
      return { url: data.url, error: null };
    } catch (error) {
      console.error('Error in createCheckoutSession:', error);
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