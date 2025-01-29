import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlan } from "@/types/subscription";

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .order("price");
      
      if (error) throw error;
      
      return data.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })) as SubscriptionPlan[];
    },
  });
}