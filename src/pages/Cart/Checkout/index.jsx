import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconLoading from "components/IconLoading";
import { cartStateSelect, clearCart } from "store/slices/cartSlice";
import { orderStateSelect, sendOrder } from "store/slices/orderSlice";
import ToastMsg from "utils/ToastMsg";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(cartStateSelect);
  const {
    sendOrder: { status },
  } = useSelector(orderStateSelect);
  const [errors, setErrors] = useState();
  const [checkoutForm, setCheckoutForm] = useState({
    address: "",
    phone: "",
    notes: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };
  const handleCheckout = async (e) => {
    e.preventDefault();
    dispatch(sendOrder({ ...checkoutForm, products: JSON.stringify(cartItems) }))
      .unwrap()
      .then((data) => {
        ToastMsg("success", data.message);
        dispatch(clearCart());
        navigate("/orders");
        e.target.reset();
      })
      .catch((error) => setErrors(error));
  };
  return (
    <div className="checkout lg:w-1/4">
      <h1 className="mb-3 font-bold uppercase text-xl">Thanh toán</h1>
      <form onSubmit={handleCheckout} className="bg-white rounded-lg shadow-md px-5 py-10">
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            onChange={handleInput}
          />
          {errors && <p className="text-red-500 mt-2">{errors.address}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">
            SĐT
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            onChange={handleInput}
          />
          {errors && <p className="text-red-500 mt-2">{errors.phone}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 ">
            Ghi chú
          </label>
          <input
            type="text"
            id="notes"
            name="notes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            onChange={handleInput}
          />
          {errors && <p className="text-red-500 mt-2">{errors.notes}</p>}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center "
        >
          {status === "loading" ? (
            <>
              Thanh toán <IconLoading />
            </>
          ) : (
            "Thanh toán"
          )}
        </button>
      </form>
    </div>
  );
}

export default memo(Checkout);
