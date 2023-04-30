import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useAppSelector } from "../hooks";

interface IProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProps): JSX.Element => {
  const { isUserLoading, isUserAuthenticate } = useAppSelector(
    (state) => state.user
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
