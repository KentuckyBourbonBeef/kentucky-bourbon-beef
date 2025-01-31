import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import Preferences from "@/components/profile/Preferences";

const Profile = () => {
  const [customerData, setCustomerData] = useState<any>(null);

  return (
    <div className="container py-8">
      <Tabs defaultValue="personal-info">
        <TabsList>
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <PersonalInfo customerData={customerData} setCustomerData={setCustomerData} />
        </TabsContent>
        <TabsContent value="preferences">
          <Preferences customerData={customerData} setCustomerData={setCustomerData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
