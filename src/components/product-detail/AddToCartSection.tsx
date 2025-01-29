import { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import { useAddToCart } from "./cart/useAddToCart";
import SaveForLater from "./SaveForLater";

interface AddToCartSectionProps {
  product: Product;
}

const AddToCartSection = ({ product }: AddToCartSectionProps) => {
  const { isAdding, showSuccess, handleAddToCart } = useAddToCart(product);

  return (
    <div className="space-y-4">
      <AddToCartButton
        isAdding={isAdding}
        showSuccess={showSuccess}
        onClick={handleAddToCart}
      />
      <SaveForLater product={product} />
    </div>
  );
};

export default AddToCartSection;