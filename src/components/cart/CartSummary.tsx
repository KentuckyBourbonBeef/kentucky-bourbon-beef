import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { useState } from "react";
import { toast } from "sonner";
import { PlanSelector } from "./subscription/PlanSelector";
import { useSubscriptionPlans } from "@/hooks/use-subscription-plans";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  const { createCheckoutSession, loading } = useStripeCheckout();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const { data: subscriptionPlans, isLoading: plansLoading } = useSubscriptionPlans();

  const handleCheckout = async () => {
    try {
      if (!selectedPlanId) {
        toast.error("Please select a subscription plan");
        return;
      }
      
      console.log("Starting checkout process with plan:", selectedPlanId);
      const { error, url } = await createCheckoutSession(selectedPlanId);
      
      if (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to start checkout process. Please try again.");
        return;
      }
      
      if (url) {
        console.log("Redirecting to checkout URL:", url);
        window.location.href = url;
      } else {
        console.error("No checkout URL returned");
        toast.error("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
          onClick={handleCheckout}
          disabled={loading || !selectedPlanId}
        >
          <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {loading ? "Processing..." : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
}