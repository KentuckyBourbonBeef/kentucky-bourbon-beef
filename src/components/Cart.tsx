import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Checkout } from "./Checkout";
import { CartHeader } from "./cart/CartHeader";
import { CartContent } from "./cart/CartContent";
import { CartSummary } from "./cart/CartSummary";
import { SavedItems } from "./cart/SavedItems";
import { ShareDialog } from "@/components/product-detail/share/ShareDialog";

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleBack = () => {
    setShowCheckout(false);
    setShowSavedItems(false);
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
          <CartHeader
            showCheckout={showCheckout}
            showSavedItems={showSavedItems}
            onBack={handleBack}
            onShowSavedItems={() => setShowSavedItems(true)}
            onShowShare={() => setShowShare(true)}
          />
          <div className="mt-8 h-full flex flex-col">
            {showCheckout ? (
              <div className="animate-fade-in">
                <Checkout onCancel={handleBack} />
              </div>
            ) : showSavedItems ? (
              <SavedItems onClose={() => setShowSavedItems(false)} />
            ) : (
              <>
                <CartContent
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
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