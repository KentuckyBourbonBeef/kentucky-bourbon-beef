import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Checkout } from "./Checkout";
import { CartItem } from "./cart/CartItem";
import { CartSummary } from "./cart/CartSummary";

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-bourbon-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-scale-in">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center">
            {showCheckout && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToCart}
                className="mr-2"
              >
                ←
              </Button>
            )}
            <SheetTitle>{showCheckout ? "Checkout" : "Your Cart"}</SheetTitle>
          </div>
        </SheetHeader>
        <div className="mt-8 h-full flex flex-col">
          {showCheckout ? (
            <div className="animate-fade-in">
              <Checkout onCancel={handleBackToCart} />
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                {items.length === 0 ? (
                  <p className="text-center text-muted-foreground animate-fade-in">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeItem}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
              {items.length > 0 && (
                <CartSummary
                  total={total}
                  onCheckout={() => setShowCheckout(true)}
                />
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}