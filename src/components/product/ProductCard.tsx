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
  // Map product categories to their corresponding image URLs
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <Link to={`/product/${product.id}`}>
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative group">
            <img
              src={product.image_url || getCategoryImage(product.category)}
              alt={`${product.name} - ${product.category} cut`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <ProductBadges
              agingTier={product.aging_tier}
              agingDuration={product.aging_duration}
              isBdcCertified={false}
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