interface ProductTitleProps {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const ProductTitle = ({ name, price, quantity, total }: ProductTitleProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-bourbon-800 mb-2">{name}</h1>
      <div className="space-y-1">
        <p className="text-2xl font-semibold text-bourbon-600">
          ${price.toFixed(2)} 
          <span className="text-lg text-gray-600 ml-1">per unit</span>
        </p>
        {quantity > 1 && (
          <p className="text-lg text-gray-600">
            Total: ${total.toFixed(2)} for {quantity} units
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductTitle;