import { useSelector, useDispatch } from "react-redux";
import {
  removeFromOrder,
  incrementQuantity,
  decrementQuantity,
} from "../features/productSlice";
import { formatCurrency } from "../utils/FormatCurrency";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const order = useSelector((state) => state.products.order);
  const dispatch = useDispatch();
  const total = useSelector((state) =>
    state.products.order.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  );
  const navigate = useNavigate();

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromOrder(itemId));
  };

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div className="fixed right-0 top-0 w-1/3 p-4 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-xl mb-4 font-bold">Daftar Pesanan</h2>
      <div className="flex flex-col space-y-4">
        {order.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-gray-300 py-1 px-3 rounded-l"
                onClick={() => handleDecrement(item.id)}
              >
                -
              </button>
              <span className="py-1 px-3">{item.quantity}</span>
              <button
                className="bg-gray-300 py-1 px-3 rounded-r"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded ml-2"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xl mt-4 font-semibold">
        Total: {formatCurrency(total)}
      </p>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded w-full mt-4"
        onClick={handlePayment}
      >
        Payment
      </button>
    </div>
  );
};

export default OrderList;
