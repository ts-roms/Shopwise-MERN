import style from "../../../styles/style";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { formattedPrice } from "../../../helper/formatPrice";
import { useAppDispatch } from "../../../hooks";
import { IProduct } from "../../../Interface";
import { removeFromWishlists } from "../../../redux/actions/wishlistActions";
import { host } from "../../../server";

const ItemCard = ({ item }: { item: IProduct }) => {
  const dispatch = useAppDispatch();

  function removeFromWishlistHandler(product: IProduct) {
    dispatch(removeFromWishlists(product));
  }
  const { name, price, images } = item;
  return (
    <div
      className={`${style.flex_normal} w-full border-b px-6 py-4 justify-between`}
    >
      <button onClick={() => removeFromWishlistHandler(item)}>
        <RxCross1 className="cursor-pointer" size={10} />
      </button>
      <img
        src={`${host}/${images[0].url}`}
        className="w-12 rounded-md h-12"
        loading="lazy"
        alt=""
      />
      <div>
        <h4 className="text-lg font-medium">{name}</h4>
        <h4 className="text-sm text-gray-500">{formattedPrice(price)}</h4>
      </div>
      <div>
        <BsCartPlus
          size={20}
          className="cursor-pointer"
          color="#ff7d1a"
          title="Add to Cart"
        />
      </div>
    </div>
  );
};

export default ItemCard;
