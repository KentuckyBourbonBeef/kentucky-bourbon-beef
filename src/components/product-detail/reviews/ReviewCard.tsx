import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    review_text: string | null;
    created_at: string;
    customer?: {
      full_name: string | null;
    };
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
  );
};

export default ReviewCard;