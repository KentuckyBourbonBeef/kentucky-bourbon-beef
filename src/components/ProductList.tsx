import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "./Cart";
import SearchFilters from "./product/SearchFilters";
import ProductCard from "./product/ProductCard";
import ProductListSkeleton from "./product/ProductListSkeleton";
import EmptyProductList from "./product/EmptyProductList";
import { filterProducts, sortProducts } from "@/utils/productSearch";
import { ProductCategory, SortOption } from "@/types/product";

const ProductList = () => {
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  if (isLoading) {
    return (
      <section id="products" className="container py-8 scroll-mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Our Premium Cuts</h2>
          <Cart />
        </div>
        <ProductListSkeleton />
      </section>
    );
  }

  const filteredProducts = filterProducts(products || [], searchQuery, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <section id="products" className="container py-8 scroll-mt-20 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Our Premium Cuts</h2>
        <Cart />
      </div>
      
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {sortedProducts.length === 0 ? (
        <EmptyProductList searchQuery={searchQuery} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;