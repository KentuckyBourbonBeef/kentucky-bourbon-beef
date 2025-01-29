import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useStripeCheckout } from "./use-stripe-checkout";

export function useCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { createCheckoutSession } = useStripeCheckout();

  const handleCheckout = async (selectedPlanId: string) => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to subscribe");
        return null;
      }

      if (!selectedPlanId) {
        toast.error("Please select a subscription plan");
        return null;
      }

      console.log("Starting checkout process for user:", user.id);
      console.log("Selected plan ID:", selectedPlanId);
      
      const { error, url } = await createCheckoutSession(selectedPlanId);
      
      if (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to start checkout process. Please try again.");
        return null;
      }
      
      return url;
    } catch (error) {
      console.error("Unexpected error during checkout:", error);
      toast.error("An unexpected error occurred. Please try again.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleCheckout,
    isProcessing
  };
}