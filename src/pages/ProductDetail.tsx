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

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    },
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", product?.category)
        .neq("id", id)
        .limit(3);

      if (error) throw error;
      return data as Product[];
    },
    enabled: !!product,
  });

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

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