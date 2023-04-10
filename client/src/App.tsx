import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ActivationPage from "./pages/ActivationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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

function App() {
  const { isLoading } = useSelector((state: IAppState) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      {isLoading ? (
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
            {/* <Route path="/products/:product_slug" element={<ProductPage />} /> */}
            <Route path="*" element={<h1>Wront route</h1>} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
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
