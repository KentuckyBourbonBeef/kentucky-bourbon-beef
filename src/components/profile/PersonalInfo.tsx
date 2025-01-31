import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PersonalInfoProps {
  customerData: any;
  setCustomerData: Dispatch<SetStateAction<any>>;
}

const PersonalInfo = ({ customerData, setCustomerData }: PersonalInfoProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('customers')
      .update({ full_name: customerData.full_name })
      .eq('id', customerData.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={customerData.full_name || ''}
          onChange={(e) => setCustomerData({ ...customerData, full_name: e.target.value })}
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default PersonalInfo;