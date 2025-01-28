export const partialMatch = (searchTerm: string, target: string) => {
  if (!searchTerm || !target) return false;
  
  const normalizedSearch = searchTerm.toLowerCase().trim();
  const normalizedTarget = target.toLowerCase().trim();
  
  console.log('Matching:', { searchTerm: normalizedSearch, target: normalizedTarget });
  
  return normalizedTarget.includes(normalizedSearch) || 
         normalizedSearch.includes(normalizedTarget);
};

export const filterProducts = (
  products: any[],
  searchQuery: string,
  selectedCategory: string
) => {
  if (!products) return [];
  
  console.log('Filtering products:', { 
    totalProducts: products.length,
    searchQuery,
    selectedCategory 
  });

  return products.filter((product) => {
    const matchesName = product.name && partialMatch(searchQuery, product.name);
    const matchesDescription = product.description && partialMatch(searchQuery, product.description);
    const matchesCategory = product.category && partialMatch(searchQuery, product.category);

    console.log('Product matches:', {
      productName: product.name,
      matchesName,
      matchesDescription,
      matchesCategory
    });

    const matches = matchesName || matchesDescription || matchesCategory;
    const categoryFilter = selectedCategory === "all" || product.category === selectedCategory;

    return matches && categoryFilter;
  });
};

export const sortProducts = (
  products: any[],
  sortBy: "price-asc" | "price-desc" | "name"
) => {
  if (!products) return [];
  
  return [...products].sort((a, b) => {
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
};