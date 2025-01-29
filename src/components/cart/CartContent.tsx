import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { CartItem } from "./CartItem";
import { ProductRecommendations } from "./ProductRecommendations";

interface CartContentProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartContent({ items, onUpdateQuantity, onRemoveItem }: CartContentProps) {
  return (
    <ScrollArea className="flex-1">
      {items.length === 0 ? (
        <div className="space-y-6 animate-fade-in">
          <p className="text-center text-muted-foreground">
            Your cart is empty
          </p>
          <ProductRecommendations />
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}