import React from "react";
import axios from "axios";

const DeleteCategory = ({ categoryId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/pos/api/deletecategory/${categoryId}`
      );
      onDelete(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Kategori tidak dapat dihapus karena memiliki produk terkait.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Hapus
    </button>
  );
};

export default DeleteCategory;
