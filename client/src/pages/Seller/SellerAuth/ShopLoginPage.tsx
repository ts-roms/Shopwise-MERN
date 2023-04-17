import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShopLogin from "../../../components/shop/ShopLogin";
import { IAppState } from "../../../Interface";

export default function ShopLoginPage() {
  const navigate = useNavigate();

  const { isSellerAuthenticate, isSellerLoading } = useSelector(
    (state: IAppState) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticate === true) {
      toast.info("You logged in");
      navigate(`/dashboard`);
    }
  }, [isSellerLoading, isSellerAuthenticate]);

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <ShopLogin />
    </section>
  );
}
