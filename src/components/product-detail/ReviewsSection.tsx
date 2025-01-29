import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, ThumbsUp, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

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

  const averageRating = reviews
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = reviews
    ? reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>)
    : {};

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

  return (
    <section className="mt-16 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-bourbon-800">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1 bg-bourbon-50/50 p-6 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-bourbon-800">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-5 h-5",
                    star <= Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Based on {reviews?.length || 0} reviews
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width: `${
                        ((ratingDistribution[rating] || 0) /
                          (reviews?.length || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="w-12 text-sm text-right text-gray-600">
                  {ratingDistribution[rating] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-4 mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {sortedAndFilteredReviews?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No reviews yet for this product.
              </div>
            ) : (
              sortedAndFilteredReviews?.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "w-4 h-4",
                              star <= review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        By {review.customer?.full_name || "Anonymous"} •{" "}
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                  {review.review_text && (
                    <p className="text-gray-700">{review.review_text}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;