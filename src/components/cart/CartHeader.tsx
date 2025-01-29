import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Heart, Share2 } from "lucide-react";

interface CartHeaderProps {
  showCheckout: boolean;
  showSavedItems: boolean;
  onBack: () => void;
  onShowSavedItems: () => void;
  onShowShare: () => void;
}

export function CartHeader({
  showCheckout,
  showSavedItems,
  onBack,
  onShowSavedItems,
  onShowShare,
}: CartHeaderProps) {
  return (
    <SheetHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {(showCheckout || showSavedItems) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
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
              onClick={onShowSavedItems}
              className="relative"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </SheetHeader>
  );
}