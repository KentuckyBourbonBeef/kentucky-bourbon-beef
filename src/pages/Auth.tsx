import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80")',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold text-bourbon-800">
            Kentucky Bourbon Beef
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Premium dry-aged beef with bourbon heritage
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;