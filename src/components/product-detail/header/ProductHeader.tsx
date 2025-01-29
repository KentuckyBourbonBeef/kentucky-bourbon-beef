import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import ProductTitle from "../ProductTitle";

interface ProductHeaderProps {
  name: string;
  price: number;
  quantity: number;
  onShareClick: () => void;
}

export function ProductHeader({ name, price, quantity, onShareClick }: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ProductTitle 
        name={name} 
        price={price}
        quantity={quantity}
        total={price * quantity}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={onShareClick}
        className="ml-4"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}