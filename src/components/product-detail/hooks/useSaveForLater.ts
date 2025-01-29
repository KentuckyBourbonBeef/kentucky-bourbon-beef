import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

export const useSaveForLater = (product: Product) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const saveItem = async () => {
    try {
      setIsSaving(true);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save items",
          variant: "destructive",
        });
        return;
      }

      // First try to get the existing saved item
      const { data: existingItem, error: checkError } = await supabase
        .from("saved_items")
        .select("id")
        .eq("customer_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (checkError) {
        throw new Error("Error checking saved item status");
      }

      if (existingItem) {
        toast({
          title: "Already saved",
          description: "This item is already in your saved items",
        });
        return;
      }

      // If no existing item found, proceed with saving
      const { error: saveError } = await supabase
        .from("saved_items")
        .insert({
          customer_id: user.id,
          product_id: product.id,
        });

      if (saveError) {
        // If we somehow still get a duplicate error, handle it gracefully
        if (saveError.code === "23505") {
          toast({
            title: "Already saved",
            description: "This item is already in your saved items",
          });
          return;
        }
        throw saveError;
      }

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

  return {
    isSaving,
    saveItem
  };
};