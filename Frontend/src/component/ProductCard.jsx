import { useDispatch, useSelector } from "react-redux";
import { addToOrder } from "../features/productSlice";
import { formatCurrency } from "../utils/FormatCurrency";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.products.order);

  const orderItem = order.find((item) => item.id === product.id);
  const quantityInOrder = orderItem ? orderItem.quantity : 0;

  const isProductInOrder = quantityInOrder > 0;

  const handleAddToOrder = () => {
    dispatch(addToOrder(product.id));
  };

  return (
    <div
      className="overflow-hidden rounded-lg shadow-md bg-white"
      onClick={handleAddToOrder}
      style={{ cursor: "pointer" }}
    >
      <div className="relative">
        {isProductInOrder && (
          <div className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
            {quantityInOrder}
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover mb-2 rounded-t-lg"
          style={{ maxHeight: "240px" }}
        />
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-center text-gray-900 mb-2">
          {product.title}
        </h4>
        <p className="text-gray-700 text-center text-xl font-bold mb-2">
          {formatCurrency(product.price)}
        </p>
        <button
          className={`block mx-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
            isProductInOrder ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isProductInOrder}
        >
          {isProductInOrder ? "Added to Order" : "Add to Order"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
