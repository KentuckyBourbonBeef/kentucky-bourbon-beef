import { Database } from "@/integrations/supabase/types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductCategory = Database["public"]["Enums"]["product_category"];
export type SortOption = "price-asc" | "price-desc" | "name";

export interface PricingTier {
  quantity: number;
  price_per_unit: number;
}