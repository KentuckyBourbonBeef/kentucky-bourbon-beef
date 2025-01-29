const ProductDetailSkeleton = () => {
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
};

export default ProductDetailSkeleton;