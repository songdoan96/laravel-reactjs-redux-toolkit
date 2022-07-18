import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStateSelect } from "store/slices/authSlice";
import ToastMsg from "../../utils/ToastMsg";
function ProtectedLayout({ roleRoute }) {
  const { user } = useSelector(authStateSelect);
  const userRole = user?.role;

  const location = useLocation();
  if (!userRole) {
    ToastMsg("warn", "Vui lòng đăng nhập.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (userRole !== "admin" && roleRoute !== userRole) {
    ToastMsg("warn", "Không có quyền truy cập.");
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedLayout;
