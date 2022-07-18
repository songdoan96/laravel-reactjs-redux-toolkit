import IconLoading from "components/IconLoading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetCategories,
  adminGetProducts,
  productStateSelect,
  storeProduct,
} from "store/slices/productSlice";
import ToastMsg from "utils/ToastMsg";
const formInit = {
  name: "",
  price: "",
  description: "",
  newCategory: "",
  category: "",
};
function Upload() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(formInit);
  const [picture, setPicture] = useState([]);
  const [newCategory, setNewCategory] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputFile = (e) => {
    setPicture({ image: e.target.files[0] });
  };
  const {
    adminGetCategories: { categories },
    storeProduct: { status: storeStatus },
  } = useSelector(productStateSelect);
  useEffect(() => {
    dispatch(adminGetCategories());
  }, [dispatch]);
  const [errors, setErrors] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("price", formData.price);
    newFormData.append("description", formData.description);
    newFormData.append("image", picture.image);
    if (newCategory) {
      newFormData.append("newCategory", formData.newCategory);
    } else {
      newFormData.append("category", formData.category);
    }
    dispatch(storeProduct(newFormData))
      .unwrap()
      .then((data) => {
        ToastMsg("success", data.message);
        e.target.reset();
        setFormData(formInit);
        setNewCategory(false);
        dispatch(adminGetCategories());
        dispatch(adminGetProducts());
      })
      .catch((error) => setErrors(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
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
        />
        {errors && <p className="text-red-500 mt-2">{errors.name}</p>}
      </div>
      <div className="mb-6">
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
        />
        {errors && <p className="text-red-500 mt-2">{errors.price}</p>}
      </div>
      <div className="flex items-center mb-2">
        <input
          id="category"
          type="checkbox"
          onChange={(e) => (e.target.checked ? setNewCategory(true) : setNewCategory(false))}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="category" className="ml-2 text-sm font-medium text-gray-900 ">
          Danh mục mới
        </label>
      </div>
      {newCategory ? (
        <div className="mb-6">
          <input
            type="text"
            id="newCategory"
            name="newCategory"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            onChange={handleInput}
          />
          {errors && <p className="text-red-500 mt-2">{errors.newCategory}</p>}
        </div>
      ) : (
        <div className="mb-6">
          <select
            name="category"
            id="category"
            onChange={handleInput}
            required
            className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          >
            <option disabled>Danh mục sản phẩm</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors && <p className="text-red-500 mt-2">{errors.category}</p>}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">
          Mô tả
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={handleInput}
        ></textarea>
        {errors && <p className="text-red-500 mt-2">{errors.description}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">
          Hình ảnh
        </label>
        <input
          className="border p-2 block w-full rounded-lg"
          type="file"
          name="image"
          id="image"
          required
          onChange={handleInputFile}
        />
        {errors && <p className="text-red-500 mt-2">{errors.image}</p>}
      </div>
      {storeStatus === "loading" ? (
        <button
          disabled
          className=" text-white cursor-none opacity-60 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full block mx-auto sm:w-auto px-5 py-2.5 text-center"
        >
          Đang thêm <IconLoading />
        </button>
      ) : (
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full block mx-auto sm:w-auto px-5 py-2.5 text-center"
        >
          Thêm sản phẩm
        </button>
      )}
    </form>
  );
}

export default Upload;
