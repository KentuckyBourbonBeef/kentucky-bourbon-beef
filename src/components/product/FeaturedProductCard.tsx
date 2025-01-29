import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategoryImage } from "./ProductImageMapping";
import { Product } from "@/types/product";

interface FeaturedProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export function FeaturedProductCard({ product, onAddToCart }: FeaturedProductCardProps) {
  return (
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
          onClick={(e) => onAddToCart(product, e)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}