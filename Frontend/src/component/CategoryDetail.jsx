import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pos/api/detailcategory/${id}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category detail:", error);
      }
    };

    fetchCategoryDetail();
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Kategori</h1>
      <div className="border border-gray-300 p-5 rounded-lg">
        <p className="mb-2">
          <strong>ID Kategori:</strong> {category.id}
        </p>
        <p className="mb-2">
          <strong>Nama Kategori:</strong> {category.name}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-5 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300"
        >
          KEMBALI
        </button>
      </div>
    </div>
  );
};

export default CategoryDetail;
