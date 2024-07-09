import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/pos/api/listcategory"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pos/api/deletecategory/${id}`);
      fetchCategories();
    } catch (error) {
      alert("Category cannot be deleted. It has related products.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>
      <Link
        to="/addcategory"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Tambah Kategori
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID Kategori</th>
            <th className="py-2">Nama Kategori</th>
            <th className="py-2">Jumlah Produk Terkait</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="py-2 text-center">{category.id}</td>
              <td className="py-2 text-center">{category.name}</td>
              <td className="py-2 text-center">{category.totalProducts}</td>
              <td className="py-2 text-center">
                <Link
                  to={`/categorydetail/${category.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Detail
                </Link>
                <Link
                  to={`/editcategory/${category.id}`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
