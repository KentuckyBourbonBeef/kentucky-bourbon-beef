import { Product } from "@/types/product";
import { Award, Clock, Beef } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgingDetailsProps {
  product: Product;
}

const AgingDetails = ({ product }: AgingDetailsProps) => {
  const getAgingTierDescription = (tier: string) => {
    switch (tier) {
      case "Premium":
        return "Our finest selection, aged for maximum tenderness and flavor, finished with premium bourbon grains.";
      case "Reserve":
        return "Carefully aged for enhanced marbling and taste, with our signature bourbon finish.";
      default:
        return "Quality cuts with our traditional bourbon aging process.";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-semibold text-bourbon-800">Aging Process</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg cursor-help transition-colors hover:bg-bourbon-100">
                <Award className="h-8 w-8 text-bourbon-600" />
                <div>
                  <p className="font-medium text-lg">Quality Tier</p>
                  <p className="text-bourbon-600">{product.aging_tier}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{getAgingTierDescription(product.aging_tier || "Standard")}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg cursor-help transition-colors hover:bg-bourbon-100">
                <Clock className="h-8 w-8 text-bourbon-600" />
                <div>
                  <p className="font-medium text-lg">Duration</p>
                  <p className="text-bourbon-600">{product.aging_duration} days</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Our cuts are carefully aged for {product.aging_duration} days to develop rich flavors and tender texture.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg cursor-help transition-colors hover:bg-bourbon-100">
                <Beef className="h-8 w-8 text-bourbon-600" />
                <div>
                  <p className="font-medium text-lg">Cut Type</p>
                  <p className="text-bourbon-600 capitalize">{product.category}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Premium {product.category} cut, selected for optimal flavor development during the aging process.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-6 p-4 bg-bourbon-50/50 rounded-lg border border-bourbon-100">
        <p className="text-bourbon-700">
          Our unique aging process combines traditional dry-aging techniques with the rich heritage of Kentucky bourbon. 
          Each cut is carefully aged in a controlled environment where it develops complex flavors and exceptional tenderness.
        </p>
      </div>
    </div>
  );
};

export default AgingDetails;