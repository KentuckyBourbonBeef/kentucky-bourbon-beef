import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import AddressBook from "@/components/profile/AddressBook";
import OrderHistory from "@/components/profile/OrderHistory";
import Preferences from "@/components/profile/Preferences";

const Profile = () => {
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('customers')
          .select('*')
          .eq('id', user.id)
          .single();
        setCustomerData(data);
      }
    };

    fetchCustomerData();
  }, []);

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalInfo customerData={customerData} setCustomerData={setCustomerData} />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressBook />
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>
        <TabsContent value="preferences">
          <Preferences customerData={customerData} setCustomerData={setCustomerData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;