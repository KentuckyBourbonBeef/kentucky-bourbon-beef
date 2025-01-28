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
import { Separator } from "./ui/separator";
import { Grid2X2, Grid3X3 } from "lucide-react";
import { Button } from "./ui/button";

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
              onClick={() => setGridView("2x2")}
              className="h-8 w-8"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={gridView === "3x3" ? "default" : "ghost"}
              size="icon"
              onClick={() => setGridView("3x3")}
              className="h-8 w-8"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
          <Cart />
        </div>
      </div>
      
      <Separator className="my-8" />
      
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
        <div className={`grid gap-8 ${
          gridView === "2x2" 
            ? "grid-cols-1 md:grid-cols-2" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}>
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