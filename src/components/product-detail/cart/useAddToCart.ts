import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

export const useAddToCart = (product: Product) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addItem(product);
    setIsAdding(false);
    setShowSuccess(true);

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