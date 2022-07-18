import baseAxios from "../utils/baseAxios";
import verifyToken from "../utils/verifyToken";

export const sendOrder = async (formData) => {
  const response = await baseAxios.post("/order", formData, verifyToken());
  return response.data;
};
export const adminGetOrders = async () => {
  const response = await baseAxios.get("/admin-orders", verifyToken());
  return response.data;
};
export const adminGetOrderDetail = async (id) => {
  const response = await baseAxios.get(`/admin-order-detail/${id}`, verifyToken());
  return response.data;
};
export const adminSetOrderSuccess = async (id) => {
  const response = await baseAxios.post(`/admin-order-success`, { id }, verifyToken());
  return response.data;
};

export const userGetOrders = async () => {
  const response = await baseAxios.get("/orders", verifyToken());
  return response.data;
};

export const userGetOrderDetail = async (id) => {
  const response = await baseAxios.get(`/order-detail/${id}`, verifyToken());
  return response.data;
};
