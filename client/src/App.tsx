import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ActivationPage from "./pages/User/ActivationPage";
import LoginPage from "./pages/User/LoginPage";
import SignupPage from "./pages/User/SignupPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import Layout from "./components/Layout/Layout";
import BestSelling from "./pages/BestSelling";
import EventsPage from "./pages/EventsPage";
import FAQ from "./pages/FAQPage";
import ProfilePage from "./pages/User/ProfilePage";
import ProtectedRoute from "./protected-routes/Protectedroute";
import CreateShop from "./pages/Seller/SellerAuth/CreateShopPage";
import SellerActivationPage from "./pages/Seller/SellerAuth/SellerActivationPage";
import ShopLoginPage from "./pages/Seller/SellerAuth/ShopLoginPage";
import { loadSeller } from "./redux/actions/sellerActions";
import ShopHomePage from "./pages/Seller/ShopHomePage";
import SellerProtectedRoute from "./protected-routes/SellerProtectedRoute";
import ShopDashboardPage from "./pages/Seller/ShopDashboardPage";
import SellerAddProductPage from "./pages/Seller/SellerAddProductPage";
import SellerProductsPage from "./pages/Seller/SellerProductsPage";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);

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
          path="/products/:product_slug"
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
            // @ts-ignore
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
            // @ts-ignore
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-add-product"
          element={
            // @ts-ignore
            <SellerProtectedRoute>
              <SellerAddProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-products"
          element={
            // @ts-ignore
            <SellerProtectedRoute>
              <SellerProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/:shopId"
          element={
            // @ts-ignore
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route path="*" element={<h1>wrong route</h1>} />
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
