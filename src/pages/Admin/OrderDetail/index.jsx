import GoBack from "components/GoBack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { formatDateTime, formatMoney } from "utils/FormatData";
import ToastMsg from "utils/ToastMsg";
import IconLoading from "../../../components/IconLoading";
import {
  adminGetOrderDetail,
  adminSetOrderSuccess,
  orderStateSelect,
} from "../../../store/slices/orderSlice";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    adminGetOrderDetail: { order, status, errors },
    adminSetOrderSuccess: { status: statusOrderSuccess },
  } = useSelector(orderStateSelect);

  useEffect(() => {
    dispatch(adminGetOrderDetail(id));
  }, [id, dispatch]);

  const handleOrderSuccess = () => {
    dispatch(adminSetOrderSuccess(id))
      .unwrap()
      .then((data) => {
        ToastMsg("success", data.message);
        dispatch(adminGetOrderDetail(id));
      });
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
      <div className="text-center p-5">
        <h1 className="text-center text-xl text-red-500">{errors}</h1>
        <GoBack />
      </div>
    );
  }
  return (
    order && (
      <>
        <div className="p-5 px-5 md:px-10 overflow-scroll md:overflow-hidden">
          <div className="header mb-5 flex justify-between items-center">
            <h1 className="font-bold uppercase text-base ">Chi tiết đơn hàng</h1>
            <div className="flex gap-5 text-sm">
              {order.status === 0 && (
                <button onClick={handleOrderSuccess} className="outline outline-1 p-2">
                  {statusOrderSuccess === "loading" ? "Đang xử lý..." : "Xác nhận giao hàng"}
                </button>
              )}
              <Link className="bg-primary p-2 text-white rounded" to="/admin/orders">
                Đơn hàng
              </Link>
            </div>
          </div>
          <table className="w-full bg-white">
            <tbody>
              <tr>
                <th className="p-3 border">ID</th>
                <td className="p-3 border">{order._id}</td>
                <th className="p-3 border">Ngày mua</th>
                <td className="p-3 border">{formatDateTime(order.created_at)}</td>
                <th className="p-3 border">Trạng thái</th>
                <td className="p-3 border">{order.status === 0 ? "Đang xử lý" : "Đã giao"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-5 px-5 md:px-10">
          <div className="header mb-5 flex justify-between items-center">
            <h1 className="font-bold uppercase text-base ">Sản phẩm</h1>
          </div>

          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="p-3">
                  Hình ảnh
                </th>
                <th scope="col" className="p-3">
                  Tên sản phẩm
                </th>
                <th scope="col" className="p-3">
                  Giá
                </th>
                <th scope="col" className="p-3">
                  Số lượng
                </th>
                <th scope="col" className="p-3">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {order.order_items &&
                order.order_items.map((orderItem, index) => (
                  <tr key={index} className="border-b">
                    <th className="p-3">
                      <Link to={`/product/detail/${orderItem.product_id}`}>
                        <img
                          src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_80,w_80/v1649473695/${orderItem.image}`}
                          alt={orderItem.name}
                          className="w-auto h-20 object-contain"
                        />
                      </Link>
                    </th>
                    <td className="p-3">{orderItem.name}</td>
                    <td className="p-3">{formatMoney(orderItem.price)}</td>
                    <td className="p-3">{orderItem.qty}</td>
                    <td className="p-3">{formatMoney(orderItem.price * orderItem.qty)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h1 className="flex w-full justify-end my-5 font-bold text-xl">
            Tổng tiền: {formatMoney(order.total)}
          </h1>
        </div>
        <div className="p-5 px-5 md:px-10 clear-both">
          <div className="header mb-5 flex justify-between items-center">
            <h1 className="font-bold uppercase text-base ">Địa chỉ giao hàng</h1>
          </div>

          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <tbody>
              <tr>
                <th className="p-3 border">Họ tên</th>
                <td className="p-3 border">{order.user.name}</td>
                <th className="p-3 border">Email</th>
                <td className="p-3 border">{order.user.email}</td>
              </tr>
              <tr>
                <th className="p-3 border">SĐT</th>
                <td className="p-3 border">{order.shipping.phone}</td>
                <th className="p-3 border">Địa chỉ</th>
                <td className="p-3 border">{order.shipping.address}</td>
              </tr>
            </tbody>
          </table>
          <p className="py-5 px-3">
            <b>Ghi chú</b>: <i>{order.shipping.notes}</i>
          </p>
        </div>
      </>
    )
  );
}

export default OrderDetail;
