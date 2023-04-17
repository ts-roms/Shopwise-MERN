import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { IAppState } from "./Interface";
import Loader from "./components/Loader/Loader";
import ProfilePage from "./pages/User/ProfilePage";
import ProtectedRoute from "./redux/Protectedroute";
import CreateShop from "./pages/Seller/SellerAuth/CreateShopPage";
import SellerActivationPage from "./pages/Seller/SellerAuth/SellerActivationPage";
import ShopLoginPage from "./pages/Seller/SellerAuth/ShopLoginPage";
import { loadSeller } from "./redux/actions/sellerActions";
import ShopHomePage from "./pages/Seller/ShopHomePage";
import SellerProtectedRoute from "./redux/SellerProtectedRoute";

function App() {
  const { isUserLoading, isUserAuthenticate, userError } = useSelector(
    (state: IAppState) => state.user
  );
  const { seller, isSellerLoading, isSellerAuthenticate } = useSelector(
    (state: IAppState) => state.seller
  );

  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isSellerLoaded, setIsSellerLoaded] = useState(false);

  // the loadUser() action in the useEffect hook, but it is being executed asynchronously,
  // which means that the component will render without waiting for the isLoading flag
  // to be set to false after the user information is loaded.

  useEffect(() => {
    store.dispatch(loadUser()).then(() => setIsUserLoaded(true));
    store.dispatch(loadSeller()).then(() => setIsSellerLoaded(true));
    if (userError) {
      console.log(userError);
      window.location.assign("/login");
    }
  }, []);

  if (!isUserLoading && !isUserLoaded) {
    return <h1>Error: Server not responding</h1>;
  }

  return (
    <>
      {isUserLoading || !isUserLoaded || isSellerLoading || !isSellerLoaded ? (
        <Loader />
      ) : (
        <BrowserRouter basename="/">
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
                <ProtectedRoute isUserAuthenticate={isUserAuthenticate}>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/create-shop" element={<CreateShop />} />
            <Route path="/login-shop" element={<ShopLoginPage />} />
            <Route
              path="/shop/:shopId"
              element={
                <SellerProtectedRoute
                  isSellerAuthenticate={isSellerAuthenticate}
                  seller={seller}
                >
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
      )}
    </>
  );
}

export default App;
