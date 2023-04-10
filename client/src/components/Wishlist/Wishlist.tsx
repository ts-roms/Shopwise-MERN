import { RxCross1 } from "react-icons/rx";
import { BiShoppingBag } from "react-icons/bi";
import { BsCartPlus, BsBagHeart } from "react-icons/bs";
import style from "../../styles/style";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../helper/formatPrice";

interface IProps {
  toggleWishlist: () => void;
  isWishlistOpen: boolean;
}

export default function Wishlist({ isWishlistOpen, toggleWishlist }: IProps) {
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
        isWishlistOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-1/4 min-h-screen bg-white fixed top-0 right-0 shadow px-8 pt-10 pb-7 flex flex-col">
        <div className="flex justify-end">
          <RxCross1
            title="Close"
            size={30}
            className="cursor-pointer"
            onClick={toggleWishlist}
          />
        </div>
        <div className={`${style.flex_normal} gap-2 py-8 border-b`}>
          <BsBagHeart size={30} title="Cart" />
          <h4 className="text-xl font-bold">3 items</h4>
        </div>
        <div
          className="overflow-scroll h-[70vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          {cartData.length === 0 ? (
            <div>No item in wishlist</div>
          ) : (
            cartData?.map((item, idx) => <ItemCard key={idx} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

const ItemCard = ({
  item,
}: {
  item: { name: string; price: number; description: string };
}) => {
  const { name, price } = item;
  return (
    <div
      className={`${style.flex_normal} w-full border-b px-6 py-4 justify-between`}
    >
      <div>
        <RxCross1 className="cursor-pointer" size={10} />
      </div>
      <img
        src="http://source.unsplash.com/400x400?clothes"
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
