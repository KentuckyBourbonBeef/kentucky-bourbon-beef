import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/use-products";
import { useToast } from "@/components/ui/use-toast";

const FeaturedCuts = () => {
  const { data: products, isLoading, error } = useProducts();
  const { toast } = useToast();

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

  return (
    <section className="py-20 bg-bourbon-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Cuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  {product.is_bdc_certified && (
                    <Badge className="absolute top-4 right-4 bg-bourbon-600 group cursor-help">
                      <span className="relative">
                        BDC - Butcher Distiller's Cut™
                        <span className="invisible group-hover:visible absolute left-0 top-full mt-2 w-64 p-2 bg-white text-bourbon-800 text-xs rounded shadow-lg">
                          Our Butcher Distiller's Cut™ beef is uniquely finished with nutrient-rich Bourbon Grains, 
                          creating a distinctly rich Kentucky flavor profile while supporting sustainable farming practices.
                        </span>
                      </span>
                    </Badge>
                  )}
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
                  onClick={() => {
                    toast({
                      title: "Added to cart",
                      description: `${product.name} has been added to your cart.`,
                    });
                  }}
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