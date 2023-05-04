import style from "../../styles/style";
import loadable from "@loadable/component";
import { RxCross1 } from "react-icons/rx";
import { BsBagHeart } from "react-icons/bs";
import { useAppSelector } from "../../hooks";
const ItemCard = loadable(() => import("./WishCard/ItemCard"));

interface IProps {
  toggleWishlist: () => void;
  isWishlistOpen: boolean;
}

export default function Wishlist({ isWishlistOpen, toggleWishlist }: IProps) {
  const { wishlists } = useAppSelector((state) => state.wishlists);

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full h-screen z-50 duration-500 ease-in-out ${
        isWishlistOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-1/4 min-h-screen bg-white fixed top-0 right-0 shadow px-8 pt-10 pb-7 flex flex-col">
        <div className="flex justify-end">
          <RxCross1
            title="Close"
            size={30}
            cursor="pointer"
            onClick={toggleWishlist}
          />
        </div>
        <div className={`${style.flex_normal} gap-2 py-8 border-b`}>
          <BsBagHeart size={30} title="Cart" cursor="pointer" />
          <h4 className="text-xl font-bold">
            {wishlists?.length} {wishlists?.length > 1 ? "Items" : "Item"}
          </h4>
        </div>
        <div
          className="overflow-scroll h-[70vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          {wishlists?.length === 0 ? (
            <div>No item in wishlist</div>
          ) : (
            wishlists?.map((item, idx) => (
              <ItemCard toggleWishlist={toggleWishlist} key={idx} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
