import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ProductBadges from "@/components/product/ProductBadges";
import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products || products.length === 0) return null;

  const getCategoryImage = (category: string) => {
    const imageMap: Record<string, string> = {
      ribeye: "/lovable-uploads/972d97c9-c672-448a-b9a5-69950cd6a5f1.png",
      strip: "/lovable-uploads/81e2bf7b-eb02-49f0-afe4-3302a94a27a0.png",
      tenderloin: "/lovable-uploads/58f2f4e4-cb5e-4cce-a375-18ec023efee7.png",
      tomahawk: "/lovable-uploads/03a8f629-b2fd-4729-8c3b-281f41bdc719.png",
      tbone: "/lovable-uploads/afd284f1-4ee0-4d28-b9b5-b8d12cdb6cb0.png",
      porterhouse: "/lovable-uploads/ebf80843-0e99-47e5-b606-b514b484f838.png",
    };
    return imageMap[category] || imageMap.ribeye;
  };

  return (
    <section className="mt-20 animate-fade-in">
      <Separator className="mb-12" />
      <h2 className="text-3xl font-bold mb-8 text-bourbon-800">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="group relative"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={product.image_url || getCategoryImage(product.category)}
                  alt={`${product.name} - ${product.category} cut`}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    "group-hover:scale-110"
                  )}
                />
                <ProductBadges
                  agingTier={product.aging_tier}
                  agingDuration={product.aging_duration}
                  isBdcCertified={product.is_bdc_certified}
                />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <h3 className="font-semibold text-xl mb-1 text-bourbon-800 group-hover:text-bourbon-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-bourbon-600 font-medium text-lg">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="capitalize bg-bourbon-50">
                    {product.category}
                  </Badge>
                  {product.aging_duration && (
                    <Badge variant="outline" className="bg-bourbon-50">
                      {product.aging_duration} Days Aged
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;