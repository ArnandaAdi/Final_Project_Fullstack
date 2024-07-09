import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const TransactionDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [transactionDetails, setTransactionDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/pos/api/listtransaksidetail/${id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setTransactionDetails(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      });
  }, [id]);

  const handleBackClick = () => {
    navigate("/transaction-history");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Transaksi</h1>
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
      >
        Kembali
      </button>
      {transactionDetails.length > 0 && (
        <div className="mb-4">
          <p>
            <strong>ID Transaksi:</strong>{" "}
            {transactionDetails[0].transaction_id}
          </p>
          <p>
            <strong>Tanggal Transaksi:</strong> {location.state.transactionDate}
          </p>
          <p>
            <strong>Nama Produk:</strong>{" "}
            {transactionDetails.map((detail) => detail.product_name).join(", ")}
          </p>
          <p>
            <strong>Total Harga:</strong> Rp{" "}
            {transactionDetails
              .reduce((sum, detail) => sum + detail.sub_total, 0)
              .toLocaleString()}
          </p>
          <p>
            <strong>Total Bayar:</strong> Rp{" "}
            {location.state.totalPay.toLocaleString()}
          </p>
        </div>
      )}
      <table className="text-center min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID Produk</th>
            <th className="py-2 px-4 border-b">Nama Produk</th>
            <th className="py-2 px-4 border-b">Harga Satuan</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails.map((detail) => (
            <tr key={detail.product_id}>
              <td className="py-2 px-4 border-b">{detail.product_id}</td>
              <td className="py-2 px-4 border-b">{detail.product_name}</td>
              <td className="py-2 px-4 border-b">
                Rp {detail.product_price?.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{detail.quantity}</td>
              <td className="py-2 px-4 border-b">
                Rp {detail.sub_total?.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetail;
