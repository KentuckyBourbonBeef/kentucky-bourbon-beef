import { Product } from "@/types/product";
import AgingDetails from "./AgingDetails";

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

      <AgingDetails product={product} />
    </div>
  );
};

export default ProductInfo;