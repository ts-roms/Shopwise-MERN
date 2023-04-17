import { RxCross1 } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import style from "../../styles/style";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

interface IProps {
  toggleCart: () => void;
  isCartOpen: boolean;
}

export default function Cart({ toggleCart, isCartOpen }: IProps) {
  const cartData = [
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
    {
      name: "dsfsfsfsd",
      description: "fsfafsf",
      price: 2332,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full h-screen z-10 duration-500 ease-in-out ${
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
            onClick={toggleCart}
          />
        </div>
        <div className={`${style.flex_normal} gap-2 py-8 border-b`}>
          <BiShoppingBag size={30} title="Cart" />
          <h4 className="text-xl font-bold">3 items</h4>
        </div>
        <div
          className="overflow-scroll h-[65vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          {cartData.length === 0 ? (
            <div>No item in cart</div>
          ) : (
            cartData?.map((item, idx) => <CartItem key={idx} item={item} />)
          )}
        </div>
        <div className="mt-6 w-full self-end">
          <Link to="/checkout">
            <button className="rounded-lg px-10 bg-[#ff7d1a] text-white text-center w-full h-10">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
