import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface IProps {
  isUserAuthenticate: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ isUserAuthenticate, children }: IProps) => {
  if (!isUserAuthenticate) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
