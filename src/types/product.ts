export type ProductCategory = 
  | 'ribeye' 
  | 'strip' 
  | 'tenderloin' 
  | 'tomahawk' 
  | 'tbone' 
  | 'porterhouse';

export type SortOption = 'name' | 'price-asc' | 'price-desc';

export interface PricingTier {
  quantity: number;
  price_per_unit: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: ProductCategory | string;
  image_url?: string | null;
  aging_duration?: number | null;
  aging_tier?: string | null;
  is_bdc_certified?: boolean | null;
  stock_quantity?: number | null;
  wholesale_price?: number | null;
  minimum_wholesale_quantity?: number | null;
  pricing_tiers?: PricingTier[] | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}