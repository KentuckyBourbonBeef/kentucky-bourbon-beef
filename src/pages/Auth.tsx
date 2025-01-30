import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&q=80")',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
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
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              New to Kentucky Bourbon Beef? Please sign up to create an account.
            </AlertDescription>
          </Alert>
          <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;