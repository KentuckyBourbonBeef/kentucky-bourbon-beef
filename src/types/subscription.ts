export interface SubscriptionPlan {
  id: string;
  name: string;
  stripe_price_id: string;
  price: number;
  interval: string;
  features: string[];
}