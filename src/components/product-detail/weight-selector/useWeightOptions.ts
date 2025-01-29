import { Product, PricingTier } from "@/types/product";

interface WeightOption {
  value: string;
  label: string;
  price: number;
}

export const useWeightOptions = (category: string, basePrice: number) => {
  const getWeightOptions = (category: string): WeightOption[] => {
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

  const getPriceForQuantity = (basePrice: number, quantity: number, pricingTiers: PricingTier[] | null): number => {
    if (!pricingTiers) return basePrice;

    const sortedTiers = [...pricingTiers].sort((a, b) => b.quantity - a.quantity);
    const applicableTier = sortedTiers.find(tier => quantity >= tier.quantity);
    return applicableTier ? applicableTier.price_per_unit : basePrice;
  };

  return {
    getWeightOptions,
    getPriceForQuantity,
  };
};