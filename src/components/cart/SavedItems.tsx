import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SavedItemsProps {
  onClose: () => void;
}

export function SavedItems({ onClose }: SavedItemsProps) {
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedItems = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: savedItemsData } = await supabase
        .from("saved_items")
        .select("product_id")
        .eq("customer_id", user.id);

      if (savedItemsData) {
        const productIds = savedItemsData.map(item => item.product_id);
        const { data: products } = await supabase
          .from("products")
          .select("*")
          .in("id", productIds);
        
        setSavedItems(products || []);
      }
      setLoading(false);
    };

    fetchSavedItems();
  }, []);

  const handleAddToCart = async (product: Product) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Remove from saved items
    await supabase
      .from("saved_items")
      .delete()
      .eq("customer_id", user.id)
      .eq("product_id", product.id);

    // Add to cart
    addItem(product);
    setSavedItems(current => current.filter(item => item.id !== product.id));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been moved to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      {savedItems.length === 0 ? (
        <div className="text-center space-y-4">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">No saved items yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b pb-4 animate-fade-in"
            >
              <div className="aspect-square h-16 w-16 overflow-hidden rounded-md">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAddToCart(item)}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}