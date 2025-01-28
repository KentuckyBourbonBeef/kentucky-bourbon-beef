import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p className="text-xl font-semibold mt-4 text-bourbon-800">
                  ${product.price}
                </p>
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