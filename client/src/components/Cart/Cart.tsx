import loadable from "@loadable/component";
import { RxCross1 } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import style from "../../styles/style";
const CartItem = loadable(() => import("./CartItem/CartItem"));
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ICartItem } from "../../Interface";
import { formattedPrice } from "../../helper/formatPrice";
import { toggleCart } from "../../redux/actions/cartActions";

export default function Cart() {
  const { cart, cartPrice, isCartOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full h-screen z-50 duration-500 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-1/4 min-h-screen bg-white fixed top-0 right-0 shadow px-8 pt-10 pb-7 flex flex-col">
        <div className="flex justify-end">
          <RxCross1
            title="Close"
            size={30}
            className="cursor-pointer"
            onClick={() => dispatch(toggleCart())}
          />
        </div>
        <div className={`${style.flex_normal} gap-2 py-8 border-b`}>
          <BiShoppingBag size={30} title="Cart" />
          <h4 className="text-xl font-bold">
            {cart.length} {cart.length > 1 ? "Items" : "Item"}
          </h4>
        </div>
        <div
          className="overflow-scroll h-[65vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          {cart.length === 0 ? (
            <div>No item in cart</div>
          ) : (
            cart?.map((item: ICartItem) => (
              <CartItem key={item._id} item={item} />
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="mt-6 w-full self-end">
            <Link to="/checkout">
              <button className="rounded-lg px-10 bg-[#ff7d1a] text-white text-center w-full h-10">
                Checkout for {formattedPrice(cartPrice)}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
