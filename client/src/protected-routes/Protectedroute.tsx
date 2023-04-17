import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { IAppState } from "../Interface";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { isUserLoading, isUserAuthenticate } = useSelector(
    (state: IAppState) => state.user
  );

  if (isUserLoading) {
    return <Loader />;
  }

  if (!isUserAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
