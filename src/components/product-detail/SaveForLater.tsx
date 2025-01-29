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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save items",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("saved_items")
        .insert({
          customer_id: user.id,
          product_id: product.id,
        });

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already saved",
            description: "This item is already in your saved items",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Saved for later",
          description: "Item has been added to your saved items",
        });
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast({
        title: "Error",
        description: "Could not save the item. Please try again.",
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