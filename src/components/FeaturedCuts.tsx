import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredCuts = [
  {
    name: "Ribeye",
    description: "30-day bourbon aged, marbled perfection",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"
  },
  {
    name: "NY Strip",
    description: "45-day bourbon aged, exceptional tenderness",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1615937574607-d6b4cd55d2a2"
  },
  {
    name: "Filet Mignon",
    description: "60-day bourbon aged, ultimate luxury",
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1615937575621-d2a5d0699589"
  }
];

const FeaturedCuts = () => {
  return (
    <section className="py-20 bg-bourbon-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Cuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCuts.map((cut) => (
            <Card key={cut.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative">
                  <img
                    src={cut.image}
                    alt={cut.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-2">{cut.name}</CardTitle>
                <CardDescription>{cut.description}</CardDescription>
                <p className="text-xl font-semibold mt-4 text-bourbon-800">
                  {cut.price}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-bourbon-600 hover:bg-bourbon-700">
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