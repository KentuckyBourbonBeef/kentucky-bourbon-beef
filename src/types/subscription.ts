export type SubscriptionPlan = {
  id: string;
  name: string;
  description?: string;
  price: number;
  interval: string;
  features: string[];
  stripe_price_id: string;
  created_at?: string;
  updated_at?: string;
};