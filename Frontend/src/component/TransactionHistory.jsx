import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/pos/api/listtransactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the transactions!", error);
      });
  }, []);

  const handleDetailClick = (transaction) => {
    navigate(`/transaction-detail/${transaction.id}`, {
      state: {
        transactionDate: transaction.transaction_date,
        totalPay: transaction.total_pay,
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">
              Tanggal Transaksi
            </th>
            <th className="py-2 px-4 border-b text-center">ID Transaksi</th>
            <th className="py-2 px-4 border-b text-center">Total Harga</th>
            <th className="py-2 px-4 border-b text-center">Total Bayar</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="text-center">
              <td className="py-2 px-4 border-b">
                {transaction.transaction_date}
              </td>
              <td className="py-2 px-4 border-b">{transaction.id}</td>
              <td className="py-2 px-4 border-b">
                Rp {transaction.total_amount.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                Rp {transaction.total_pay.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDetailClick(transaction)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                >
                  Detail Transaksi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
