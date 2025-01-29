import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const FeaturedCuts = () => {
  const { data: products, isLoading, error } = useProducts();
  const { toast } = useToast();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const getCategoryImage = (category: string) => {
    const imageMap: Record<string, string> = {
      ribeye: "/lovable-uploads/972d97c9-c672-448a-b9a5-69950cd6a5f1.png",
      strip: "/lovable-uploads/81e2bf7b-eb02-49f0-afe4-3302a94a27a0.png",
      tenderloin: "/lovable-uploads/58f2f4e4-cb5e-4cce-a375-18ec023efee7.png",
      tomahawk: "/lovable-uploads/03a8f629-b2fd-4729-8c3b-281f41bdc719.png",
      tbone: "/lovable-uploads/afd284f1-4ee0-4d28-b9b5-b8d12cdb6cb0.png",
      porterhouse: "/lovable-uploads/ebf80843-0e99-47e5-b606-b514b484f838.png",
      other: "/placeholder.svg"
    };
    
    return imageMap[category] || imageMap.other;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-bourbon-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Loading Featured Cuts...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-bourbon-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Error loading products</h2>
        </div>
      </section>
    );
  }

  const featuredProducts = products?.slice(0, 3) || [];

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      className: "cursor-toast",
      style: {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
      },
    });
  };

  return (
    <section className="py-20 bg-bourbon-50">
      <div className="container relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 inline-flex items-center text-bourbon-600 hover:text-bourbon-700 group transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
        <h2 className="text-4xl font-bold text-center mb-12">Featured Cuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative">
                  <img
                    src={product.image_url || getCategoryImage(product.category)}
                    alt={`${product.name} - ${product.category} cut`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                <CardDescription className="mb-4">{product.description}</CardDescription>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold text-bourbon-800">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <span className="text-sm text-gray-600 capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{product.aging_tier}</p>
                    <p>Aged for {product.aging_duration} days</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-bourbon-600 hover:bg-bourbon-700"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCuts;