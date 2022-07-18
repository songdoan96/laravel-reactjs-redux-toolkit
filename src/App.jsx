import MainLayout from "components/MainLayout";
import ProtectedLayout from "components/ProtectedLayout";
import jwtDecode from "jwt-decode";
import { AdminDashboard, AdminEditProduct, AdminOrder, AdminOrderDetail } from "pages/Admin";
import Cart from "pages/Cart";
import { Page403, Page404 } from "pages/Errors";
import Home from "pages/Home";
import Login from "pages/Login";
import ProductDetail from "pages/ProductDetail";
import Register from "pages/Register";
import { UserOrder, UserOrderDetail } from "pages/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { resetUser } from "store/slices/authSlice";
import ToastMsg from "utils/ToastMsg";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenExp = jwtDecode(token).exp * 1000;
      if (tokenExp < Date.now()) {
        ToastMsg("warn", "Phiên đăng nhập đã hết hạn.Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        dispatch(resetUser());
      }
    }
  }, [dispatch, location]);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />

        <Route element={<ProtectedLayout roleRoute={"user"} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<UserOrder />} />
          <Route path="/order/:id" element={<UserOrderDetail />} />
        </Route>

        <Route element={<ProtectedLayout roleRoute={"admin"} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/product/edit/:id" element={<AdminEditProduct />} />
          <Route path="/admin/orders" element={<AdminOrder />} />
          <Route path="/admin/order/:id" element={<AdminOrderDetail />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Page403 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
