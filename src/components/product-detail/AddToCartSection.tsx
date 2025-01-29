import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

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
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addItem(product);
    setIsAdding(false);
    setShowSuccess(true);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <AddToCartButton
        isAdding={isAdding}
        showSuccess={showSuccess}
        onClick={handleAddToCart}
      />
    </div>
  );
};

export default AddToCartSection;