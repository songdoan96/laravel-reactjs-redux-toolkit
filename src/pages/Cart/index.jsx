import { faMinus, faPlus, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartStateSelect,
  decreaseCartQty,
  increaseCartQty,
  removeProductFromCart,
} from "store/slices/cartSlice";
import { formatMoney } from "utils/FormatData";
import Checkout from "./Checkout";
function Cart() {
  const { cartItems } = useSelector(cartStateSelect);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-40 flex flex-col gap-5">
        <h1 className="uppercase font-bold text-xl">Giỏ hàng trống</h1>
        <FontAwesomeIcon className="text-red-600" icon={faTrash} />
        <Link
          className="bg-primary text-sm hover:opacity-90 text-white outline outline-1 w-max mx-auto p-2 rounded hover:outline-primary"
          to="/"
        >
          <FontAwesomeIcon className="mr-2 " icon={faShoppingCart} />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }
  return (
    <div className="px-5 md:px-10 mt-10 pb-10 flex flex-col lg:flex-row  gap-10 overflow-hidden">
      <div className="cart flex-1">
        <h1 className="mb-3 font-bold uppercase text-xl">Giỏ hàng</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Hình ảnh
                </th>
                <th scope="col" className="px-3 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-3 py-3">
                  Đơn giá
                </th>
                <th scope="col" className="px-3 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-3 py-3">
                  Thành tiền
                </th>
                <th scope="col" className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product._id} className="bg-white  border-b">
                  <th className="px-3 py-4">
                    <Link to={`/product/detail/${product._id}`}>
                      <img
                        src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_70,w_70/v1649473695/${product.image}`}
                        alt={product.name}
                        className="w-auto h-20 object-contain"
                      />
                    </Link>
                  </th>
                  <td className="px-3 py-4">{product.name}</td>
                  <td className="px-3 py-4">{formatMoney(product.price)}</td>
                  <td className="px-3 py-4 flex flex-col md:table-cell justify-center items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseCartQty(product._id))}
                      className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center md:mr-5 "
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{product.qty}</span>
                    <button
                      onClick={() => dispatch(increaseCartQty(product._id))}
                      className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center md:ml-5 "
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </td>
                  <td className="px-3 py-4">{formatMoney(product.price * product.qty)}</td>
                  <td className="px-3 py-4 text-red-600">
                    <button onClick={() => dispatch(removeProductFromCart(product._id))}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Checkout />
    </div>
  );
}

export default Cart;
