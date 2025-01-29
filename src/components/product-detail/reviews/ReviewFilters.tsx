import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewFiltersProps {
  sortBy: string;
  filterRating: string;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

const ReviewFilters = ({
  sortBy,
  filterRating,
  onSortChange,
  onFilterChange,
}: ReviewFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="highest">Highest Rated</SelectItem>
          <SelectItem value="lowest">Lowest Rated</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterRating} onValueChange={onFilterChange}>
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
  );
};

export default ReviewFilters;