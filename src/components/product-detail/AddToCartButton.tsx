import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  isAdding: boolean;
  showSuccess: boolean;
  onClick: () => void;
}

const AddToCartButton = ({ isAdding, showSuccess, onClick }: AddToCartButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      disabled={isAdding || showSuccess}
      className={cn(
        "w-full bg-bourbon-600 hover:bg-bourbon-700 h-14 text-lg relative overflow-hidden transition-all duration-300",
        isAdding && "animate-pulse",
        showSuccess && "bg-green-600 hover:bg-green-700"
      )}
    >
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-300",
        isAdding ? "opacity-100" : "opacity-0"
      )}>
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      
      <div className={cn(
        "flex items-center justify-center transition-all duration-300",
        isAdding ? "opacity-0" : "opacity-100",
        showSuccess ? "scale-110" : "scale-100"
      )}>
        {showSuccess ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </>
        )}
      </div>
    </Button>
  );
};

export default AddToCartButton;