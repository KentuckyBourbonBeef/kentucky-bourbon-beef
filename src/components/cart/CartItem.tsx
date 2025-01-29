import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityUpdate = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onUpdateQuantity(item.id, newQuantity);
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center space-x-4 border-b pb-4 animate-fade-in">
      <div className="aspect-square h-16 w-16 overflow-hidden rounded-md">
        <img
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          ${Number(item.price).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityUpdate(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="transition-colors"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">
          {isUpdating ? (
            <Loader2 className="h-4 w-4 mx-auto animate-spin" />
          ) : (
            item.quantity
          )}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityUpdate(item.quantity + 1)}
          disabled={isUpdating}
          className="transition-colors"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemoveItem(item.id)}
          disabled={isUpdating}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}