import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IAppState } from "../../Interface";
import Signup from "../../components/Auth/signup/Signup";

export default function SignupPage() {
  const navigate = useNavigate();

  const { isUserAuthenticate } = useSelector((state: IAppState) => state.user);

  useEffect(() => {
    if (isUserAuthenticate) {
      toast.info("You are allready logged in");
      navigate("/");
    }
  }, []);
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Signup />
    </section>
  );
}
