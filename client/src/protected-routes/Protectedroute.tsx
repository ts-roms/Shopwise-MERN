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
    return (
      <section className="min-h-screen flex flex-col justify-center items-center">
        <Loader />;
      </section>
    );
  }

  if (!isUserAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
