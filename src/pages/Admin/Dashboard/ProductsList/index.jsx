// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { adminGetProducts } from "store/slices/productSlice";

// function ProductsList() {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     dispatch(adminGetProducts(currentPage));
//   }, []);
//   return <div>ProductsList</div>;
// }

// export default ProductsList;

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconLoading from "components/IconLoading";
import Pagination from "components/Pagination";
import { adminGetProducts, deleteProduct, productStateSelect } from "store/slices/productSlice";
import { formatMoney } from "utils/FormatData";
import ToastMsg from "utils/ToastMsg";
function ProductsList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    adminGetProducts: { products, last_page, current_page, status },
    deleteProduct: { status: deleteStatus },
  } = useSelector(productStateSelect);
  useEffect(() => {
    dispatch(adminGetProducts(currentPage));
  }, [currentPage, dispatch]);

  // Update products
  const [deleteID, setDeleteID] = useState(null);

  const handleDeleteProduct = (product) => {
    setDeleteID(product._id);
    if (window.confirm("Bạn có muốn xóa?")) {
      dispatch(deleteProduct(product._id))
        .unwrap()
        .then((data) => {
          ToastMsg("success", data.message);
          setCurrentPage(1);
          dispatch(adminGetProducts(currentPage));
        });
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center  w-full mt-40">
        <IconLoading width="50px" height="50px" />
      </div>
    );
  }
  if (products?.length === 0) {
    return <h1 className="p-5 text-xl text-red-500">Sản phẩm trống.</h1>;
  }
  return (
    products && (
      <div className="sm:p-5 sm:px-4 bg-white sm:rounded sm:shadow-md">
        <div className="relative overflow-x-auto border">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Tên
                </th>
                <th scope="col" className="px-3 py-3">
                  Giá
                </th>
                <th scope="col" className="px-3 py-3">
                  Hình ảnh
                </th>
                <th scope="col" className="px-3 py-3">
                  Chỉnh sửa
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="bg-white  border-b">
                  <td className="px-3 py-4">{product.name}</td>
                  <td className="px-3 py-4">{formatMoney(product.price)}</td>
                  <th className="px-3 py-4">
                    <img
                      src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_80,w_80/v1649473695/${product.image}`}
                      alt={product.name}
                      className="w-auto h-20 object-contain"
                    />
                  </th>

                  <td className="px-3 py-4">
                    <Link to={`/admin/product/edit/${product._id}`} className="text-blue-600 mr-5">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>

                    {deleteStatus === "loading" && deleteID === product._id ? (
                      <IconLoading />
                    ) : (
                      <button className="text-red-600" onClick={() => handleDeleteProduct(product)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {last_page && last_page !== 1 && (
            <Pagination
              currentPage={currentPage}
              last_page={last_page}
              current_page={current_page}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    )
  );
}

export default ProductsList;
