interface ProductDescriptionProps {
  description: string | null;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;
  
  return (
    <div className="prose prose-bourbon">
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

export default ProductDescription;