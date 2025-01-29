import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Product } from "@/types/product";
import { WeightOption } from "./weight-selector/WeightOption";
import { useWeightOptions } from "./weight-selector/useWeightOptions";
import { useState } from "react";

interface SizeWeightSelectorProps {
  product: Product;
  onWeightSelect: (weight: string, price: number) => void;
  selectedQuantity?: number;
}

const SizeWeightSelector = ({ 
  product, 
  onWeightSelect, 
  selectedQuantity = 1 
}: SizeWeightSelectorProps) => {
  const { getWeightOptions, getPriceForQuantity } = useWeightOptions(product.category, Number(product.price));
  const weightOptions = getWeightOptions(product.category);
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0].value);

  const handleWeightChange = (value: string) => {
    setSelectedWeight(value);
    const option = weightOptions.find(opt => opt.value === value);
    if (option) {
      const pricePerUnit = getPriceForQuantity(
        option.price, 
        selectedQuantity, 
        product.pricing_tiers as unknown as { quantity: number; price_per_unit: number; }[] | null
      );
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
          const pricePerUnit = getPriceForQuantity(
            option.price,
            selectedQuantity,
            product.pricing_tiers as unknown as { quantity: number; price_per_unit: number; }[] | null
          );
          return (
            <WeightOption
              key={option.value}
              value={option.value}
              label={option.label}
              price={pricePerUnit}
              isSelected={selectedWeight === option.value}
              selectedQuantity={selectedQuantity}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default SizeWeightSelector;