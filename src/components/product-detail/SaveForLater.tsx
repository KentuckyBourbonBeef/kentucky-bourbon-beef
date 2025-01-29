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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("Auth error:", authError);
        throw authError;
      }
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save items",
          variant: "destructive",
        });
        return;
      }

      // First, verify the customer record exists
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("id")
        .eq("id", user.id)
        .single();

      if (customerError) {
        console.error("Customer error:", customerError);
        throw customerError;
      }

      if (!customerData) {
        console.error("No customer record found");
        throw new Error("Customer record not found");
      }

      const { error: saveError } = await supabase
        .from("saved_items")
        .insert({
          customer_id: user.id,
          product_id: product.id,
        });

      if (saveError) {
        console.error("Save error:", saveError);
        if (saveError.code === '23505') { // Unique violation
          toast({
            title: "Already saved",
            description: "This item is already in your saved items",
          });
        } else {
          throw saveError;
        }
      } else {
        toast({
          title: "Saved for later",
          description: "Item has been added to your saved items",
        });
      }
    } catch (error: any) {
      console.error("Error saving item:", error);
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
      Save for Later
    </Button>
  );
};

export default SaveForLater;