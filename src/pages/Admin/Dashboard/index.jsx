import { useState } from "react";
import ProductList from "./ProductsList";
import Categories from "./Categories";
import Upload from "./Upload";
function AdminDashboard() {
  const [showProducts, setShowProducts] = useState(true);
  return (
    <div className="grid p-5 px-5 md:px-10 grid-cols-1 md:grid-cols-12 gap-10 md:gap-5 ">
      <div className="md:col-span-4">
        <h1 className="mb-3 font-bold uppercase text-base ">Thêm sản phẩm</h1>
        <div className="bg-white px-5 sm:px-32 md:px-5 py-5">{<Upload />}</div>
      </div>
      <div className="md:col-span-8">
        <div className="flex gap-10">
          <button
            onClick={() => setShowProducts(true)}
            className={`${
              showProducts && "border-b-2 border-primary"
            } mb-3 font-bold uppercase text-base`}
          >
            Sản phẩm
          </button>
          <button
            onClick={() => setShowProducts(false)}
            className={`${
              !showProducts && "border-b-2 border-primary"
            } mb-3 font-bold uppercase text-base`}
          >
            Danh mục
          </button>
        </div>
        {showProducts ? <ProductList /> : <Categories />}
      </div>
    </div>
  );
}

export default AdminDashboard;
