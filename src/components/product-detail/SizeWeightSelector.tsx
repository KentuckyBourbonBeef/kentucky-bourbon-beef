import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Product, PricingTier } from "@/types/product";

interface WeightOption {
  value: string;
  label: string;
  price: number;
}

interface SizeWeightSelectorProps {
  product: Product;
  onWeightSelect: (weight: string, price: number) => void;
  selectedQuantity?: number;
}

const SizeWeightSelector = ({ product, onWeightSelect, selectedQuantity = 1 }: SizeWeightSelectorProps) => {
  // Weight options based on product category
  const getWeightOptions = (category: string): WeightOption[] => {
    const basePrice = Number(product.price);
    switch (category) {
      case "ribeye":
      case "strip":
        return [
          { value: "12oz", label: "12 oz", price: basePrice },
          { value: "16oz", label: "16 oz", price: basePrice * 1.33 },
          { value: "20oz", label: "20 oz", price: basePrice * 1.67 },
        ];
      case "tenderloin":
        return [
          { value: "6oz", label: "6 oz", price: basePrice * 0.75 },
          { value: "8oz", label: "8 oz", price: basePrice },
          { value: "10oz", label: "10 oz", price: basePrice * 1.25 },
        ];
      case "tomahawk":
        return [
          { value: "32oz", label: "32 oz", price: basePrice },
          { value: "36oz", label: "36 oz", price: basePrice * 1.125 },
          { value: "40oz", label: "40 oz", price: basePrice * 1.25 },
        ];
      default:
        return [
          { value: "16oz", label: "16 oz", price: basePrice },
        ];
    }
  };

  const getPriceForQuantity = (basePrice: number, quantity: number): number => {
    if (!product.pricing_tiers) return basePrice;

    // Safely type cast the pricing tiers
    const pricingTiers = (product.pricing_tiers as unknown as PricingTier[])
      .sort((a, b) => b.quantity - a.quantity);

    const applicableTier = pricingTiers.find(tier => quantity >= tier.quantity);
    return applicableTier ? applicableTier.price_per_unit : basePrice;
  };

  const weightOptions = getWeightOptions(product.category);
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0].value);

  const handleWeightChange = (value: string) => {
    setSelectedWeight(value);
    const option = weightOptions.find(opt => opt.value === value);
    if (option) {
      const pricePerUnit = getPriceForQuantity(option.price, selectedQuantity);
      onWeightSelect(value, pricePerUnit);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-medium text-bourbon-800">Select Size</Label>
        <span className="text-sm text-gray-500">
          Prices vary by weight and quantity
        </span>
      </div>
      
      <RadioGroup
        value={selectedWeight}
        onValueChange={handleWeightChange}
        className="grid grid-cols-3 gap-4"
      >
        {weightOptions.map((option) => {
          const pricePerUnit = getPriceForQuantity(option.price, selectedQuantity);
          return (
            <Label
              key={option.value}
              className={cn(
                "flex flex-col items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                selectedWeight === option.value
                  ? "border-bourbon-600 bg-bourbon-50"
                  : "border-gray-200 hover:border-bourbon-300"
              )}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="sr-only"
              />
              <span className="text-lg font-semibold mb-1">{option.label}</span>
              <span className="text-sm text-gray-600">
                ${pricePerUnit.toFixed(2)}
                {selectedQuantity > 1 && (
                  <span className="text-xs text-bourbon-600 block">
                    per unit for {selectedQuantity}
                  </span>
                )}
              </span>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default SizeWeightSelector;