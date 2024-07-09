import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/pos/api/addcategory", {
        name: categoryName,
      });
      alert("Category added successfully!");
      setCategoryName(""); // Reset the input field after successful addition
      navigate("/listcategory"); // Redirect to category list after adding
    } catch (error) {
      console.error("Error adding category:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        setError(error.response.data.message); // Set error message from server response
      } else {
        setError("Failed to add category. Please try again."); // Set generic error message
      }
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
    setError(null); // Clear any previous error message when input changes
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleAddCategory} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        {error && (
          <div className="text-red-500 font-medium">Error: {error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Category
        </button>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        Kembali
      </button>
    </div>
  );
};

export default AddCategory;
