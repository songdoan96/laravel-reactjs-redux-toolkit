import baseAxios from "utils/baseAxios";
import verifyToken from "utils/verifyToken";

export const authLogin = async (formData) => {
  const response = await baseAxios.post("/auth/login", formData);
  return response.data;
};
export const authRegister = async (formData) => {
  const response = await baseAxios.post("/auth/register", formData);
  return response.data;
};
export const authLogout = async () => {
  const response = await baseAxios.post("/auth/logout", {}, verifyToken());
  return response.data;
};
