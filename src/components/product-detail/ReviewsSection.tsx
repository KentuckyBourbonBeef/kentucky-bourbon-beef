import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import ReviewsSummary from "./reviews/ReviewsSummary";
import ReviewFilters from "./reviews/ReviewFilters";
import ReviewCard from "./reviews/ReviewCard";

interface ReviewsSectionProps {
  product: Product;
}

interface Review {
  id: string;
  product_id: string;
  customer_id: string | null;
  rating: number;
  review_text: string | null;
  created_at: string;
  customer?: {
    full_name: string | null;
  };
}

const ReviewsSection = ({ product }: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterRating, setFilterRating] = useState<string>("all");

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", product.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          customer:customers(full_name)
        `)
        .eq("product_id", product.id);

      if (error) throw error;
      return data as Review[];
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const averageRating = reviews
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = reviews
    ? reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>)
    : {};

  const sortedAndFilteredReviews = reviews
    ?.filter((review) => 
      filterRating === "all" ? true : review.rating === parseInt(filterRating)
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "highest") {
        return b.rating - a.rating;
      }
      if (sortBy === "lowest") {
        return a.rating - b.rating;
      }
      return 0;
    });

  return (
    <section className="mt-16 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-bourbon-800">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ReviewsSummary
          averageRating={averageRating}
          totalReviews={reviews?.length || 0}
          ratingDistribution={ratingDistribution}
        />

        <div className="lg:col-span-2">
          <ReviewFilters
            sortBy={sortBy}
            filterRating={filterRating}
            onSortChange={setSortBy}
            onFilterChange={setFilterRating}
          />

          <div className="space-y-6">
            {sortedAndFilteredReviews?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No reviews yet for this product.
              </div>
            ) : (
              sortedAndFilteredReviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;