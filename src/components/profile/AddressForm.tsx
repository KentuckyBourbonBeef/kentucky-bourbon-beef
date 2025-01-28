import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddressFormProps {
  customerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AddressForm = ({ customerId, onSuccess, onCancel }: AddressFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address_type: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
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
      const { error } = await supabase.from("saved_addresses").insert({
        ...formData,
        customer_id: customerId,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Address saved successfully",
      });
      onSuccess();
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address_type">Address Type</Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, address_type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select address type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shipping">Shipping</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line1">Address Line 1</Label>
        <Input
          id="address_line1"
          name="address_line1"
          value={formData.address_line1}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
        <Input
          id="address_line2"
          name="address_line2"
          value={formData.address_line2}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postal_code">Postal Code</Label>
        <Input
          id="postal_code"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-bourbon-600 hover:bg-bourbon-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Address"}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;