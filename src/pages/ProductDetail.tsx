import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft } from "lucide-react";
import { Product } from "@/types/product";
import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import AddToCartSection from "@/components/product-detail/AddToCartSection";
import RelatedProducts from "@/components/product-detail/RelatedProducts";

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
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <Link to="/" className="text-bourbon-600 hover:text-bourbon-700 mt-4 inline-block">
          Return to products
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-bourbon-600 hover:text-bourbon-700 mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery product={product} />
          <div className="space-y-8">
            <ProductInfo product={product} />
            <AddToCartSection product={product} />
          </div>
        </div>

        {relatedProducts && <RelatedProducts products={relatedProducts} />}
      </div>
    </main>
  );
};

export default ProductDetail;