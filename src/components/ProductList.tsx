import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "./Cart";

type ProductCategory = Database["public"]["Enums"]["product_category"];

const ProductList = () => {
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="aspect-[4/3] relative">
                <img
                  src={product.image_url || "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-semibold text-bourbon-800">
                  ${Number(product.price).toFixed(2)}
                </p>
                <span className="text-sm text-gray-600 capitalize">
                  {product.category}
                </span>
              </div>
              {product.aging_duration && (
                <p className="text-sm text-gray-600 mt-2">
                  Aged for {product.aging_duration} days
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-bourbon-600 hover:bg-bourbon-700"
                onClick={() => addItem(product)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProductList;