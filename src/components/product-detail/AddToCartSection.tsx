import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddToCartSectionProps {
  product: Product;
}

const AddToCartSection = ({ product }: AddToCartSectionProps) => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addItem(product);
    setIsAdding(false);
    setShowSuccess(true);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    // Reset success state after animation
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <Button 
        onClick={handleAddToCart}
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
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
    </div>
  );
};

export default AddToCartSection;