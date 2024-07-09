import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [productData, setProductData] = useState({
    title: "",
    image: "",
    price: "",
    category_id: "",
    category_name: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pos/api/listcategory"
        );
        setCategories(response.data); // assuming response.data is an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/pos/api/addproduct", productData);
      alert("Product added successfully!");
      setProductData({
        title: "",
        image: "",
        price: "",
        category_id: "",
        category_name: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        alert(`Failed to add product: ${error.response.data.message}`);
      } else {
        alert("Failed to add product. Please try again.");
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Product Name:</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select
            name="category_id"
            value={productData.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL:</label>
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </form>
      <button
        onClick={handleBack}
        className="mt-5 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        Kembali
      </button>
    </div>
  );
};

export default ProductAdd;
