import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconLoading from "components/IconLoading";
import { register, authStateSelect } from "store/slices/authSlice";
import ToastMsg from "utils/ToastMsg";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    register: { status },
  } = useSelector(authStateSelect);
  useEffect(() => {
    if (user) {
      ToastMsg("success", "Bạn đã đăng nhập.");
      navigate("/");
    }
  }, [navigate, user]);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };
  const [errors, setErrors] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(registerForm))
      .unwrap()
      .then((data) => {
        ToastMsg("success", "Đăng ký thành công.");
        navigate("/login");
      })
      .catch((error) => setErrors(error));
  };
  return (
    !user && (
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleSubmit} className="w-96">
          <h1 className="font-bold uppercase text-2xl text-center">Đăng ký</h1>
          <hr className="block my-5" />{" "}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
              Họ tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInput}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
            {errors && <p className="text-red-500 mt-2">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
            {errors && <p className="text-red-500 mt-2">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              onChange={handleInput}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
            {errors && <p className="text-red-500 mt-2">{errors.password_confirmation}</p>}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {status === "loading" ? (
              <>
                Đăng ký <IconLoading />
              </>
            ) : (
              "Đăng ký"
            )}
          </button>
          <p className="mt-3">
            Đã có tài khoản?
            <Link to="/login" className="ml-2 text-primary">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    )
  );
}

export default Register;
