import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import AddressForm from "./AddressForm";

interface AddressBookProps {
  customerId: string;
}

const AddressBook = ({ customerId }: AddressBookProps) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAddresses();
  }, [customerId]);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_addresses")
        .select("*")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
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

  const handleDelete = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from("saved_addresses")
        .delete()
        .eq("id", addressId);

      if (error) throw error;

      setAddresses(addresses.filter((addr) => addr.id !== addressId));
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Saved Addresses</h3>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-bourbon-600 hover:bg-bourbon-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm
              customerId={customerId}
              onSuccess={() => {
                setShowAddForm(false);
                fetchAddresses();
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{address.address_type}</p>
                  <p>{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;