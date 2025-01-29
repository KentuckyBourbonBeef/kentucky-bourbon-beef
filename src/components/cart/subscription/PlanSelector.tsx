import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubscriptionPlan } from "@/types/subscription";

interface PlanSelectorProps {
  plans: SubscriptionPlan[];
  selectedPlanId: string;
  onPlanSelect: (planId: string) => void;
}

export function PlanSelector({ plans, selectedPlanId, onPlanSelect }: PlanSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Select Subscription Plan</label>
      <Select value={selectedPlanId} onValueChange={onPlanSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a plan" />
        </SelectTrigger>
        <SelectContent>
          {plans?.map((plan) => (
            <SelectItem key={plan.id} value={plan.stripe_price_id}>
              {plan.name} - ${plan.price}/
              {plan.interval === 'month' ? 'mo' : 'yr'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedPlanId && plans && (
        <div className="text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground">Plan Features:</h4>
          <ul className="list-disc list-inside mt-1">
            {plans
              .find(p => p.stripe_price_id === selectedPlanId)
              ?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}