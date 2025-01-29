import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  isSelected?: boolean;
  onClick?: () => void;
  size?: "thumbnail" | "full";
}

const ProductImage = ({ 
  src, 
  alt, 
  isSelected, 
  onClick,
  size = "full" 
}: ProductImageProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "overflow-hidden rounded-lg bg-gray-100",
        size === "thumbnail" ? "cursor-pointer hover:opacity-75 transition-opacity" : "",
        isSelected && "ring-2 ring-bourbon-600"
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover",
          size === "thumbnail" ? "aspect-square" : "aspect-[4/3]"
        )}
      />
    </div>
  );
};

export default ProductImage;