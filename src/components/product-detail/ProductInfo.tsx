import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Beef } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-bourbon-800 mb-2">{product.name}</h1>
        <p className="text-2xl font-semibold text-bourbon-600">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>

      <div className="prose prose-bourbon">
        <p className="text-gray-600 text-lg">{product.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg">
          <Award className="h-6 w-6 text-bourbon-600" />
          <div>
            <p className="font-medium">Quality Tier</p>
            <p className="text-sm text-gray-600">{product.aging_tier}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg">
          <Clock className="h-6 w-6 text-bourbon-600" />
          <div>
            <p className="font-medium">Aging Duration</p>
            <p className="text-sm text-gray-600">{product.aging_duration} days</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-bourbon-50 rounded-lg">
          <Beef className="h-6 w-6 text-bourbon-600" />
          <div>
            <p className="font-medium">Category</p>
            <p className="text-sm text-gray-600 capitalize">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;