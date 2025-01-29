import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProductRecommendations() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(3)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!recommendations?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Recommended Products</h3>
      <div className="grid gap-4">
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="flex items-center space-x-4 border rounded-lg p-4 animate-fade-in"
          >
            <div className="aspect-square h-16 w-16 overflow-hidden rounded-md">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-muted-foreground">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}