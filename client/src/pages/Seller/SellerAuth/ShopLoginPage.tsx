import loadable from "@loadable/component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ShopLogin = loadable(() => import("../../../components/shop/ShopLogin"));
import { useAppSelector } from "../../../hooks";

export default function ShopLoginPage() {
  const navigate = useNavigate();

  const { isSellerAuthenticate, isSellerLoading } = useAppSelector(
    (state) => state.seller
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
