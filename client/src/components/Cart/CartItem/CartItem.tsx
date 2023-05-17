import { useState } from "react";
import style from "../../../styles/style";
import { HiPlus, HiMinus } from "react-icons/hi";
import { toast } from "react-toastify";
import { formattedPrice } from "../../../helper/formatPrice";
import { RxCross1 } from "react-icons/rx";
import { ICartItem } from "../../../Interface";
import { host } from "../../../server";
import { useAppDispatch } from "../../../hooks";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { getCartItemPrice } from "../../../helper/getCartItemPrice";

interface IProps {
  item: ICartItem;
}

export default function CartItem({ item }: IProps) {
  const { name, quantity: qty, _id } = item;
  const [quantity, setQuantity] = useState(qty || 1);
  const dispatch = useAppDispatch();

  function increaseQuantity() {
    if (quantity < 4) {
      setQuantity((prev) => prev + 1);
      const updatedCart = { ...item, quantity: quantity + 1 };
      updateCartChange(updatedCart);
    } else {
      toast.info("You cannot add more than 4 quantities.");
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const updatedCart = { ...item, quantity: quantity - 1 };
      updateCartChange(updatedCart);
    } else {
      toast.info("Quantity cannot be less than 1");
    }
  }

  function updateCartChange(data: ICartItem) {
    dispatch(addToCart(data));
  }

  function handleRemoveItem(data: ICartItem) {
    dispatch(removeFromCart(data));
  }

  return (
    <div className={`${style.flex_normal} w-full border-b p-4 justify-between`}>
      <div className={`${style.flex_normal} flex-col`}>
        <button
          className={`border-none bg-none bg-orange-500 rounded-full h-6 w-6 ${style.flex_normal} justify-center text-white cursor-pointer`}
          onClick={increaseQuantity}
        >
          <HiPlus title="Increment" />
        </button>
        <span>{quantity}</span>
        <button
          className={`border-none bg-none bg-slate-300 rounded-full h-6 w-6 ${style.flex_normal} justify-center text-white cursor-pointer`}
          onClick={decreaseQuantity}
        >
          <HiMinus title="Decrement" color="#7d879c" />
        </button>
      </div>
      <div className={`${style.flex_normal} gap-4 flex-grow p-1`}>
        <Link
          className="block font-bold text-sm capitalize hover:text-blue-500 transition-all"
          to={`/products/${_id}`}
        >
          <img
            src={`${host}/${item.images[0].url}`}
            className="w-16 rounded-md h-16 ml-2"
            loading="lazy"
          />
        </Link>
        <div>
          <Link
            className="block font-bold capitalize hover:text-blue-500 transition-all"
            to={`/products/${_id}`}
          >
            <h4>{name}</h4>
          </Link>
          <h4 className="text-xs text-gray-500">
            {formattedPrice(getCartItemPrice(item))} × {quantity}
          </h4>
          <h4 className="font-semibold">
            {formattedPrice(getCartItemPrice(item) * quantity)}
          </h4>
        </div>
      </div>
      <button onClick={() => handleRemoveItem(item)}>
        <RxCross1 className="cursor-pointer" size={20} />
      </button>
    </div>
  );
}
