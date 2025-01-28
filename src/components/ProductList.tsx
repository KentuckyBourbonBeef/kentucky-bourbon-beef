import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "./Cart";
import SearchFilters from "./product/SearchFilters";
import ProductCard from "./product/ProductCard";
import { filterProducts, sortProducts } from "@/utils/productSearch";
import { Product, ProductCategory, SortOption } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = () => {
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  console.log('ProductList render:', { 
    productsLoaded: !!products, 
    searchQuery, 
    selectedCategory 
  });

  const filteredProducts = filterProducts(products || [], searchQuery, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts || [], sortBy);

  console.log('After filtering and sorting:', { 
    filteredCount: filteredProducts.length,
    sortedCount: sortedProducts.length 
  });

  if (isLoading) {
    return (
      <section id="products" className="container py-8 scroll-mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Our Premium Cuts</h2>
          <Cart />
        </div>
        <div className="mb-8">
          <Skeleton className="h-[40px] w-[180px] mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-[40px] w-[180px]" />
            <Skeleton className="h-[40px] w-[180px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-[40px] w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section 
      id="products" 
      className="container py-8 scroll-mt-20 animate-fade-in"
    >
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
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            No products found matching "{searchQuery}". Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product: Product) => (
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