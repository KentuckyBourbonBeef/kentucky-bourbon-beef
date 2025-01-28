import { Skeleton } from "@/components/ui/skeleton";

const ProductListSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Skeleton className="h-[40px] w-[180px] mb-4" />
        <div className="flex gap-4">
          <Skeleton className="h-[40px] w-[180px]" />
          <Skeleton className="h-[40px] w-[180px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-[40px] w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;