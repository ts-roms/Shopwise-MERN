import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { SellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
import { eventReducer } from "./reducers/eventReducer";
import { allProductsReducer } from "./reducers/allProductsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishListReducer } from "./reducers/wishlist";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: SellerReducer,
    products: productReducer,
    events: eventReducer,
    allProducts: allProductsReducer,
    cart: cartReducer,
    wishlists: wishListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
