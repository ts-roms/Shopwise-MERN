import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { SellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: SellerReducer,
    products: productReducer,
  },
});

export default store;
