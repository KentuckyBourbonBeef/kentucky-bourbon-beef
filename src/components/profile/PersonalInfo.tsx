import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalInfoProps {
  customerData: any;
  setCustomerData: (data: any) => void;
}

const PersonalInfo = ({ customerData, setCustomerData }: PersonalInfoProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: customerData.full_name || "",
    phone: customerData.phone || "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("customers")
        .update(formData)
        .eq("id", customerData.id)
        .select()
        .single();

      if (error) throw error;

      setCustomerData(data);
      toast({
        title: "Success",
        description: "Personal information updated successfully",
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
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-bourbon-600 hover:bg-bourbon-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;