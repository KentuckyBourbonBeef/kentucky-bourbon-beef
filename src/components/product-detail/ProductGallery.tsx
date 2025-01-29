import { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
      <img
        src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProductGallery;