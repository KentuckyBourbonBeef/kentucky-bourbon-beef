import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
          {product.is_bdc_certified && (
            <Badge className="absolute top-4 right-4 bg-bourbon-600">
              BDC - Butcher Distiller's Cut™
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-bourbon-800 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600">${Number(product.price).toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Aging Details</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Aging Tier:</span> {product.aging_tier}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Duration:</span> {product.aging_duration} days
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Category</h2>
              <p className="text-gray-600 capitalize">{product.category}</p>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-bourbon-600 hover:bg-bourbon-700 text-lg py-6"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;