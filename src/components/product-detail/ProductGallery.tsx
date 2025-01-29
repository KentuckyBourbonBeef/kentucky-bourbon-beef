import { useState } from "react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Get default image based on product category
  const getCategoryDefaultImage = (category: string) => {
    const categoryImages: { [key: string]: string } = {
      ribeye: "/lovable-uploads/972d97c9-c672-448a-b9a5-69950cd6a5f1.png",
      strip: "/lovable-uploads/81e2bf7b-eb02-49f0-afe4-3302a94a27a0.png",
      tenderloin: "/lovable-uploads/58f2f4e4-cb5e-4cce-a375-18ec023efee7.png",
      tomahawk: "/lovable-uploads/03a8f629-b2fd-4729-8c3b-281f41bdc719.png",
      tbone: "/lovable-uploads/afd284f1-4ee0-4d28-b9b5-b8d12cdb6cb0.png",
      porterhouse: "/lovable-uploads/ebf80843-0e99-47e5-b606-b514b484f838.png",
    };
    return categoryImages[category] || categoryImages.ribeye;
  };

  const imageUrl = product.image_url || getCategoryDefaultImage(product.category);

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-lg cursor-pointer group">
            <img
              src={imageUrl}
              alt={`${product.name} - ${product.category} cut`}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                isZoomed ? "scale-125" : "scale-100",
                "group-hover:scale-110"
              )}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="w-5 h-5 text-bourbon-600" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-square">
            <img
              src={imageUrl}
              alt={`${product.name} - ${product.category} cut`}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="text-sm text-gray-500 text-center">
        Click image to view in full size
      </div>
    </div>
  );
};

export default ProductGallery;