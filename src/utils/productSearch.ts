export const partialMatch = (searchTerm: string, target: string) => {
  const searchWords = searchTerm.split(/\s+/);
  const targetWords = target.split(/\s+/);
  
  return searchWords.every(searchWord => 
    targetWords.some(targetWord => 
      targetWord.includes(searchWord) || searchWord.includes(targetWord)
    )
  );
};

export const filterProducts = (
  products: any[],
  searchQuery: string,
  selectedCategory: string
) => {
  return products?.filter((product) => {
    // Normalize strings for comparison
    const normalizedSearch = searchQuery.toLowerCase().trim();
    const normalizedName = product.name.toLowerCase().trim();
    const normalizedDescription = product.description?.toLowerCase().trim() || "";
    const normalizedCategory = product.category.toLowerCase().trim();

    // If search is empty, don't filter by search
    if (!normalizedSearch) return true;

    // Check for partial matches
    const matchesName = partialMatch(normalizedSearch, normalizedName);
    const matchesDescription = partialMatch(normalizedSearch, normalizedDescription);
    const matchesCategory = partialMatch(normalizedSearch, normalizedCategory);

    const matches = matchesName || matchesDescription || matchesCategory;
    const categoryFilter = selectedCategory === "all" || product.category === selectedCategory;

    return matches && categoryFilter;
  });
};

export const sortProducts = (
  products: any[],
  sortBy: "price-asc" | "price-desc" | "name"
) => {
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