import { useState } from "react";
import { Product } from "@/types/product";
import AgingDetails from "./AgingDetails";
import SizeWeightSelector from "./SizeWeightSelector";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import QuantitySelector from "./QuantitySelector";
import { ShareDialog } from "../cart/ShareDialog";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <ProductTitle 
          name={product.name} 
          price={selectedPrice}
          quantity={quantity}
          total={selectedPrice * quantity}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShareDialogOpen(true)}
          className="ml-4"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
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