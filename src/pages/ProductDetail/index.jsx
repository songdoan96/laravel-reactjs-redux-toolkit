import IconLoading from "components/IconLoading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { incrementByAmount } from "store/slices/cartSlice";
import { getProductDetail, productStateSelect } from "store/slices/productSlice";
import { formatMoney } from "utils/FormatData";
import ToastMsg from "utils/ToastMsg";
import Review from "./Review";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    getProductDetail: { product, status },
  } = useSelector(productStateSelect);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const [qty, setQty] = useState(1);
  const handleAddToCart = (product) => {
    dispatch(incrementByAmount({ product, qty: Number(qty) }));
    ToastMsg("success", "Thêm thành công.");
  };

  if (status === "loading") {
    return (
      <div className="text-center w-full mt-40">
        <IconLoading width="50px" height="50px" />
      </div>
    );
  }
  return (
    product && (
      <div className="p-5 px-5 md:px-10">
        <div className="bg-white mt-6 ">
          <div className="flex flex-col md:flex-row gap-10 p-5 pt-10">
            <div className="md:w-1/3">
              <img
                src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_300/v1649473695/${product.image}`}
                alt={product.name}
                className="max-w-full h-auto mx-auto mt-10"
              />
            </div>
            <div className="md:w-2/3 md:px-10">
              <p className="mb-2 text-2xl font-bold">{product.name}</p>
              <p className="mb-10 text-xl font-semibold">{formatMoney(product.price)}</p>
              <div className="mb-10 flex gap-4">
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-20 py-2 px-4 border-2 border-primary rounded"
                />
                <button
                  className="py-2 px-4 bg-primary text-white hover:opacity-90 text-sm "
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div className="flex gap-4 items-center mb-2 ">
                <span className="font-semibold ">Danh mục: </span>
                <p className=" text-justify leading-6">
                  {product?.category?.name ?? "Không xác định"}
                </p>
              </div>
              <p className="mb-2 font-semibold">Chi tiết sản phẩm: </p>
              <p className="text-sm text-justify leading-6">{product.description}</p>
            </div>
          </div>
        </div>
        <Review _id={product._id} />
      </div>
    )
  );
}

export default ProductDetail;
