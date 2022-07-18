import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconLoading from "components/IconLoading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteCategories,
  adminGetCategories,
  adminUpdateCategories,
  productStateSelect,
} from "store/slices/productSlice";
import { formatDateTime } from "utils/FormatData";
import ToastMsg from "utils/ToastMsg";

function Categories() {
  const dispatch = useDispatch();
  const {
    adminGetCategories: { categories, errors, status },
    adminDeleteCategories: { status: deleteStatus },
  } = useSelector(productStateSelect);

  useEffect(() => {
    dispatch(adminGetCategories());
  }, [dispatch]);
  const [nameEdit, setName] = useState(null);
  const [idEdit, setID] = useState(null);
  const [deleteID, setDeleteID] = useState(null);

  const handleSubmit = () => {
    const data = {
      name: nameEdit,
      id: idEdit,
    };
    dispatch(adminUpdateCategories(data)).then((data) => {
      ToastMsg("status", data.message);
      dispatch(adminGetCategories());
    });
    setName(null);
    setID(null);
  };
  const handleDeleteCategory = (id) => {
    setDeleteID(id);
    if (window.confirm("Bạn có muốn xóa?")) {
      dispatch(adminDeleteCategories(id))
        .unwrap()
        .then((data) => {
          ToastMsg("status", data.message);
          dispatch(adminGetCategories());
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
  if (errors) {
    return <h1 className="p-5  text-red-500">{errors}</h1>;
  }
  if (categories?.length === 0) {
    return <h1 className="p-5  text-red-500">Danh mục trống.</h1>;
  }
  return (
    <>
      {categories && (
        <div className="sm:p-5 sm:px-4 bg-white sm:rounded sm:shadow-md">
          <div className="relative overflow-x-auto border">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Tên
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Ngày tạo
                  </th>

                  <th scope="col" className="px-3 py-3">
                    Chỉnh sửa
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="bg-white  border-b">
                    <td className="px-3 py-4 font-semibold flex items-center justify-between">
                      {nameEdit && idEdit === category._id ? (
                        <div className="relative overflow-hidden">
                          <input
                            type="text"
                            className="w-full border border-primary p-2 py-1"
                            name="category"
                            value={nameEdit}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <button
                            className="text-green-600 px-2 h-full absolute right-0 top-1/2 -translate-y-1/2"
                            onClick={handleSubmit}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        </div>
                      ) : (
                        <h1>{category.name}</h1>
                      )}
                    </td>
                    <td className="px-3 py-4">{formatDateTime(category.created_at)}</td>

                    <td className="px-3 py-4 flex gap-4">
                      <button
                        className="text-blue-600"
                        onClick={() => {
                          setName(category.name);
                          setID(category._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {deleteStatus === "loading" && deleteID === category._id ? (
                        <IconLoading />
                      ) : (
                        <button
                          className="text-red-600"
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
