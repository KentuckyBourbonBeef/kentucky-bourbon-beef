import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface WeightOptionProps {
  value: string;
  label: string;
  price: number;
  isSelected: boolean;
  selectedQuantity: number;
}

export const WeightOption = ({ 
  value, 
  label, 
  price, 
  isSelected,
  selectedQuantity 
}: WeightOptionProps) => {
  return (
    <Label
      className={cn(
        "flex flex-col items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
        isSelected
          ? "border-bourbon-600 bg-bourbon-50"
          : "border-gray-200 hover:border-bourbon-300"
      )}
    >
      <RadioGroupItem
        value={value}
        id={value}
        className="sr-only"
      />
      <span className="text-lg font-semibold mb-1">{label}</span>
      <span className="text-sm text-gray-600">
        ${price.toFixed(2)}
        {selectedQuantity > 1 && (
          <span className="text-xs text-bourbon-600 block">
            per unit for {selectedQuantity}
          </span>
        )}
      </span>
    </Label>
  );
};