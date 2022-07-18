import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderAPI from "api/orderApi";
import thunkReject from "utils/thunkReject";

const initialState = {
  sendOrder: {},

  getOrder: {},
  adminGetOrders: {},
  adminGetOrderDetail: {},
  adminSetOrderSuccess: {},
  userGetOrders: {},
  userGetOrderDetail: {},
};
// Cart send order
export const sendOrder = createAsyncThunk("order/sendOrder", async (formData, thunkAPI) => {
  try {
    const response = await orderAPI.sendOrder(formData);
    return response;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});

// User get orders
export const userGetOrders = createAsyncThunk("order/userGetOrders", async (formData, thunkAPI) => {
  try {
    const response = await orderAPI.userGetOrders();
    return response;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});

export const adminGetOrders = createAsyncThunk(
  "order/adminGetOrders",
  async (formData, thunkAPI) => {
    try {
      const response = await orderAPI.adminGetOrders();
      return { orders: response.orders };
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
export const adminGetOrderDetail = createAsyncThunk(
  "order/adminGetOrderDetail",
  async (id, thunkAPI) => {
    try {
      const response = await orderAPI.adminGetOrderDetail(id);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);
export const adminSetOrderSuccess = createAsyncThunk(
  "order/adminSetOrderSuccess",
  async (id, thunkAPI) => {
    try {
      const response = await orderAPI.adminSetOrderSuccess(id);
      return response;
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);

export const userGetOrderDetail = createAsyncThunk(
  "order/userGetOrderDetail",
  async (id, thunkAPI) => {
    try {
      const response = await orderAPI.userGetOrderDetail(id);
      return { order: response.order };
    } catch (error) {
      return thunkReject(error, thunkAPI);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith("order/") && action.type.endsWith("/pending");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "loading";
          state[reducer].errors = undefined;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith("order/") && action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer] = action.payload;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith("order/") && action.type.endsWith("/rejected");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "failed";
          state[reducer].errors = action.payload;
        }
      );
  },
});

export const orderStateSelect = (state) => state.order;

const orderReducer = orderSlice.reducer;
export default orderReducer;
