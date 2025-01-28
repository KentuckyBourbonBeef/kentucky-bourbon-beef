import { Button } from "@/components/ui/button";
import { Grid2X2, Grid3X3 } from "lucide-react";
import { Cart } from "../Cart";

interface ProductHeaderProps {
  gridView: "2x2" | "3x3";
  onGridViewChange: (view: "2x2" | "3x3") => void;
}

const ProductHeader = ({ gridView, onGridViewChange }: ProductHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-4xl font-serif font-bold mb-2">Our Premium Cuts</h2>
        <p className="text-muted-foreground max-w-2xl">
          Experience the unique flavor of our bourbon-finished beef, carefully aged and crafted 
          to bring you the finest cuts from Kentucky's rich culinary heritage.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-md p-1">
          <Button
            variant={gridView === "2x2" ? "default" : "ghost"}
            size="icon"
            onClick={() => onGridViewChange("2x2")}
            className="h-8 w-8"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={gridView === "3x3" ? "default" : "ghost"}
            size="icon"
            onClick={() => onGridViewChange("3x3")}
            className="h-8 w-8"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default ProductHeader;