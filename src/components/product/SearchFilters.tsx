import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";

type ProductCategory = Database["public"]["Enums"]["product_category"];

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory | "all";
  setSelectedCategory: (category: ProductCategory | "all") => void;
  sortBy: "price-asc" | "price-desc" | "name";
  setSortBy: (sort: "price-asc" | "price-desc" | "name") => void;
}

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-xs"
      />
      
      <Select value={selectedCategory} onValueChange={(value: ProductCategory | "all") => setSelectedCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="ribeye">Ribeye</SelectItem>
          <SelectItem value="strip">Strip</SelectItem>
          <SelectItem value="tenderloin">Tenderloin</SelectItem>
          <SelectItem value="tomahawk">Tomahawk</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(value: "price-asc" | "price-desc" | "name") => setSortBy(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;