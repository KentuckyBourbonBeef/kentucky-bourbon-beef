import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Checkout } from "./Checkout";
import { CartItem } from "./cart/CartItem";
import { CartSummary } from "./cart/CartSummary";
import { SavedItems } from "./cart/SavedItems";
import { ShareDialog } from "./cart/ShareDialog";
import { ProductRecommendations } from "./cart/ProductRecommendations";

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  return (
    <>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {(showCheckout || showSavedItems) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowCheckout(false);
                      setShowSavedItems(false);
                    }}
                    className="mr-2"
                  >
                    ←
                  </Button>
                )}
                <SheetTitle>
                  {showCheckout 
                    ? "Checkout" 
                    : showSavedItems 
                    ? "Saved Items" 
                    : "Your Cart"}
                </SheetTitle>
              </div>
              {!showCheckout && !showSavedItems && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSavedItems(true)}
                    className="relative"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowShare(true)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </SheetHeader>
          <div className="mt-8 h-full flex flex-col">
            {showCheckout ? (
              <div className="animate-fade-in">
                <Checkout onCancel={handleBackToCart} />
              </div>
            ) : showSavedItems ? (
              <SavedItems onClose={() => setShowSavedItems(false)} />
            ) : (
              <>
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
      <ShareDialog open={showShare} onOpenChange={setShowShare} />
    </>
  );
}