import loadable from "@loadable/component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateShop = loadable(
  () => import("../../../components/shop/CreateShop")
);
import { useAppSelector } from "../../../hooks";
import style from "../../../styles/style";

export default function CreateShopPage() {
  const navigate = useNavigate();

  const { isSellerAuthenticate, seller } = useAppSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticate) {
      toast.info("You are already logged in");
      navigate(`/shop/${seller._id}`);
    }
  }, []);

  return (
    <section>
      <div className={`${style.section}`}>
        <CreateShop />
      </div>
    </section>
  );
}
