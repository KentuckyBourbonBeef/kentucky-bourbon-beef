import { useState } from "react";
import { Product } from "@/types/product";
import AgingDetails from "./AgingDetails";
import SizeWeightSelector from "./SizeWeightSelector";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import QuantitySelector from "./QuantitySelector";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedPrice, setSelectedPrice] = useState(Number(product.price));
  const [quantity, setQuantity] = useState(1);

  const handleWeightSelect = (_weight: string, price: number) => {
    setSelectedPrice(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-8">
      <ProductTitle 
        name={product.name} 
        price={selectedPrice}
        quantity={quantity}
        total={selectedPrice * quantity}
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
    </div>
  );
};

export default ProductInfo;