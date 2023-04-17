import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { IAppState } from "../Interface";
import { useSelector } from "react-redux";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { isUserLoading, isUserAuthenticate, userError } = useSelector(
    (state: IAppState) => state.user
  );

  if (isUserLoading === false) {
    if (!isUserAuthenticate) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
