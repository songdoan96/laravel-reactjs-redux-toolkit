import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import thunkReject from "utils/thunkReject";
import * as productApi from "../../api/productApi";
import ToastMsg from "../../utils/ToastMsg";

const initialState = {
  getProducts: {},
  getProductDetail: {},
  reviewRatingProduct: {},
  productGetReviews: {},
  adminGetProducts: {},
  adminGetCategories: {},
  adminUpdateCategories: {},
  adminDeleteCategories: {},
  storeProduct: {},
  deleteProduct: {},
  updateProduct: {},
  getProductEdit: {},
};

// home get products
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ currentPage, sort, filter }, thunkAPI) => {
    try {
      const response = await productApi.getProducts({ currentPage, sort, filter });
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);

// get product detail
export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, thunkAPI) => {
    try {
      const response = await productApi.getProductDetail(id);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
// Product detail request rating and reviews
export const productGetReviews = createAsyncThunk(
  "product/productGetReviews",
  async (id, thunkAPI) => {
    try {
      const response = await productApi.productGetReviews(id);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
export const reviewRatingProduct = createAsyncThunk(
  "product/reviewRatingProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await productApi.reviewRatingProduct(formData);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
// Admin Dashboard get products
export const adminGetProducts = createAsyncThunk(
  "product/adminGetProducts",
  async (currentPage, thunkAPI) => {
    try {
      const response = await productApi.adminGetProducts(currentPage);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
// Admin Dashboard get categories
export const adminGetCategories = createAsyncThunk(
  "product/adminGetCategories",
  async (params, thunkAPI) => {
    try {
      const response = await productApi.adminGetCategories();
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);

export const adminUpdateCategories = createAsyncThunk(
  "product/adminUpdateCategories",
  async ({ id, name }, thunkAPI) => {
    try {
      const response = await productApi.adminUpdateCategories({ id, name });
      ToastMsg("success", response.message);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
export const adminDeleteCategories = createAsyncThunk(
  "product/adminDeleteCategories",
  async (id, thunkAPI) => {
    try {
      const response = await productApi.adminDeleteCategories(id);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
export const storeProduct = createAsyncThunk("product/storeProduct", async (formData, thunkAPI) => {
  try {
    const response = await productApi.storeProduct(formData);
    return response;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ formUpdate, id }, thunkAPI) => {
    try {
      const response = await productApi.updateProduct(formUpdate, id);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, thunkAPI) => {
  try {
    const response = await productApi.deleteProduct(id);
    return response;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});

export const getProductEdit = createAsyncThunk("product/getProductEdit", async (id, thunkAPI) => {
  try {
    const response = await productApi.getProductEdit(id);
    return response;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action) => {
          return action.type.startsWith("product/") && action.type.endsWith("/pending");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "loading";
          state[reducer].errors = undefined;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith("product/") && action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer] = action.payload;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith("product/") && action.type.endsWith("/rejected");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "failed";
          state[reducer].errors = action.payload;
        }
      );
  },
});

export const productStateSelect = (state) => state.product;

const productReducer = productSlice.reducer;
export default productReducer;
