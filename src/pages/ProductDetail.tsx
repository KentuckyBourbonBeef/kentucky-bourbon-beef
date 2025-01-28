import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { ShoppingCart, ChevronLeft, Award, Clock, Beef } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addItem } = useCart();

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

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", product?.category)
        .neq("id", id)
        .limit(3);

      if (error) throw error;
      return data as Product[];
    },
    enabled: !!product,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <Link to="/" className="text-bourbon-600 hover:text-bourbon-700 mt-4 inline-block">
          Return to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <main className="min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-bourbon-600 hover:text-bourbon-700 mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.is_bdc_certified && (
                <Badge className="absolute top-4 right-4 bg-bourbon-600">
                  BDC - Butcher Distiller's Cut™
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-bourbon-800 mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-bourbon-600">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="prose prose-bourbon">
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg">
                <Award className="h-6 w-6 text-bourbon-600" />
                <div>
                  <p className="font-medium">Quality Tier</p>
                  <p className="text-sm text-gray-600">{product.aging_tier}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg">
                <Clock className="h-6 w-6 text-bourbon-600" />
                <div>
                  <p className="font-medium">Aging Duration</p>
                  <p className="text-sm text-gray-600">{product.aging_duration} days</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg">
                <Beef className="h-6 w-6 text-bourbon-600" />
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                </div>
              </div>
            </div>

            {product.is_bdc_certified && (
              <div className="bg-bourbon-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-bourbon-600" />
                  Butcher Distiller's Cut™ Certification
                </h3>
                <p className="text-gray-600">
                  Our signature Butcher Distiller's Cut™ beef is uniquely finished with nutrient-rich 
                  Bourbon Grains, creating exceptionally tender meat with subtle bourbon-inspired flavors 
                  while supporting sustainable farming practices.
                </p>
              </div>
            )}

            <Button 
              onClick={handleAddToCart}
              className="w-full bg-bourbon-600 hover:bg-bourbon-700 h-14 text-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
          <section className="mt-20">
            <Separator className="mb-12" />
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] relative">
                      <img
                        src={relatedProduct.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-bourbon-800">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-bourbon-600 font-medium">
                        ${Number(relatedProduct.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;