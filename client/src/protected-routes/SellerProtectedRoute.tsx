import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useAppSelector } from "../hooks";

interface IProps {
  children: JSX.Element;
}

const SellerProtectedRoute = ({ children }: IProps): JSX.Element => {
  const { isSellerLoading, isSellerAuthenticate } = useAppSelector(
    (state) => state.seller
  );

  if (isSellerLoading) {
    return <Loader />;
  }

  if (!isSellerAuthenticate) {
    return <Navigate to="/login-shop" replace />;
  }

  return children;
};
export default SellerProtectedRoute;
