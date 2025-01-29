import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export const useAddToCart = (product: Product) => {
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

  return {
    isAdding,
    showSuccess,
    handleAddToCart
  };
};