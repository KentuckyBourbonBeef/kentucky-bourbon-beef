import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
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
                  <span className="invisible group-hover:visible absolute left-0 top-full mt-2 w-64 p-2 bg-white text-bourbon-800 text-xs rounded shadow-lg z-50">
                    Our Butcher Distiller's Cut™ beef is finished with Bourbon Grains, 
                    creating a one-of-a-kind culinary experience that celebrates Kentucky's rich heritage of exceptional beef and bourbon.
                  </span>
                </span>
              </Badge>
            )}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6">
        <Link to={`/product/${product.id}`}>
          <CardTitle className="text-2xl mb-2 hover:text-bourbon-600 transition-colors">
            {product.name}
          </CardTitle>
        </Link>
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
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;