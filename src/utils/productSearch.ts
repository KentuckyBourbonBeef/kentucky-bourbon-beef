import { Product, ProductCategory, SortOption } from "@/types/product";

export const filterProducts = (
  products: Product[],
  searchQuery: string,
  category: ProductCategory | "all",
  priceRange: [number, number],
  minAgingDuration: number | null,
  bdcOnly: boolean
) => {
  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "all" || product.category === category;
    
    const matchesPrice = Number(product.price) >= priceRange[0] && 
      Number(product.price) <= priceRange[1];
    
    const matchesAging = !minAgingDuration || 
      (product.aging_duration || 0) >= minAgingDuration;
    
    const matchesBdc = !bdcOnly || product.is_bdc_certified;

    return matchesSearch && matchesCategory && matchesPrice && matchesAging && matchesBdc;
  });
};

export const sortProducts = (products: Product[], sortBy: SortOption) => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });
};