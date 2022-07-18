import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "api/authApi";
import thunkReject from "utils/thunkReject";

const initialState = {
  user: undefined,
  login: {},
  register: {},
  logout: {},
};

// User login
export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const response = await authAPI.authLogin(formData);
    return response.user;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});
// User register
export const register = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    await authAPI.authRegister(formData);
    return null;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});
// user logout

export const logout = createAsyncThunk("auth/logout", async (params, thunkAPI) => {
  try {
    const response = await authAPI.authLogout();
    return response;
  } catch (error) {
    return thunkReject(error, thunkAPI);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith("auth/") && action.type.endsWith("/pending");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "loading";
          state[reducer].errors = undefined;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith("auth/") && action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "idle";
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith("auth/") && action.type.endsWith("/rejected");
        },
        (state, action) => {
          const reducer = action.type.split("/")[1];
          state[reducer].status = "failed";
          state[reducer].errors = action.payload;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { resetUser } = authSlice.actions;

export default authSlice.reducer;
export const authStateSelect = (state) => state.auth;
