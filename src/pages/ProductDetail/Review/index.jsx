import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconLoading from "components/IconLoading";
import { authStateSelect } from "store/slices/authSlice";
import {
  productStateSelect,
  reviewRatingProduct,
  productGetReviews,
} from "store/slices/productSlice";
import ToastMsg from "utils/ToastMsg";
import { formatDateTime } from "utils/FormatData";
function Review({ _id }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const { user } = useSelector(authStateSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productGetReviews(_id));
  }, [_id, dispatch]);

  const {
    reviewRatingProduct: { status },
    productGetReviews: { reviews, product, avgStarProduct, status: getStatus },
  } = useSelector(productStateSelect);
  const [errors, setErrors] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewsData = { user_id: user._id, product_id: product._id, rating, review };
    dispatch(reviewRatingProduct(reviewsData))
      .unwrap()
      .then((data) => {
        ToastMsg("success", data.message);
        e.target.reset();
        setReview("");
        setErrors(null);
        dispatch(productGetReviews(_id));
      })
      .catch((error) => setErrors(error));
  };
  const subRatingCountPercent = (star) => {
    const totalRating = reviews?.length;
    const numSub = reviews?.filter((r) => r.rating === star);
    const percent = Math.round((numSub?.length / totalRating) * 100) || 0;
    return percent;
  };

  if (getStatus === "loading") {
    return (
      <div className="mt-28 text-center flex justify-center items-center">
        Đánh giá <IconLoading />
      </div>
    );
  }

  return (
    reviews && (
      <div className="bg-white mt-6 p-10 ">
        <h1 className="font-bold text-xl">Đánh giá</h1>
        <div className="flex gap-10 mt-10 flex-col md:flex-row">
          <div className="flex flex-col  md:w-1/3 text-center ">
            <h1 className="text-6xl font-extrabold">{avgStarProduct}</h1>
            <p className="py-6 font-semibold">Tổng {reviews.length} đánh giá</p>
            <div className="w-3/4 mx-auto">
              <div className="flex mb-2 items-center">
                <span className="text-sm w-20 font-medium text-primary">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div className="flex-1 h-3 mx-4 bg-gray-200 rounded ">
                  <div
                    className="flex-1 h-3 bg-yellow-400 rounded"
                    style={{ width: subRatingCountPercent(5) + "%" }}
                  ></div>
                </div>
                <span className="text-sm w-8 font-medium text-primary">
                  {subRatingCountPercent(5)}%
                </span>
              </div>
              <div className="flex mb-2 items-center">
                <span className="text-sm  w-20  font-medium text-primary">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div className="flex-1 h-3 mx-4 bg-gray-200 rounded ">
                  <div
                    className="flex-1 h-3 bg-yellow-400 rounded"
                    style={{ width: subRatingCountPercent(4) + "%" }}
                  ></div>
                </div>
                <span className="text-sm w-8 font-medium text-primary">
                  {subRatingCountPercent(4)}%
                </span>
              </div>
              <div className="flex mb-2 items-center">
                <span className="text-sm w-20 font-medium text-primary">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div className="flex-1 h-3 mx-4 bg-gray-200 rounded ">
                  <div
                    className="flex-1 h-3 bg-yellow-400 rounded"
                    style={{ width: subRatingCountPercent(3) + "%" }}
                  ></div>
                </div>
                <span className="text-sm  w-8 font-medium text-primary">
                  {subRatingCountPercent(3)}%
                </span>
              </div>
              <div className="flex mb-2 items-center">
                <span className="text-sm  w-20  font-medium text-primary">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div className="flex-1 h-3 mx-4 bg-gray-200 rounded ">
                  <div
                    className="flex-1 h-3 bg-yellow-400 rounded"
                    style={{ width: subRatingCountPercent(2) + "%" }}
                  ></div>
                </div>
                <span className="text-sm w-8 font-medium text-primary">
                  {subRatingCountPercent(2)}%
                </span>
              </div>
              <div className="flex mb-2 items-center">
                <span className="text-sm  w-20  font-medium text-primary">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <div className="flex-1 h-3 mx-4 bg-gray-200 rounded ">
                  <div
                    className="flex-1 h-3 bg-yellow-400 rounded"
                    style={{ width: subRatingCountPercent(1) + "%" }}
                  ></div>
                </div>
                <span className="text-sm w-8 font-medium text-primary">
                  {subRatingCountPercent(1)}%
                </span>
              </div>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit} className="border p-5 rounded">
                {user ? (
                  <>
                    <h1>Đánh giá sản phẩm này</h1>
                    <ul className="flex w-full justify-center my-5 gap-4 transition">
                      {[...Array(5)].map((star, index) =>
                        index + 1 <= rating ? (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            onClick={() => setRating(index + 1)}
                            className="cursor-pointer w-4 h-4 text-yellow-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            onClick={() => setRating(index + 1)}
                            className="cursor-pointer w-4 h-4 text-gray-500"
                          />
                        )
                      )}
                    </ul>
                    <textarea
                      name="review"
                      placeholder="Nhập đánh giá..."
                      className="border p-5 w-full"
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    {errors && (
                      <ul className="text-left">
                        {Object.values(errors).map((err, index) => (
                          <li key={index} className="text-red-500">
                            * {err}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      type="submit"
                      className="inline-block mt-4 px-6 py-2 bg-primary hover:opacity-90 transition text-white rounded"
                    >
                      {status === "loading" ? (
                        <>
                          Đánh giá <IconLoading />
                        </>
                      ) : (
                        "Đánh giá"
                      )}
                    </button>
                  </>
                ) : (
                  <h1 className="my-5 bg-red-200 p-2">Đăng nhập để đánh giá sản phẩm.</h1>
                )}
              </form>
            </div>
          </div>
          <div className="flex flex-col md:w-2/3 ">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="shadow px-5 py-2 mb-5 hover:shadow-lg">
                  <div className="flex items-center justify-between space-x-4">
                    <p className="font-bold text-base">{review.user.name}</p>
                    <p>{formatDateTime(review.created_at)}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="stars" style={{ "--rating": `${review.rating}` }}></div>
                  </div>
                  <p className="font-light text-gray-500 text-sm text-justify">{review.review}</p>
                </div>
              ))
            ) : (
              <h1 className="font-bold text-lg">Sản phẩm chưa có đánh giá.</h1>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Review;
