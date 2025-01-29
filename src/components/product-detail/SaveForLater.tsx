import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

interface SaveForLaterProps {
  product: Product;
}

const SaveForLater = ({ product }: SaveForLaterProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log("Starting save process...");
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("Authentication error:", authError);
        throw new Error("Authentication failed. Please try logging in again.");
      }
      
      if (!user) {
        console.log("No user found - redirecting to login");
        toast({
          title: "Authentication required",
          description: "Please sign in to save items",
          variant: "destructive",
        });
        return;
      }

      console.log("User authenticated:", user.id);

      // First, ensure customer record exists
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("id")
        .eq("id", user.id)
        .single();

      if (customerError) {
        console.error("Customer lookup error:", customerError);
        throw new Error("Unable to verify customer record. Please try again.");
      }

      if (!customerData) {
        console.log("No customer record found, creating one...");
        const { error: insertError } = await supabase
          .from("customers")
          .insert([{ id: user.id }]);
          
        if (insertError) {
          console.error("Failed to create customer record:", insertError);
          throw new Error("Unable to create customer profile. Please try again.");
        }
        console.log("Customer record created successfully");
      }

      console.log("Attempting to save item for customer:", user.id, "product:", product.id);
      const { error: saveError } = await supabase
        .from("saved_items")
        .insert([{
          customer_id: user.id,
          product_id: product.id,
        }]);

      if (saveError) {
        console.error("Save error:", saveError);
        if (saveError.code === '23505') { // Unique violation code
          toast({
            title: "Already saved",
            description: "This item is already in your saved items",
          });
        } else {
          console.error("Unexpected save error:", saveError);
          throw new Error(saveError.message);
        }
      } else {
        console.log("Item saved successfully");
        toast({
          title: "Saved for later",
          description: "Item has been added to your saved items",
        });
      }
    } catch (error: any) {
      console.error("Error in save process:", error);
      toast({
        title: "Error",
        description: error.message || "Could not save the item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full h-14 text-lg"
      onClick={handleSave}
      disabled={isSaving}
    >
      <Heart className="mr-2 h-5 w-5" />
      {isSaving ? "Saving..." : "Save for Later"}
    </Button>
  );
};

export default SaveForLater;