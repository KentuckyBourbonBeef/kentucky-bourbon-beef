import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Preferences = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdatePreferences = async (preferences: any) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('customers')
        .update({
          approved_for_wholesale: preferences.approved_for_wholesale,
          is_restaurant: preferences.is_restaurant,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your preferences have been updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="wholesale">Request Wholesale Access</Label>
        <Switch
          id="wholesale"
          onCheckedChange={(checked) =>
            handleUpdatePreferences({ approved_for_wholesale: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="restaurant">Register as Restaurant</Label>
        <Switch
          id="restaurant"
          onCheckedChange={(checked) =>
            handleUpdatePreferences({ is_restaurant: checked })
          }
        />
      </div>

      <Button
        onClick={() => handleUpdatePreferences({})}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
};

export default Preferences;