import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { toast } from "sonner";
import { PlanSelector } from "./subscription/PlanSelector";
import { useSubscriptionPlans } from "@/hooks/use-subscription-plans";
import { useCheckout } from "@/hooks/use-checkout";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const { data: subscriptionPlans, isLoading: plansLoading } = useSubscriptionPlans();
  const { handleCheckout, isProcessing } = useCheckout();
  const { items } = useCart();

  const initiateCheckout = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to complete your purchase");
        return;
      }

      const checkoutUrl = await handleCheckout(selectedPlanId, items);
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  return (
    <div className="border-t pt-4 space-y-4 animate-fade-in">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-bourbon-600">Free</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {subscriptionPlans && (
        <PlanSelector
          plans={subscriptionPlans}
          selectedPlanId={selectedPlanId}
          onPlanSelect={setSelectedPlanId}
        />
      )}

      <div className="space-y-2">
        <Button 
          className="w-full bg-bourbon-600 hover:bg-bourbon-700 transition-colors group"
          onClick={initiateCheckout}
          disabled={isProcessing}
        >
          <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {isProcessing ? "Processing..." : selectedPlanId ? "Subscribe Now" : "Checkout"}
        </Button>
      </div>
    </div>
  );
}