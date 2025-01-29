import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";

export const useSaveForLater = (product: Product) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const checkIfItemIsSaved = async (userId: string) => {
    const { data } = await supabase
      .from("saved_items")
      .select("id")
      .eq("customer_id", userId)
      .eq("product_id", product.id)
      .single();
    
    return !!data;
  };

  const saveItem = async () => {
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

      // Check if item is already saved
      const isAlreadySaved = await checkIfItemIsSaved(user.id);
      if (isAlreadySaved) {
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

  return {
    isSaving,
    saveItem
  };
};