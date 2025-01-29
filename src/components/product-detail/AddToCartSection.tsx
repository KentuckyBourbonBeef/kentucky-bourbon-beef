import { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import { useAddToCart } from "./cart/useAddToCart";

interface AddToCartSectionProps {
  product: Product;
}

const AddToCartSection = ({ product }: AddToCartSectionProps) => {
  const { isAdding, showSuccess, handleAddToCart } = useAddToCart(product);

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