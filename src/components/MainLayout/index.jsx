import Header from "components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
