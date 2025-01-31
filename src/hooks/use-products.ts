import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

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
      
      // Convert the JSON pricing_tiers to PricingTier[]
      const products = data.map(product => ({
        ...product,
        pricing_tiers: product.pricing_tiers ? JSON.parse(product.pricing_tiers as string) : null
      })) as Product[];
      
      return products;
    },
  });
};