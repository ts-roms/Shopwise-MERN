import style from "../../../../styles/style";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { host } from "../../../../server";
import { IUserState } from "../../../../Interface";
import { useAppSelector } from "../../../../hooks";

interface IProps {
  userState: IUserState;
  toggleCart: () => void;
  toggleWishlist: () => void;
}

export default function UserNavigation({
  userState,
  toggleCart,
  toggleWishlist,
}: IProps) {
  const { user, isUserAuthenticate } = userState;
  const { cart } = useAppSelector((state) => state.cart);
  const { wishlists } = useAppSelector((state) => state.wishlists);

  return (
    <div className={`${style.flex_normal} gap-6`}>
      <div className="relative cursor-pointer ">
        <AiOutlineHeart color="white" size={30} onClick={toggleWishlist} />
        <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
          {wishlists.length}
        </span>
      </div>
      <div className="relative cursor-pointer">
        <AiOutlineShoppingCart color="white" size={30} onClick={toggleCart} />
        <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
          {cart?.length}
        </span>
      </div>
      <div className="relative cursor-pointer">
        {isUserAuthenticate ? (
          <Link to="/profile">
            <img
              className="h-7 w-7 rounded-full"
              src={`${host}/${user?.avatar}`}
              alt={user?.name}
            />
          </Link>
        ) : (
          <Link to="/login">
            <BiUserCircle
              color="white"
              size={30}
              title="Login to account"
              className="hover:fill-gray-900 transition-all"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
