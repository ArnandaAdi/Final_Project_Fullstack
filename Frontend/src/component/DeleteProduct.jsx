import React, { useState } from "react";
import axios from "axios";

const DeleteProduct = ({ productId, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:8080/pos/api/deleteproduct/${productId}`
      );

      if (response.status === 200) {
        onDelete(productId);
      } else {
        window.alert("Gagal menghapus produk. Silakan coba lagi nanti.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      window.alert("Gagal menghapus produk karena produk sudah pernah dibeli.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`bg-red-500 text-white px-4 py-2 rounded ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isDeleting}
    >
      {isDeleting ? "Menghapus..." : "Hapus"}
    </button>
  );
};

export default DeleteProduct;
