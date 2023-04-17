import { useState } from "react";
import style from "../../../styles/style";
import { HiPlus, HiMinus } from "react-icons/hi";
import { toast } from "react-toastify";
import { formattedPrice } from "../../../helper/formatPrice";
import { RxCross1 } from "react-icons/rx";

interface IProps {
  item: {
    name: string;
    description: string;
    price: number;
  };
}

export default function CartItem({ item }: IProps) {
  const [quantity, setQuantity] = useState(1);
  const { name, description, price } = item;

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity === 1) {
      setQuantity(1);
      toast.info("Can not decrease quantity anymore");
    } else {
      setQuantity(quantity - 1);
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
          src="http://source.unsplash.com/400x400?clothes"
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
