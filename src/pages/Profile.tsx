import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import AddressBook from "@/components/profile/AddressBook";
import OrderHistory from "@/components/profile/OrderHistory";
import Preferences from "@/components/profile/Preferences";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Customer profile not found. Please try logging in again.",
          });
          navigate("/auth");
          return;
        }

        setCustomerData(data);
      } catch (error: any) {
        console.error("Profile error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [toast, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bourbon-600"></div>
      </div>
    );
  }

  if (!customerData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bourbon-50/50">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <Button
          variant="ghost"
          className="mb-6 text-bourbon-700 hover:text-bourbon-900 hover:bg-bourbon-100"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-serif font-bold mb-2 text-bourbon-900">My Account</h1>
        <p className="text-bourbon-600 mb-8">Manage your profile, addresses, and preferences</p>
        
        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList className="bg-bourbon-100 p-1 space-x-1">
            <TabsTrigger 
              value="personal"
              className="data-[state=active]:bg-white data-[state=active]:text-bourbon-900"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger 
              value="addresses"
              className="data-[state=active]:bg-white data-[state=active]:text-bourbon-900"
            >
              Addresses
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:text-bourbon-900"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="preferences"
              className="data-[state=active]:bg-white data-[state=active]:text-bourbon-900"
            >
              Preferences
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-bourbon-100">
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
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;