import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetOrder } from "../features/productSlice";
import { formatCurrency } from "../utils/FormatCurrency";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Impor useNavigate

const PaymentPage = () => {
  const order = useSelector((state) => state.products.order);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  const [amountPaid, setAmountPaid] = useState("");
  const [change, setChange] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const totalPrice = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const paid =
      parseFloat(amountPaid.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
    setChange(paid - totalPrice);
  }, [amountPaid, totalPrice]);

  const handleAmountPaidChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmountPaid(value);
    }
  };

  const handleOrder = async () => {
    const paidAmount =
      parseFloat(amountPaid.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;

    if (paidAmount >= totalPrice) {
      try {
        const transactionDetails = order.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          sub_total: item.price * item.quantity,
        }));

        const transactionData = {
          total_amount: totalPrice,
          total_pay: paidAmount,
          transaction_details: transactionDetails,
        };

        const response = await axios.post(
          "http://localhost:8080/pos/api/addtransaction",
          transactionData
        );

        if (response.status === 200) {
          alert("Pembelian sukses!");
          dispatch(resetOrder());
          setAmountPaid("");
          setChange(0);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
          navigate("/");
        } else {
          setErrorMessage("Terjadi kesalahan saat melakukan transaksi.");
        }
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat melakukan transaksi.");
      }
    } else {
      setErrorMessage("Jumlah yang dibayar tidak mencukupi total pembelian.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-2/3">
          <h2 className="text-xl mb-4">Rincian Pesanan</h2>
          {order.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3>{item.title}</h3>
                  <p>{formatCurrency(item.price)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p>{item.quantity}x</p>
              </div>
              <p>{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="w-1/3 ml-4">
          <h2 className="text-xl mb-4">Pembayaran</h2>
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Dibayar</span>
            <input
              type="text"
              value={amountPaid}
              onChange={handleAmountPaidChange}
              className="border p-1"
              placeholder="Rp."
            />
          </div>
          <div className="flex justify-between mb-4">
            <span>Kembalian</span>
            <span>{formatCurrency(change < 0 ? 0 : change)}</span>
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <button
            className={`bg-green-500 text-white py-2 px-4 rounded ${
              parseFloat(
                amountPaid.replace(/[^0-9,-]+/g, "").replace(",", ".")
              ) < totalPrice
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleOrder}
            disabled={
              parseFloat(
                amountPaid.replace(/[^0-9,-]+/g, "").replace(",", ".")
              ) < totalPrice
            }
          >
            Selesaikan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
