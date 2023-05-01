import { useState } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ICartItem, IProduct } from "../../../Interface";
import style from "../../../styles/style";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cartActions";

export default function AddtoCart({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const maxQuantity = 4;
  const minQuantity = 1;

  function increment() {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity(maxQuantity);
    }
  }

  function decrement() {
    if (quantity > minQuantity) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(minQuantity);
    }
  }

  function handleAddToCart(id: string) {
    const isItemExist = cart?.find((i: ICartItem) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart");
    } else {
      const cartData = { ...product, quantity };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart");
    }
  }

  return (
    <div className="flex flex-col justify-center lg:space-y-4">
      <div
        className={`${style.flex_normal} justify-between w-36 bg-[#f7f8fd] py-6 rounded-lg h-6`}
      >
        <button
          className="p-2 text-orange-500 bg-white"
          disabled={quantity <= minQuantity}
          onClick={decrement}
        >
          <TiMinus />
        </button>
        <p className="font-semibold">{quantity}</p>
        <button
          className="p-2 text-orange-500 bg-white"
          disabled={quantity >= maxQuantity}
          onClick={increment}
        >
          <TiPlus />
        </button>
      </div>
      <button
        className={`${style.cart_button}`}
        onClick={() => handleAddToCart(product._id)}
      >
        <AiOutlineShoppingCart title="Add to Cart" />
        <span className="ml-2">Add to cart</span>
      </button>
    </div>
  );
}
