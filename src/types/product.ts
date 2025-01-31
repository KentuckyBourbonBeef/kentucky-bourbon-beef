export type ProductCategory = 'beef' | 'pork' | 'poultry' | 'seafood' | 'other';

export type SortOption = 'name' | 'price-asc' | 'price-desc';

export type PricingTier = {
  quantity: number;
  price_per_unit: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  image_url?: string;
  aging_duration?: number;
  aging_tier?: string;
  is_bdc_certified?: boolean;
  stock_quantity?: number;
  wholesale_price?: number;
  minimum_wholesale_quantity?: number;
  pricing_tiers?: PricingTier[];
  created_at: string;
  updated_at: string;
};

export type CartItem = Product & {
  quantity: number;
};