import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20">
      <Separator className="mb-12" />
      <h2 className="text-3xl font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative">
                <img
                  src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-bourbon-800">
                  {product.name}
                </h3>
                <p className="text-bourbon-600 font-medium">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;