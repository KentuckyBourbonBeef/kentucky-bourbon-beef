import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "./Cart";
import SearchFilters from "./product/SearchFilters";
import ProductCard from "./product/ProductCard";
import { Database } from "@/integrations/supabase/types";

type ProductCategory = Database["public"]["Enums"]["product_category"];

const ProductList = () => {
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");

  const filteredProducts = products?.filter((product) => {
    // Normalize strings for comparison by removing extra spaces and converting to lowercase
    const normalizedSearch = searchQuery.toLowerCase().trim();
    const normalizedName = product.name.toLowerCase().trim();
    const normalizedDescription = product.description?.toLowerCase().trim() || "";
    const normalizedCategory = product.category.toLowerCase().trim();

    // If search is empty, don't filter by search
    if (!normalizedSearch) return true;

    // Function to check if a search term partially matches any word in the target
    const partialMatch = (searchTerm: string, target: string) => {
      // If the search term is very short (1-2 chars), require it to be the start of a word
      if (searchTerm.length <= 2) {
        return target.split(/\s+/).some(word => word.startsWith(searchTerm));
      }
      // For longer search terms, allow partial matches within words
      return target.includes(searchTerm);
    };

    // Split search into words and check if each word partially matches
    const searchWords = normalizedSearch.split(/\s+/);
    const matchesSearch = searchWords.every(word => 
      partialMatch(word, normalizedName) ||
      partialMatch(word, normalizedDescription) ||
      partialMatch(word, normalizedCategory)
    );
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <h2 className="text-3xl font-bold mb-8">Loading Products...</h2>
      </div>
    );
  }

  return (
    <section className="container py-8">
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