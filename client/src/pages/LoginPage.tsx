import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../components/login/Login";
import { IAppState } from "../Interface";

export default function LoginPage() {
  const navigate = useNavigate();

  const { isAuthenticate } = useSelector((state: IAppState) => state.user);

  console.log(isAuthenticate);
  useEffect(() => {
    if (isAuthenticate) {
      toast.info("You are allready logged in");
      navigate("/");
    }
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Login />
    </section>
  );
}
