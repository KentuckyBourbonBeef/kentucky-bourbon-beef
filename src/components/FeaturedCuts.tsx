import { useProducts } from "@/hooks/use-products";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { ProductLoadingState } from "./product/ProductLoadingState";
import { ProductErrorState } from "./product/ProductErrorState";
import { BackButton } from "./product/BackButton";
import { FeaturedProductCard } from "./product/FeaturedProductCard";
import { Product } from "@/types/product";

const FeaturedCuts = () => {
  const { data: products, isLoading, error } = useProducts();
  const { toast } = useToast();
  const { addItem } = useCart();

  if (isLoading) return <ProductLoadingState />;
  if (error) return <ProductErrorState />;

  const featuredProducts = products?.slice(0, 3) || [];

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      className: "cursor-toast",
      style: {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
      },
    });
  };

  return (
    <section className="py-20 bg-bourbon-50">
      <div className="container relative">
        <BackButton />
        <h2 className="text-4xl font-bold text-center mb-12">Featured Cuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCuts;