import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "./shared/ProductCard";
import { EmptyState } from "./shared/EmptyState";

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

    await supabase
      .from("saved_items")
      .delete()
      .eq("customer_id", user.id)
      .eq("product_id", product.id);

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
        <EmptyState
          icon={Heart}
          message="No saved items yet"
        />
      ) : (
        <div className="space-y-4">
          {savedItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              actionIcon={<ShoppingCart className="h-4 w-4" />}
              onActionClick={() => handleAddToCart(item)}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}