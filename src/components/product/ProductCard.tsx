import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-semibold text-bourbon-800">
            ${Number(product.price).toFixed(2)}
          </p>
          <span className="text-sm text-gray-600 capitalize">
            {product.category}
          </span>
        </div>
        {product.aging_duration && (
          <p className="text-sm text-gray-600 mt-2">
            Aged for {product.aging_duration} days
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-bourbon-600 hover:bg-bourbon-700"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;