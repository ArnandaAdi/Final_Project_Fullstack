import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/pos/api/detailcategory/${id}`)
      .then((response) => {
        const { name } = response.data;
        setCategory({ name });
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:8080/pos/api/updatecategory/${id}`, category)
        .then((response) => {
          console.log("Category updated successfully:", response.data);
          navigate("/listcategory");
        })
        .catch((error) => {
          console.error("Error updating category:", error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!category.name) {
      formIsValid = false;
      errors["name"] = "Category name is required.";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-70"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
