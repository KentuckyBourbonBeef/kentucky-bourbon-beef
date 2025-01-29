import { useState } from "react";
import { Product } from "@/types/product";
import AgingDetails from "./AgingDetails";
import SizeWeightSelector from "./SizeWeightSelector";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedPrice, setSelectedPrice] = useState(Number(product.price));

  const handleWeightSelect = (_weight: string, price: number) => {
    setSelectedPrice(price);
  };

  return (
    <div className="space-y-8">
      <ProductTitle 
        name={product.name} 
        price={selectedPrice} 
      />
      <ProductDescription description={product.description} />
      <SizeWeightSelector 
        product={product} 
        onWeightSelect={handleWeightSelect}
      />
      <AgingDetails product={product} />
    </div>
  );
};

export default ProductInfo;