import style from "../../styles/style";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

export default function UserNavigation() {
  return (
    <div className={`${style.flex_normal} gap-6`}>
      <div className="relative cursor-pointer ">
        <AiOutlineHeart
          color="white"
          size={30}
          className="hover:fill-gray-800 transition-all"
        />
        <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
          0
        </span>
      </div>
      <div className="relative cursor-pointer">
        <AiOutlineShoppingCart
          color="white"
          className="hover:fill-gray-800 transition-all"
          size={30}
        />
        <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
          0
        </span>
      </div>
      <div className="relative cursor-pointer">
        <BiUserCircle
          color="white"
          size={30}
          className="hover:fill-gray-900 transition-all"
        />
      </div>
    </div>
  );
}
