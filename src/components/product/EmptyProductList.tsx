interface EmptyProductListProps {
  searchQuery: string;
}

const EmptyProductList = ({ searchQuery }: EmptyProductListProps) => {
  return (
    <div className="text-center py-12 bg-bourbon-50 rounded-lg animate-fade-in">
      <h3 className="text-2xl font-serif mb-4">No Matches Found</h3>
      <p className="text-lg text-gray-600 mb-4">
        We couldn't find any products matching "{searchQuery}".
      </p>
      <p className="text-gray-500 max-w-md mx-auto">
        Try adjusting your search terms or filters to discover our premium 
        Bourbon-finished beef selections, each crafted to deliver an exceptional 
        dining experience.
      </p>
    </div>
  );
};

export default EmptyProductList;