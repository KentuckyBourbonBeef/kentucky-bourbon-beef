import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import SearchFilters from "./product/SearchFilters";
import ProductListSkeleton from "./product/ProductListSkeleton";
import { filterProducts, sortProducts } from "@/utils/productSearch";
import { ProductCategory, SortOption } from "@/types/product";
import { Separator } from "./ui/separator";
import ProductHeader from "./product/ProductHeader";
import ProductGrid from "./product/ProductGrid";

const ProductList = () => {
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [gridView, setGridView] = useState<"2x2" | "3x3">("3x3");

  if (isLoading) {
    return (
      <section id="products" className="container py-8 scroll-mt-20">
        <ProductHeader gridView={gridView} onGridViewChange={setGridView} />
        <ProductListSkeleton />
      </section>
    );
  }

  const filteredProducts = filterProducts(products || [], searchQuery, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <section id="products" className="container py-8 scroll-mt-20 animate-fade-in">
      <ProductHeader gridView={gridView} onGridViewChange={setGridView} />
      <Separator className="my-8" />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <ProductGrid
        products={sortedProducts}
        gridView={gridView}
        searchQuery={searchQuery}
        onAddToCart={addItem}
      />
    </section>
  );
};

export default ProductList;