import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product, PricingTier } from "@/types/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      
      if (error) {
        throw error;
      }
      
      return data.map(product => ({
        ...product,
        pricing_tiers: product.pricing_tiers ? 
          (typeof product.pricing_tiers === 'string' ? 
            JSON.parse(product.pricing_tiers) : 
            product.pricing_tiers) as PricingTier[] : 
          null
      })) as Product[];
    },
  });
};