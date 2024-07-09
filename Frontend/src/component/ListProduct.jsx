import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/FormatCurrency";
import DeleteProduct from "./DeleteProduct"; // Import the DeleteProduct component

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/pos/api/listproduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = (deletedProductId) => {
    setProducts(products.filter((product) => product.id !== deletedProductId));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-20">List Product</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Product Id</th>
            <th className="py-2 px-4 border-b text-center">Product Name</th>
            <th className="py-2 px-4 border-b text-center">Price</th>
            <th className="py-2 px-4 border-b text-center">Category</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5">
              <hr className="my-4 border-b-2 border-black" />
            </td>
          </tr>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-4 px-4 border-b text-center">{product.id}</td>
              <td className="py-4 px-4 border-b">{product.title}</td>
              <td className="py-4 px-4 border-b text-center">
                {formatCurrency(product.price)}
              </td>
              <td className="py-4 px-4 border-b text-center">
                {product.category_name}
              </td>
              <td className="py-4 px-4 border-b space-x-2 text-center">
                <Link
                  to={`/product/detail/${product.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Detail
                </Link>
                <Link
                  to={`/product/edit/${product.id}`}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  Edit
                </Link>
                {/* Integrate DeleteProduct component for each product */}
                <DeleteProduct
                  productId={product.id}
                  onDelete={handleDeleteProduct}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/product/add"
        className="fixed top-4 right-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </Link>
    </div>
  );
};

export default ListProduct;
