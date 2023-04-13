import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
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
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { isLoading, error } = useSelector((state: IAppState) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // the loadUser() action in the useEffect hook, but it is being executed asynchronously,
  // which means that the component will render without waiting for the isLoading flag
  // to be set to false after the user information is loaded.

  useEffect(() => {
    store.dispatch(loadUser()).then(() => setIsUserLoaded(true));
  }, []);

  if (error) {
    console.log(error);
    // return <h1>Error {error}</h1>;
  }

  if (!isLoading && !isUserLoaded) {
    return <h1>Error: Server not responding</h1>;
  }

  return (
    <>
      {isLoading || !isUserLoaded ? (
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
              path="/products/:product_slug"
              element={
                <Layout>
                  <ProductPage />
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
                <Layout>
                  <ProfilePage />
                </Layout>
              }
            />
            <Route path="*" element={<h1>Wrong route</h1>} />
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
