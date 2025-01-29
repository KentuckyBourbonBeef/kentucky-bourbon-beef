import { Heart, X } from "lucide-react";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "./shared/ProductCard";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const { toast } = useToast();

  const handleSaveForLater = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save items for later.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("saved_items")
      .insert({ customer_id: user.id, product_id: item.id });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already saved",
          description: "This item is already in your saved items.",
        });
      } else {
        toast({
          title: "Error",
          description: "Could not save item for later.",
          variant: "destructive",
        });
      }
      return;
    }

    onRemoveItem(item.id);
    toast({
      title: "Saved for later",
      description: "Item has been moved to your saved items.",
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <ProductCard
        product={item}
        actionIcon={<X className="h-4 w-4" />}
        onActionClick={() => onRemoveItem(item.id)}
        showQuantityControls
        onQuantityChange={(quantity) => onUpdateQuantity(item.id, quantity)}
      />
      <button
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={handleSaveForLater}
      >
        <Heart className="h-4 w-4" />
      </button>
    </div>
  );
}