import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import EmptyProductList from "./EmptyProductList";

interface ProductGridProps {
  products: Product[];
  gridView: "2x2" | "3x3";
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, gridView, searchQuery, onAddToCart }: ProductGridProps) => {
  if (products.length === 0) {
    return <EmptyProductList searchQuery={searchQuery} />;
  }

  return (
    <div
      className={`grid gap-8 ${
        gridView === "2x2"
          ? "grid-cols-1 md:grid-cols-2"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductGrid;