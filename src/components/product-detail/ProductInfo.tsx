import { useState } from "react";
import { Product } from "@/types/product";
import AgingDetails from "./AgingDetails";
import SizeWeightSelector from "./SizeWeightSelector";
import ProductDescription from "./ProductDescription";
import QuantitySelector from "./QuantitySelector";
import { ShareDialog } from "./share/ShareDialog";
import { ProductHeader } from "./header/ProductHeader";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedPrice, setSelectedPrice] = useState(Number(product.price));
  const [quantity, setQuantity] = useState(1);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleWeightSelect = (_weight: string, price: number) => {
    setSelectedPrice(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-8">
      <ProductHeader 
        name={product.name}
        price={selectedPrice}
        quantity={quantity}
        onShareClick={() => setShareDialogOpen(true)}
      />
      <ProductDescription description={product.description} />
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
      />
      <SizeWeightSelector 
        product={product} 
        onWeightSelect={handleWeightSelect}
        selectedQuantity={quantity}
      />
      <AgingDetails product={product} />
      <ShareDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen} 
      />
    </div>
  );
};

export default ProductInfo;