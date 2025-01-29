import { useState } from "react";
import { Product } from "@/types/product";
import ProductImage from "./gallery/ProductImage";
import ProductThumbnails from "./gallery/ProductThumbnails";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const defaultImage = product.image_url || `/lovable-uploads/${
    {
      ribeye: "972d97c9-c672-448a-b9a5-69950cd6a5f1.png",
      strip: "81e2bf7b-eb02-49f0-afe4-3302a94a27a0.png",
      tenderloin: "58f2f4e4-cb5e-4cce-a375-18ec023efee7.png",
      tomahawk: "03a8f629-b2fd-4729-8c3b-281f41bdc719.png",
      tbone: "afd284f1-4ee0-4d28-b9b5-b8d12cdb6cb0.png",
      porterhouse: "ebf80843-0e99-47e5-b606-b514b484f838.png",
    }[product.category] || "972d97c9-c672-448a-b9a5-69950cd6a5f1.png"
  }`;

  const [selectedImage, setSelectedImage] = useState(defaultImage);

  return (
    <div className="space-y-4">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
        <ProductImage
          src={selectedImage}
          alt={product.name}
        />
      </div>
      <ProductThumbnails
        product={product}
        selectedImage={selectedImage}
        onImageSelect={setSelectedImage}
      />
    </div>
  );
};

export default ProductGallery;