import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import AddressBook from "@/components/profile/AddressBook";
import OrderHistory from "@/components/profile/OrderHistory";
import Preferences from "@/components/profile/Preferences";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setCustomerData(data);
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

    fetchCustomerData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bourbon-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-bourbon-900">My Account</h1>
      
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-bourbon-100">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfo customerData={customerData} setCustomerData={setCustomerData} />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressBook customerId={customerData.id} />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory customerId={customerData.id} />
        </TabsContent>

        <TabsContent value="preferences">
          <Preferences customerData={customerData} setCustomerData={setCustomerData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;