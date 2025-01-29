import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { ShoppingCart } from "lucide-react";
import ProductBadges from "./ProductBadges";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <Link to={`/product/${product.id}`}>
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative group">
            <img
              src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <ProductBadges
              agingTier={product.aging_tier}
              agingDuration={product.aging_duration}
              isBdcCertified={product.is_bdc_certified}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6">
        <Link to={`/product/${product.id}`}>
          <CardTitle className="text-2xl mb-2 hover:text-bourbon-600 transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <CardDescription className="mb-4 line-clamp-2">{product.description}</CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-bourbon-800">
              ${Number(product.price).toFixed(2)}
            </p>
            <span className="text-sm text-gray-600 capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-bourbon-600 hover:bg-bourbon-700 transition-colors"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;