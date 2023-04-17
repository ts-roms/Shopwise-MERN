import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { IAppState } from "../Interface";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

interface IProps {
  children: ReactNode;
}

const SellerProtectedRoute = ({ children }: IProps) => {
  const { isSellerLoading, isSellerAuthenticate } = useSelector(
    (state: IAppState) => state.seller
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
