import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconLoading from "components/IconLoading";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { incrementByAmount } from "store/slices/cartSlice";
import { getProducts, productStateSelect } from "store/slices/productSlice";
import { formatMoney } from "utils/FormatData";
import ToastMsg from "utils/ToastMsg";
function Home() {
  const [showSortBox, setShowSortBox] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("all");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    dispatch(getProducts({ currentPage, sort, filter }));
  }, [currentPage, dispatch, sort, filter]);

  const {
    getProducts: { status, current_page, last_page, products, categories },
  } = useSelector(productStateSelect);

  const handleAddToCart = (product) => {
    ToastMsg("success", "Đã thêm sản phẩm vào giỏ hàng.");
    dispatch(incrementByAmount({ product, qty: 1 }));
  };
  let child = "";
  if (status === "loading") {
    child = (
      <div className="text-center  w-full mt-40">
        <IconLoading width="50px" height="50px" />
      </div>
    );
  } else if (status === "failed") {
    child = (
      <div className="text-center mt-52">
        <h1 className="font-bold text-3xl text-red-600">Lỗi mạng.</h1>
      </div>
    );
  } else {
    if (products && products.length > 0) {
      child = (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-3 border-black hover:border hover:shadow-lg bg-white  rounded"
            >
              <Link to={`/product/detail/${product._id}`}>
                <div className="px-8 h-56 overflow-hidden">
                  <img
                    src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_300/v1649473695/${product.image}`}
                    alt={product.name}
                    className="block h-auto max-w-full object-contain hover:scale-110 transition duration-200"
                  />
                </div>
              </Link>
              <div className="flex sm:flex-col justify-between gap-4">
                <div className="w-2/3 sm:w-full sm:text-center">
                  <p className="font-semibold md:font-medium py-2 w-full ">{product.name}</p>
                  <div
                    className="stars mt-2"
                    style={{ "--rating": `${product.avgStarProduct}` }}
                  ></div>
                </div>
                <div className="flex flex-col w-1/3 sm:w-full sm:flex-row justify-between sm:items-center text-right">
                  <span className="sm:text-base font-bold text-primary">
                    {formatMoney(product.price)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="border rounded-sm border-primary p-2 text-sm hover:bg-primary hover:text-white transition"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      child = <h1 className="uppercase w-max ">Không tìm thấy sản phẩm</h1>;
    }
  }
  return (
    <div className="p-5 px-5 md:px-10">
      <div className="toolbar flex gap-4 justify-between sm:justify-end items-center">
        <div className="filter">
          <div className="sortBy relative">
            <div
              onMouseOver={() => setShowSortBox(true)}
              onMouseOut={() => setShowSortBox(false)}
              className="bg-white border p-4 py-2 flex justify-between items-center gap-4 cursor-pointer"
            >
              <span>Sắp xếp:</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {showSortBox && (
              <ul
                onMouseOver={() => setShowSortBox(true)}
                onMouseOut={() => setShowSortBox(false)}
                className="absolute z-10 bg-white text-sm right-0 w-full flex flex-col gap-2 p-4 shadow-md transition"
              >
                <li
                  onClick={() => setSort("name_asc")}
                  className="cursor-pointer hover:text-primary"
                >
                  Tên A-Z
                </li>
                <li
                  onClick={() => setSort("name_desc")}
                  className="cursor-pointer hover:text-primary"
                >
                  Tên Z-A
                </li>
                <li
                  onClick={() => setSort("price_asc")}
                  className="cursor-pointer hover:text-primary"
                >
                  Giá tăng dần
                </li>
                <li
                  onClick={() => setSort("price_desc")}
                  className="cursor-pointer hover:text-primary"
                >
                  Giá giảm dần
                </li>
                <li onClick={() => setSort("latest")} className="cursor-pointer hover:text-primary">
                  Mới nhất
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="categories">
          <div className="categories relative">
            <div
              onMouseOver={() => setShowCategories(true)}
              onMouseOut={() => setShowCategories(false)}
              className="bg-white border p-4 py-2 flex justify-between items-center gap-4 cursor-pointer"
            >
              <span>Danh mục:</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {showCategories && (
              <ul
                onMouseOver={() => setShowCategories(true)}
                onMouseOut={() => setShowCategories(false)}
                className="absolute z-10 bg-white text-sm right-0 w-full flex flex-col gap-2 p-4 shadow-md transition"
              >
                <li
                  onClick={() => {
                    setFilter("all");
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  Tất cả
                </li>
                {categories?.map((category) => (
                  <li
                    onClick={() => {
                      setFilter(category._id);
                      setCurrentPage(1);
                    }}
                    key={category._id}
                    className="cursor-pointer hover:text-primary"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-screen">{child}</div>

      {last_page && last_page !== 1 && (
        <div className=" mt-12">
          <Pagination
            currentPage={currentPage}
            current_page={current_page}
            last_page={last_page}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
