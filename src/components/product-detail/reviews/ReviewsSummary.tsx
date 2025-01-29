import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewsSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

const ReviewsSummary = ({ 
  averageRating, 
  totalReviews, 
  ratingDistribution 
}: ReviewsSummaryProps) => {
  return (
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
          Based on {totalReviews} reviews
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
                    ((ratingDistribution[rating] || 0) / totalReviews) * 100
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
  );
};

export default ReviewsSummary;