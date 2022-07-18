import IconLoading from "components/IconLoading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ToastMsg from "utils/ToastMsg";
import { authStateSelect, login } from "../../store/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    login: { status },
  } = useSelector(authStateSelect);
  useEffect(() => {
    if (user) {
      ToastMsg("success", "Bạn đã đăng nhập.");
      navigate("/");
    }
  }, [navigate, user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errors, setErrors] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then((data) => {
        ToastMsg("success", "Đăng nhập thành công.");
        localStorage.setItem("token", data.token);
        navigate("/", { replace: true });
      })
      .catch((error) => setErrors(error));
  };
  return (
    !user && (
      <div className="flex justify-center items-center mt-10 px-10">
        <form onSubmit={handleSubmit} className="w-96">
          <h1 className="font-bold uppercase text-2xl text-center">Đăng nhập</h1>
          <hr className="block my-5" />
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
            {errors && <p className="text-red-500 mt-2">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
            {errors && <p className="text-red-500 mt-2">{errors.password}</p>}
          </div>
          {status === "loading" ? (
            <button
              type="submit"
              disabled
              className="cursor-wait opacity-70 items-center w-max text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center "
            >
              Đăng nhập
              <IconLoading />
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Đăng nhập
            </button>
          )}

          <p className="mt-3">
            Chưa có tài khoản?
            <Link to="/register" className="ml-2 text-primary">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    )
  );
}

export default Login;
