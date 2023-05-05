import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAllProducts } from "./redux/actions/allProductsActions";
import { loadUser } from "./redux/actions/userActions";
import { useEffect, useLayoutEffect } from "react";
import { loadSeller } from "./redux/actions/sellerActions";
import store from "./redux/store";
import loadable from "@loadable/component";

import SellerProtectedRoute from "./protected-routes/SellerProtectedRoute";
import ProtectedRoute from "./protected-routes/Protectedroute";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";

const ActivationPage = loadable(() => import("./pages/User/ActivationPage"));
const ProductsPage = loadable(() => import("./pages/ProductsPage"));
const ProductPage = loadable(() => import("./pages/ProductPage"));
const SignupPage = loadable(() => import("./pages/User/SignupPage"));
const BestSelling = loadable(() => import("./pages/BestSelling"));
const EventsPage = loadable(() => import("./pages/EventsPage"));
const FAQ = loadable(() => import("./pages/FAQPage"));
import ProfilePage from "./pages/User/ProfilePage";
const CreateShop = loadable(
  () => import("./pages/Seller/SellerAuth/CreateShopPage")
);
const SellerActivationPage = loadable(
  () => import("./pages/Seller/SellerAuth/SellerActivationPage")
);
const ShopLoginPage = loadable(
  () => import("./pages/Seller/SellerAuth/ShopLoginPage")
);
const ShopHomePage = loadable(() => import("./pages/Seller/ShopHomePage"));
const ShopDashboardPage = loadable(
  () => import("./pages/Seller/ShopDashboardPage")
);
const SellerAddProductPage = loadable(
  () => import("./pages/Seller/SellerAddProductPage")
);
const SellerProductsPage = loadable(
  () => import("./pages/Seller/SellerProductsPage")
);
const SellerCreatEventPage = loadable(
  () => import("./pages/Seller/SellerCreatEventPag")
);
const ShopCuponsPage = loadable(() => import("./pages/Seller/ShopCuponsPage"));
const NotFound = loadable(() => import("./components/404/NotFound"));
import LoginPage from "./pages/User/LoginPage";
const ShopAllEventsPage = loadable(
  () => import("./pages/Seller/ShopAllEventsPage")
);
import { useState } from "react";
import Loader from "./components/Loader/Loader";

function App() {
  const [appState, setAppState] = useState(false);

  useLayoutEffect(() => {
    Promise.all([
      store.dispatch(loadUser()),
      store.dispatch(loadSeller()),
      store.dispatch(getAllProducts()),
    ]).then(() => setAppState(!appState));
  }, []);

  if (!appState) {
    return (
      <section className="h-screen flex justify-center items-center">
        <Loader />;
      </section>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route
          path="/products/:product_id"
          element={
            <Layout>
              <ProductPage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />

        <Route
          path="/best-selling"
          element={
            <Layout>
              <BestSelling />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <EventsPage />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/create-shop" element={<CreateShop />} />
        <Route path="/login-shop" element={<ShopLoginPage />} />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-add-product"
          element={
            <SellerProtectedRoute>
              <SellerAddProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-create-event"
          element={
            <SellerProtectedRoute>
              <SellerCreatEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-products"
          element={
            <SellerProtectedRoute>
              <SellerProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-cupouns"
          element={
            <SellerProtectedRoute>
              <ShopCuponsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/:shopId"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
