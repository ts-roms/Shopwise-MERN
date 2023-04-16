import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { SellerReducer } from "./reducers/sellerReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: SellerReducer,
  },
});

export default store;
