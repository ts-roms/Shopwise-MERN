import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { SellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
import thunkMiddleware from "redux-thunk";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: SellerReducer,
    product: productReducer,
  },
  middleware: middleware,
});

export default store;
