import {
  faArrowRightFromBracket,
  faBars,
  faCaretDown,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authStateSelect, logout, resetUser } from "store/slices/authSlice";
import { cartStateSelect, clearCart } from "store/slices/cartSlice";
import ToastMsg from "utils/ToastMsg";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const { cartItems } = useSelector(cartStateSelect);
  const { user } = useSelector(authStateSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((data) => {
        ToastMsg("success", data.message);
        dispatch(clearCart());
        dispatch(resetUser());
        localStorage.removeItem("token");
        // to 0
        navigate("/");
      })
      .catch((error) => ToastMsg("warn", error));
  };
  return (
    <div className="top-bar bg-white text-black py-2 px-5 md:px-10 border-b-2">
      <div className="menu flex justify-between items-center relative">
        <Link to="/" className="text-xl sm:text-2xl">
          <strong className="text-3xl">S.</strong>Food
        </Link>

        <div className="icons flex flex-wrap items-center gap-2 sm:gap-5">
          <Link to="/cart" className="flex items-center border px-1 sm:p-2">
            <FontAwesomeIcon className="text-base sm:text-2xl text-primary" icon={faShoppingCart} />
            <div className="badge text-base sm:text-xl font-normal ml-2">{cartItems.length}</div>
          </Link>
          {user ? (
            <>
              <button
                className="text-sm sm:text-base font-medium text-center inline-flex items-center relative"
                type="button"
                onMouseOver={() => setShowDropDown((prev) => !prev)}
              >
                {user.name}
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </button>
              <div
                id="dropdown"
                onMouseLeave={() => setShowDropDown((prev) => !prev)}
                className={
                  (showDropDown ? "" : "hidden") +
                  " absolute mt-2 top-full right-0 z-10  bg-white divide-y divide-gray-100 rounded shadow w-36 "
                }
              >
                <ul className="py-1 text-sm text-gray-700 ">
                  {user && user.role === "admin" ? (
                    <>
                      <li>
                        <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 ">
                          Sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-100 ">
                          Đơn hàng
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 ">
                        Đơn hàng
                      </Link>
                    </li>
                  )}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 bg-red-500 text-white hover:opacity-80 transition"
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <FontAwesomeIcon
              className="cursor-pointer md:hidden text-2xl"
              icon={faBars}
              onClick={() => setShowMenu((prev) => !prev)}
            />
          )}

          {!user && (
            <div className="hidden md:flex gap-5 items-center">
              <Link to="/register" className="hover:opacity-80">
                Đăng ký
              </Link>
              <Link to="/login" className="hover:opacity-80">
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
      {!user && (
        <div
          onMouseLeave={() => setShowMenu((prev) => !prev)}
          className={
            (showMenu ? "flex flex-col w-full" : "hidden") +
            " navbar md:hidden mt-3 gap-3 text-center text-sm uppercase transition-all duration-500 ease-in-out	"
          }
        >
          <Link to="/register" className="hover:opacity-80">
            Đăng ký
          </Link>
          <Link to="/login" className="hover:opacity-80">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
