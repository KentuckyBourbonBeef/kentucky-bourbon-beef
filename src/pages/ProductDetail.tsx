import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import AddToCartSection from "@/components/product-detail/AddToCartSection";
import RelatedProducts from "@/components/product-detail/RelatedProducts";
import ReviewsSection from "@/components/product-detail/ReviewsSection";
import ProductDetailSkeleton from "@/components/product-detail/ProductDetailSkeleton";
import ProductDetailBreadcrumbs from "@/components/product-detail/ProductDetailBreadcrumbs";
import { ErrorState } from "@/components/product-detail/ErrorState";
import { NotFoundState } from "@/components/product-detail/NotFoundState";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      console.log("Fetching product with ID:", id);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error loading product",
          description: "There was a problem loading the product details. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Product data received:", data);
      return data as Product;
    },
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: async () => {
      console.log("Fetching related products for category:", product?.category);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", product?.category)
        .neq("id", id)
        .limit(3);

      if (error) {
        console.error("Error fetching related products:", error);
        throw error;
      }

      console.log("Related products received:", data);
      return data as Product[];
    },
    enabled: !!product,
  });

  if (error) return <ErrorState />;
  if (isLoading) return <ProductDetailSkeleton />;
  if (!product) return <NotFoundState />;

  return (
    <main className="min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <ProductDetailBreadcrumbs product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery product={product} />
          <div className="space-y-8">
            <ProductInfo product={product} />
            <AddToCartSection product={product} />
          </div>
        </div>

        <ReviewsSection product={product} />
        {relatedProducts && <RelatedProducts products={relatedProducts} />}
      </div>
    </main>
  );
};

export default ProductDetail;