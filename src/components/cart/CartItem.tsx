import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      if (error.code === "23505") { // Unique violation
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
    <div className="flex items-center space-x-4 py-4 animate-fade-in">
      <div className="aspect-square h-16 w-16 overflow-hidden rounded-md">
        <img
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          ${Number(item.price).toFixed(2)}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemoveItem(item.id)}
          className="h-8 w-8"
        >
          ×
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSaveForLater}
          className="h-8 w-8"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}