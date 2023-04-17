import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateShop from "../../../components/shop/CreateShop";
import { IAppState } from "../../../Interface";
import style from "../../../styles/style";

export default function CreateShopPage() {
  const navigate = useNavigate();

  const { isSellerAuthenticate, seller } = useSelector(
    (state: IAppState) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticate) {
      toast.info("You are allready logged in");
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
