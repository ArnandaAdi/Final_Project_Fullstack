import { Routes, Route } from "react-router-dom";
import ProductList from "./component/ProductList";
import ListProduct from "./component/ListProduct";
import ProductAdd from "./component/AddProduct";
import ProductEdit from "./component/EditProduct";
import DetailProduct from "./component/DetailProduct";
import OrderList from "./component/OrderList";
import PaymentPage from "./component/PaymentPage";
import TransactionDetail from "./component/TransactionDetail";
import TransactionHistory from "./component/TransactionHistory";
import ListCategory from "./component/ListCategory";
import CategoryDetail from "./component/CategoryDetail";
import AddCategory from "./component/AddCategory";
import EditCategory from "./component/EditCategory";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="grid">
            <ProductList />
            <OrderList />
          </div>
        }
      />
      <Route path="/listproduct" element={<ListProduct />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/transaction-detail/:id" element={<TransactionDetail />} />
      <Route path="/transaction-history" element={<TransactionHistory />} />
      <Route path="/product/add" element={<ProductAdd />} />
      <Route path="/product/edit/:id" element={<ProductEdit />} />
      <Route path="/product/detail/:id" element={<DetailProduct />} />

      <Route path="/listcategory" element={<ListCategory />} />
      <Route path="/categorydetail/:id" element={<CategoryDetail />} />
      <Route path="/addcategory" element={<AddCategory />} />
      <Route path="/editcategory/:id" element={<EditCategory />} />
    </Routes>
  );
}

export default App;
