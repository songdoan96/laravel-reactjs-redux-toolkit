import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};
// const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
//   history: createBrowserHistory(),
// });
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  // router: routerReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gdM) =>
    gdM({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

/*import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartState"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const rootReducer = combineReducers({
  authState: persistReducer(authPersistConfig, authReducer),
  productState: productReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  router: routerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gdM) =>
    gdM({
      serializableCheck: false,
    }).concat(routerMiddleware),
});
export const persistor = persistStore(store);
export const history = createReduxHistory(store);
*/
