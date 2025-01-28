interface EmptyProductListProps {
  searchQuery: string;
}

const EmptyProductList = ({ searchQuery }: EmptyProductListProps) => {
  return (
    <div className="text-center py-12 bg-bourbon-50 rounded-lg">
      <p className="text-lg text-gray-600 mb-4">
        No products found matching "{searchQuery}".
      </p>
      <p className="text-gray-500">
        Try adjusting your search terms or filters to discover our premium Bourbon-finished beef selections.
      </p>
    </div>
  );
};

export default EmptyProductList;