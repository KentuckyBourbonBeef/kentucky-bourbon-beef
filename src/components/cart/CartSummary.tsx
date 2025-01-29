import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  stripe_price_id: string;
  price: number;
  interval: string;
  features: string[];
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  const { createCheckoutSession, loading } = useStripeCheckout();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  const { data: subscriptionPlans, isLoading: plansLoading } = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .order("price");
      
      if (error) throw error;
      
      // Ensure features is always an array
      return data.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })) as SubscriptionPlan[];
    },
  });

  const handleCheckout = async () => {
    if (!selectedPlanId) {
      toast.error("Please select a subscription plan");
      return;
    }
    const plan = subscriptionPlans?.find(p => p.stripe_price_id === selectedPlanId);
    if (!plan) {
      toast.error("Invalid subscription plan selected");
      return;
    }
    await createCheckoutSession(plan.stripe_price_id);
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

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Select Subscription Plan</label>
        <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a plan" />
          </SelectTrigger>
          <SelectContent>
            {subscriptionPlans?.map((plan) => (
              <SelectItem key={plan.id} value={plan.stripe_price_id}>
                {plan.name} - ${plan.price}/
                {plan.interval === 'month' ? 'mo' : 'yr'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedPlanId && subscriptionPlans && (
          <div className="text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground">Plan Features:</h4>
            <ul className="list-disc list-inside mt-1">
              {subscriptionPlans
                .find(p => p.stripe_price_id === selectedPlanId)
                ?.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <Button
        className="w-full bg-bourbon-600 hover:bg-bourbon-700 transition-colors group"
        onClick={handleCheckout}
        disabled={loading || !selectedPlanId}
      >
        <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
        {loading ? "Processing..." : "Subscribe Now"}
      </Button>
    </div>
  );
}