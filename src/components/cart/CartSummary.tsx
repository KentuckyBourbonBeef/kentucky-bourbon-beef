import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  const { createCheckoutSession, loading } = useStripeCheckout();

  const handleCheckout = async () => {
    // You can choose which price ID to use based on your needs
    const priceId = "price_1Qmdna2foRA9ZOJ4wZ1wgzkn"; // Using the first price ID you provided
    await createCheckoutSession(priceId);
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
      <Button
        className="w-full bg-bourbon-600 hover:bg-bourbon-700 transition-colors group"
        onClick={handleCheckout}
        disabled={loading}
      >
        <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
        {loading ? "Processing..." : "Subscribe Now"}
      </Button>
    </div>
  );
}