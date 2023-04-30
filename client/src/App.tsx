import { BrowserRouter, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { useEffect } from "react";
import ActivationPage from "./pages/User/ActivationPage";
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
import SellerCreatEventPag from "./pages/Seller/SellerCreatEventPag";
import ShopCuponsPage from "./pages/Seller/ShopCuponsPage";
import NotFound from "./components/404/NotFound";
import { getAllProducts } from "./redux/actions/allProductsActions";

const LoginPage = loadable(() => import("./pages/User/LoginPage"));
const ShopAllEventsPage = loadable(
  () => import("./pages/Seller/ShopAllEventsPage")
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
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
              <SellerCreatEventPag />
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
