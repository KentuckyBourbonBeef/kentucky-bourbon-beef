import { Dispatch, SetStateAction } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PreferencesProps {
  customerData: any;
  setCustomerData: Dispatch<SetStateAction<any>>;
}

const Preferences = ({ customerData, setCustomerData }: PreferencesProps) => {
  const { toast } = useToast();

  const handleToggleWholesale = async (checked: boolean) => {
    const { error } = await supabase
      .from('customers')
      .update({ approved_for_wholesale: checked })
      .eq('id', customerData.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
      return;
    }

    setCustomerData({ ...customerData, approved_for_wholesale: checked });
    toast({
      title: "Success",
      description: "Preferences updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="wholesale" className="flex flex-col space-y-1">
          <span>Wholesale Account</span>
          <span className="text-sm text-gray-500">
            Enable wholesale pricing and bulk ordering
          </span>
        </Label>
        <Switch
          id="wholesale"
          checked={customerData.approved_for_wholesale || false}
          onCheckedChange={handleToggleWholesale}
        />
      </div>
    </div>
  );
};

export default Preferences;