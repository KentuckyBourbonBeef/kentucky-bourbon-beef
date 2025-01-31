export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'beef' | 'pork' | 'poultry' | 'seafood' | 'other';
  image_url?: string;
  aging_duration?: number;
  aging_tier?: string;
  is_bdc_certified?: boolean;
  stock_quantity?: number;
  wholesale_price?: number;
  minimum_wholesale_quantity?: number;
  pricing_tiers?: {
    quantity: number;
    price_per_unit: number;
  }[];
  created_at: string;
  updated_at: string;
};