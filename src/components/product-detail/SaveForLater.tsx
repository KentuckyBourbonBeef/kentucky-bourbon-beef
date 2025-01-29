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

      // First check if the item is already saved
      const { data: existingItem } = await supabase
        .from("saved_items")
        .select("id")
        .eq("customer_id", user.id)
        .eq("product_id", product.id)
        .single();

      if (existingItem) {
        console.log("Item already saved");
        toast({
          title: "Already saved",
          description: "This item is already in your saved items",
        });
        return;
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
        throw new Error("Could not save the item. Please try again.");
      }

      console.log("Item saved successfully");
      toast({
        title: "Saved for later",
        description: "Item has been added to your saved items",
      });
      
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