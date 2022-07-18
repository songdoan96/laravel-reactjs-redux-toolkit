import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconLoading from "components/IconLoading";
import { adminGetOrders, orderStateSelect } from "store/slices/orderSlice";
function Order() {
  const {
    adminGetOrders: { status, errors, orders },
  } = useSelector(orderStateSelect);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGetOrders());
  }, [dispatch]);

  if (errors) {
    return <h1 className="p-5 text-xl text-red-500">{errors}</h1>;
  }
  if (orders && orders.length === 0) {
    return <h1 className="p-5 text-xl text-red-500">Đơn hàng trống</h1>;
  }
  if (status === "loading") {
    return (
      <div className="text-center  w-full mt-40">
        <IconLoading width="50px" height="50px" />
      </div>
    );
  }

  return (
    orders && (
      <div className="p-5 px-5 md:px-10">
        <div className="">
          <h1 className="mb-3 font-bold uppercase text-base ">Đơn hàng</h1>
          <div className="bg-white px-5 py-5 min-h-screen">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
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
                  <th scope="col" className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
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
                    <td className="px-3 py-4">
                      <Link
                        className="outline outline-1 p-2 hover:outline-primary"
                        to={`/admin/order/${order._id}`}
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
      </div>
    )
  );
}

export default Order;
