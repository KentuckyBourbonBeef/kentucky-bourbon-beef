import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useSaveForLater } from "./hooks/useSaveForLater";

interface SaveForLaterProps {
  product: Product;
}

const SaveForLater = ({ product }: SaveForLaterProps) => {
  const { isSaving, saveItem } = useSaveForLater(product);

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full h-14 text-lg"
      onClick={saveItem}
      disabled={isSaving}
    >
      <Heart className="mr-2 h-5 w-5" />
      {isSaving ? "Saving..." : "Save for Later"}
    </Button>
  );
};

export default SaveForLater;