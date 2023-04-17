import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { ISeller } from "../Interface";

interface IProps {
  isSellerAuthenticate: boolean;
  seller: ISeller;
  children: ReactNode;
}

const SellerProtectedRoute = ({
  isSellerAuthenticate,
  seller,
  children,
}: IProps) => {
  if (!isSellerAuthenticate) {
    return <Navigate to="/login-shop" replace />;
  }
  return children;
};

export default SellerProtectedRoute;
