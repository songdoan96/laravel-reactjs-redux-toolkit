import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoBack from "components/GoBack";
import IconLoading from "components/IconLoading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductEdit, productStateSelect, updateProduct } from "store/slices/productSlice";
import ToastMsg from "utils/ToastMsg";

function AdminEditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    getProductEdit: { product, status, errors, categories },
    updateProduct: { status: updateStatus },
  } = useSelector(productStateSelect);

  const [productData, setProductData] = useState(product);
  const [updateErrors, setUpdateErrors] = useState();
  useEffect(() => {
    dispatch(getProductEdit(id))
      .unwrap()
      .then((data) => setProductData(data.product));
  }, [dispatch, id]);

  const [picture, setPicture] = useState(null);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleInputFile = (e) => {
    setPicture({ image: e.target.files[0] });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateErrors();
    const formUpdate = new FormData();
    formUpdate.append("name", productData.name);
    formUpdate.append("price", productData.price);
    formUpdate.append("description", productData.description);
    if (picture) {
      formUpdate.append("image", picture.image);
    }
    formUpdate.append("category_id", productData.category_id);
    formUpdate.append("_method", "PUT");

    dispatch(updateProduct({ formUpdate, id: productData._id }))
      .unwrap()
      .then((data) => {
        ToastMsg("success", data.message);
        dispatch(getProductEdit(id));
      })
      .catch((error) => setUpdateErrors(error));
  };
  if (status === "loading") {
    return (
      <div className="text-center  w-full mt-40">
        <IconLoading width="50px" height="50px" />
      </div>
    );
  }
  if (errors) {
    return (
      <div className="w-full mt-40 text-center ">
        <p className="text-2xl text-red-500">{errors}</p>
        <GoBack />
      </div>
    );
  }
  return (
    productData && (
      <div className="p-5 px-5 md:px-10 ">
        <div className="flex mb-4 justify-end">
          <Link to="/admin/dashboard" className="bg-primary p-2 text-white rounded">
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            Sản phẩm
          </Link>
        </div>
        <form onSubmit={handleUpdateSubmit} className="bg-white shadow-md">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-2 ">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={handleInput}
                  value={productData.name}
                />
                {updateErrors && <p className="text-red-500 mt-2">{updateErrors.name}</p>}
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Giá sản phẩm
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={handleInput}
                  value={productData.price}
                />
                {updateErrors && <p className="text-red-500 mt-2">{updateErrors.price}</p>}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="category-edit"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Danh mục
                </label>
                <select
                  name="category_id"
                  id="category-edit"
                  onChange={handleInput}
                  required
                  value={productData.category_id}
                  className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                >
                  <option disabled>Danh mục sản phẩm</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {updateErrors && <p className="text-red-500 mt-2">{updateErrors.price}</p>}
              </div>

              <div className="mb-2 col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Mô tả
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={handleInput}
                  value={productData.description}
                  rows={8}
                >
                  {productData.description}
                </textarea>
                {updateErrors && <p className="text-red-500 mt-2">{updateErrors.description}</p>}
              </div>
              <div className="mb-2">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Hình ảnh
                </label>
                <input
                  className="border p-2 block w-full rounded-lg"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleInputFile}
                />
                <img
                  src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_80,w_80/v1649473695/${productData.image}`}
                  alt={productData.name}
                  className="w-auto h-20 object-contain"
                />
                {updateErrors && <p className="text-red-500 mt-2">{updateErrors.image}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
            {updateStatus === "loading" ? (
              <button
                disabled
                className="opacity-60 cursor-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đang cập nhật <IconLoading />
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Cập nhật
              </button>
            )}
          </div>
        </form>
      </div>
    )
  );
}
export default AdminEditProduct;
