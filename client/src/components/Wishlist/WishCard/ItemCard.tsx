import style from "../../../styles/style";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { formattedPrice } from "../../../helper/formatPrice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useState, useEffect } from "react";
import { ICartItem, IProduct } from "../../../Interface";
import { removeFromWishlists } from "../../../redux/actions/wishlistActions";
import { host } from "../../../server";
import { addToCart } from "../../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { toggleCart } from "../../../redux/actions/cartActions";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

interface IProps {
  item: IProduct;
  toggleWishlist: () => void;
}

const ItemCard = ({ item, toggleWishlist }: IProps) => {
  const { name, price, images, discount_price, discount_percentage, _id } =
    item;
  const [isInCart, setIsInCart] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function removeFromWishlistHandler(product: IProduct) {
    dispatch(removeFromWishlists(product));
  }

  function addToCartHandler(product: ICartItem) {
    dispatch(addToCart(product));
    toast.success("Item added successfully");
  }

  function handleToggleCart() {
    toggleWishlist();
    dispatch(toggleCart());
  }

  useEffect(() => {
    if (cart?.find((i: IProduct) => i._id === item._id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cart]);

  return (
    <div
      className={`${style.flex_normal} w-full border-b p-4 justify-between gap-4`}
    >
      <button onClick={() => removeFromWishlistHandler(item)}>
        <RxCross1 className="cursor-pointer" size={10} />
      </button>
      <Link to={`/products/${_id}`}>
        <img
          src={`${host}/${images[0].url}`}
          className="w-12 rounded-md h-12"
          loading="lazy"
          alt={images[0].name}
        />
      </Link>
      <div className="flex-grow">
        <Link to={`/products/${_id}`}>
          <h4 className="text-lg font-medium text-[#333333] hover:text-blue-400 transition-all">
            {name}
          </h4>
        </Link>
        <h4 className="text-xs text-[#777777,] line-through">
          {formattedPrice(price)}
        </h4>
        <div className="flex gap-3 items-center">
          <p className="text-[#2D3436] font-thin">{discount_percentage}% off</p>
          <h4 className="text-[#00B894] font-bold">
            {formattedPrice(discount_price)}
          </h4>
        </div>
      </div>
      {!isInCart ? (
        <button onClick={() => addToCartHandler({ ...item, quantity: 1 })}>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            color="#ff7d1a"
            title="Add to Cart"
          />
        </button>
      ) : (
        <button
          onClick={handleToggleCart}
          className="text-xs bg-[#ff7d1a] text-white px-2 py-2 rounded"
        >
          Cart
        </button>
      )}
    </div>
  );
};

export default ItemCard;
