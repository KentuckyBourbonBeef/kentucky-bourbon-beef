import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PreferencesProps {
  customerData: any;
  setCustomerData: (data: any) => void;
}

const AVAILABLE_CUTS = [
  "Ribeye",
  "Strip",
  "Tenderloin",
  "Tomahawk",
  "T-Bone",
  "Porterhouse",
];

const Preferences = ({ customerData, setCustomerData }: PreferencesProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedCuts, setSelectedCuts] = useState<string[]>(
    customerData.preferred_cuts || []
  );
  const [newsletter, setNewsletter] = useState(
    customerData.newsletter_subscription || false
  );
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("customers")
        .update({
          preferred_cuts: selectedCuts,
          newsletter_subscription: newsletter,
        })
        .eq("id", customerData.id)
        .select()
        .single();

      if (error) throw error;

      setCustomerData(data);
      toast({
        title: "Success",
        description: "Preferences updated successfully",
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

  const toggleCut = (cut: string) => {
    setSelectedCuts((prev) =>
      prev.includes(cut)
        ? prev.filter((c) => c !== cut)
        : [...prev, cut]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Preferred Cuts</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AVAILABLE_CUTS.map((cut) => (
                <div key={cut} className="flex items-center space-x-2">
                  <Checkbox
                    id={cut}
                    checked={selectedCuts.includes(cut)}
                    onCheckedChange={() => toggleCut(cut)}
                  />
                  <Label htmlFor={cut}>{cut}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={newsletter}
              onCheckedChange={(checked) => setNewsletter(checked as boolean)}
            />
            <Label htmlFor="newsletter">
              Subscribe to newsletter for updates and special offers
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-bourbon-600 hover:bg-bourbon-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Preferences;