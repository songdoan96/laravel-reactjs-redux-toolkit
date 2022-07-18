import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => product._id !== action.payload);
    },
    increaseCartQty: (state, action) => {
      state.cartItems = state.cartItems.map((product) =>
        product._id === action.payload ? { ...product, qty: product.qty + 1 } : product
      );
    },
    incrementByAmount: (state, action) => {
      state.cartItems = state.cartItems.some(
        (product) => product._id === action.payload.product._id
      )
        ? (state.cartItems = state.cartItems.map((product) =>
            product._id === action.payload.product._id
              ? { ...product, qty: product.qty + action.payload.qty }
              : product
          ))
        : [...state.cartItems, { ...action.payload.product, qty: action.payload.qty }];
    },
    decreaseCartQty: (state, action) => {
      state.cartItems = state.cartItems.map((product) =>
        product._id === action.payload ? { ...product, qty: Math.max(product.qty - 1, 1) } : product
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  clearCart,
  addProductToCart,
  removeProductFromCart,
  increaseCartQty,
  decreaseCartQty,
  incrementByAmount,
} = cartSlice.actions;

export const cartStateSelect = (state) => state.cart;

const cartReducer = cartSlice.reducer;
export default cartReducer;
