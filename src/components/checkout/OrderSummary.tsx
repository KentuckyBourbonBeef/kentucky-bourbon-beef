import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface OrderSummaryProps {
  total: number;
  loading: boolean;
}

export function OrderSummary({ total, loading }: OrderSummaryProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between text-lg font-semibold mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button
        type="submit"
        className="w-full bg-bourbon-600 hover:bg-bourbon-700 transition-colors"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </div>
  );
}