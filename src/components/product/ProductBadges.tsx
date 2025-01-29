import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, Beef } from "lucide-react";

interface ProductBadgesProps {
  agingTier: string | null;
  agingDuration: number | null;
  isBdcCertified: boolean;
}

const ProductBadges = ({ agingTier, agingDuration, isBdcCertified }: ProductBadgesProps) => {
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 animate-fade-in">
      {isBdcCertified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="bg-bourbon-600 hover:bg-bourbon-700 cursor-help flex gap-1 items-center">
                <Star className="h-3 w-3" /> BDC Certified
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>
                Our Butcher Distiller's Cut™ certification guarantees this cut has been
                finished with premium bourbon grains for exceptional flavor and tenderness.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {agingTier && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-white/80 cursor-help flex gap-1 items-center">
                <Beef className="h-3 w-3" /> {agingTier}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {agingTier === "Premium" && "Our finest selection, aged for maximum tenderness and flavor."}
                {agingTier === "Reserve" && "Carefully aged for enhanced marbling and taste."}
                {agingTier === "Standard" && "Quality cuts with our signature bourbon finish."}
              </p>
              {agingDuration && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Aged for {agingDuration} days
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProductBadges;