interface ProductTitleProps {
  name: string;
  price: number;
}

const ProductTitle = ({ name, price }: ProductTitleProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-bourbon-800 mb-2">{name}</h1>
      <p className="text-2xl font-semibold text-bourbon-600">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductTitle;