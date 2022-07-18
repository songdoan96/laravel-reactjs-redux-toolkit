import baseAxios from "../utils/baseAxios";
import verifyToken from "../utils/verifyToken";

export const getProducts = async ({ currentPage, sort, filter }) => {
  const response = await baseAxios.get(
    `/product?page=${currentPage}&sort=${sort}&filter=${filter}`
  );
  return response.data;
};
export const adminGetProducts = async (currentPage = 1) => {
  const response = await baseAxios.get(`/admin-products?page=${currentPage}`, verifyToken());
  return response.data;
};
export const adminGetCategories = async () => {
  const response = await baseAxios.get(`/category`, verifyToken());
  return response.data;
};
export const adminUpdateCategories = async ({ id, name }) => {
  const response = await baseAxios.put(`/category/${id}`, { name }, verifyToken());
  return response.data;
};
export const adminDeleteCategories = async (id) => {
  const response = await baseAxios.delete(`/category/${id}`, verifyToken());
  return response.data;
};

export const storeProduct = async (formData) => {
  const response = await baseAxios.post("/product", formData, verifyToken());
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await baseAxios.delete(`/product/${id}`, verifyToken());
  return response.data;
};

export const updateProduct = async (formData, id) => {
  const response = await baseAxios.post(`/product/${id}`, formData, verifyToken());
  return response.data;
};
export const getProductDetail = async (id) => {
  const response = await baseAxios.get(`/product/${id}`);
  return response.data;
};
export const getProductEdit = async (id) => {
  const response = await baseAxios.get(`/product/${id}/edit`, verifyToken());
  return response.data;
};

export const productGetReviews = async (id) => {
  const response = await baseAxios.get(`/product-reviews/${id}`);
  return response.data;
};
export const reviewRatingProduct = async (formData) => {
  const response = await baseAxios.post(`/rating-reviews`, formData, verifyToken());
  return response.data;
};
