import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface IProps {
  isAuthenticate: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ isAuthenticate, children }: IProps) => {
  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
