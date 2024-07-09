import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, addToOrder } from "../features/productSlice";
import ProductCard from "./ProductCard";
import CategoryList from "./CategoryList";
import SortOptions from "./SortOptions";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const categories = useSelector((state) => state.products.categories);

  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let apiUrl = "http://localhost:8080/pos/api/listproduct";
        if (selectedCategory !== 0) {
          apiUrl += `?category_id=${selectedCategory}`;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch, selectedCategory]);

  const handleSortByprice = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/pos/api/listproduct?sort_by=price&sort_order=asc"
      );
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error("Error fetching sorted products:", error);
    }
  };

  const handleSortByname = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/pos/api/listproduct?sort_by=title&sort_order=asc"
      );
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error("Error fetching sorted products:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/pos/api/listproduct?title=${searchInput}`
      );
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="w-2/3 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari Produk"
            className="py-1 px-3 rounded border"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Cari
          </button>
        </div>
        <div>
          <SortOptions
            handleSortByName={handleSortByname}
            handleSortByPrice={handleSortByprice}
          />
        </div>
      </div>
      <div className="products">
        <div className="container mx-auto max-w-6xl">
          <h2 className="title text-center mt-8 mb-12 text-xl font-bold">
            Daftar Produk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToOrder={() => dispatch(addToOrder(product.id))}
              />
            ))}
          </div>
        </div>
      </div>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default ProductList;
