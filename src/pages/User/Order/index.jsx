import IconLoading from "components/IconLoading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderStateSelect, userGetOrders } from "store/slices/orderSlice";

function UserOrder() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userGetOrders());
  }, [dispatch]);
  const {
    userGetOrders: { status, errors, orders },
  } = useSelector(orderStateSelect);

  if (errors) {
    return <div className="p-5 text-xl">Có lỗi khi tải đơn hàng</div>;
  }
  if (status === "loading") {
    return (
      <div className="text-center  w-full mt-40">
        <IconLoading width="50px" height="50px" />
      </div>
    );
  }
  if (orders && orders.length === 0) {
    return <div className="p-5 text-xl">Đơn hàng trống</div>;
  }
  return (
    orders && (
      <div className="p-5">
        <h1 className="mb-3 font-bold uppercase text-base ">Đơn hàng</h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Họ tên
                </th>
                <th scope="col" className="px-3 py-3">
                  Địa chỉ
                </th>
                <th scope="col" className="px-3 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-3 py-3">
                  Tình trạng
                </th>
                <th scope="col" className="px-3 py-3">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {orders.map((order) => (
                <tr key={order._id} className="bg-white  border-b">
                  <td className="px-3 py-4">{order.user.name}</td>
                  <td className="px-3 py-4">{order.shipping.address}</td>
                  <td className="px-3 py-4">{order.shipping.phone}</td>
                  <td className="px-3 py-4">
                    {order.status === 0 ? (
                      <p className="text-red-500">Đang giao</p>
                    ) : (
                      <p className="text-green-500">Đã giao</p>
                    )}
                  </td>
                  <td className="px-3 py-4 ">
                    <Link
                      className="outline outline-1 p-2 px-4 transition hover:bg-primary hover:text-white"
                      to={`/order/${order._id}`}
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))} */}
              {orders.map((order) => (
                <tr key={order._id} className="bg-white border-b hover:bg-gray-50 ">
                  <td className="py-2 px-3 ">{order.user.name}</td>
                  <td className="py-2 px-3">{order.shipping.address}</td>
                  <td className="py-2 px-3">{order.shipping.phone}</td>
                  <td className="py-2 px-3">
                    {order.status === 0 ? (
                      <p className="text-red-500">Đang giao</p>
                    ) : (
                      <p className="text-green-500">Đã giao</p>
                    )}
                  </td>
                  <td className="py-2 px-3 ">
                    <Link
                      className="outline outline-1 p-2  inline-block w-max transition hover:bg-primary hover:text-white"
                      to={`/order/${order._id}`}
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default UserOrder;
