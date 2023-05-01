import { useState } from "react";
import style from "../../../styles/style";
import { HiPlus, HiMinus } from "react-icons/hi";
import { toast } from "react-toastify";
import { formattedPrice } from "../../../helper/formatPrice";
import { RxCross1 } from "react-icons/rx";
import { ICartItem } from "../../../Interface";
import { host } from "../../../server";

interface IProps {
  item: ICartItem;
}

export default function CartItem({ item }: IProps) {
  const { name, price, quantity: qty } = item;
  const [quantity, setQuantity] = useState(qty || 1);

  function increaseQuantity() {
    if (quantity < 4) {
      setQuantity(quantity + 1);
      const updateCart = { ...item, quantity: quantity + 1 };
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    } else {
      setQuantity(4);
      toast.info("Can not increase quantity anymore");
    }
  }

  function decreaseQuantity() {
    if (quantity === 1) {
      setQuantity(1);
      toast.info("Can not decrease quantity anymore");
    } else {
      setQuantity(quantity - 1);
      const updateCart = { ...item, quantity: quantity - 1 };
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
    }
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
      <div className={`${style.flex_normal} gap-4`}>
        <img
          src={`${host}/${item.images[0].url}`}
          className="w-16 rounded-md h-16 ml-2"
          loading="lazy"
          alt=""
        />
        <div>
          <h4>{name}</h4>
          <h4 className="text-sm text-gray-500">
            {formattedPrice(price)} × {quantity}
          </h4>
          <h4 className="text-lg font-semibold">
            {formattedPrice(price * quantity)}
          </h4>
        </div>
      </div>
      <div>
        <RxCross1 className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
