import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ProductCategory, SortOption } from "@/types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory | "all";
  setSelectedCategory: (category: ProductCategory | "all") => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  agingDuration: number | null;
  setAgingDuration: (duration: number | null) => void;
  showBdcOnly: boolean;
  setShowBdcOnly: (show: boolean) => void;
}

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  agingDuration,
  setAgingDuration,
  showBdcOnly,
  setShowBdcOnly,
}: SearchFiltersProps) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm border animate-fade-in">
      <div className="space-y-4">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        
        <div className="flex flex-wrap gap-4">
          <Select value={selectedCategory} onValueChange={(value: ProductCategory | "all") => setSelectedCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
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

          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
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
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-filters">
          <AccordionTrigger>Advanced Filters</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            <div className="space-y-4">
              <div>
                <Label>Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Minimum Aging Duration (days)</Label>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[agingDuration || 0]}
                  onValueChange={(value) => setAgingDuration(value[0])}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="bdc-only"
                  checked={showBdcOnly}
                  onCheckedChange={setShowBdcOnly}
                />
                <Label htmlFor="bdc-only">Show only BDC Certified cuts</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SearchFilters;