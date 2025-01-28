import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  return (
    <div className="border-t pt-4 space-y-4">
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button
        className="w-full bg-bourbon-600 hover:bg-bourbon-700"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}