import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-bourbon-800">Select Quantity</Label>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="w-12 text-center text-lg font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;