import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product & { quantity?: number };
  actionIcon: React.ReactNode;
  onActionClick: () => void;
  showQuantityControls?: boolean;
  onQuantityChange?: (quantity: number) => void;
}

export function ProductCard({
  product,
  actionIcon,
  onActionClick,
  showQuantityControls,
  onQuantityChange,
}: ProductCardProps) {
  return (
    <div className="flex items-center space-x-4 py-4 animate-fade-in">
      <div className="aspect-square h-16 w-16 overflow-hidden rounded-md">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          ${Number(product.price).toFixed(2)}
        </p>
        {showQuantityControls && onQuantityChange && product.quantity && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(product.quantity! - 1)}
              disabled={product.quantity <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center">{product.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(product.quantity! + 1)}
            >
              +
            </Button>
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onActionClick}
        className="h-8 w-8"
      >
        {actionIcon}
      </Button>
    </div>
  );
}