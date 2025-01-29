import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useStripeCheckout } from "./use-stripe-checkout";
import { CartItem } from "@/contexts/CartContext";

export function useCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { createCheckoutSession } = useStripeCheckout();

  const handleCheckout = async (selectedPlanId: string, items?: CartItem[]) => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to continue");
        return null;
      }

      if (selectedPlanId) {
        // Handle subscription checkout
        console.log("Starting subscription checkout for user:", user.id);
        console.log("Selected plan ID:", selectedPlanId);
        
        const { error, url } = await createCheckoutSession(selectedPlanId);
        
        if (error) {
          console.error("Subscription checkout error:", error);
          toast.error("Failed to start checkout process. Please try again.");
          return null;
        }
        
        return url;
      } else if (items && items.length > 0) {
        // Handle one-time purchase checkout
        console.log("Starting product checkout for user:", user.id);
        const { error, url } = await createCheckoutSession(null, items);
        
        if (error) {
          console.error("Product checkout error:", error);
          toast.error("Failed to start checkout process. Please try again.");
          return null;
        }
        
        return url;
      } else {
        toast.error("No items in cart");
        return null;
      }
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