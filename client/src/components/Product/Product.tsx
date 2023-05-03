import loadable from "@loadable/component";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../helper/formatPrice";
import style from "../../styles/style";
const Stars = loadable(() => import("./Stars/Stars"));
import { IProduct } from "../../Interface";
import { host } from "../../server";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addToWishlists,
  removeFromWishlists,
} from "../../redux/actions/wishlistActions";
export interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { name, category, price, discount_price, images } = product;
  const { wishlists } = useAppSelector((state) => state.wishlists);

  const productSlug = product.name.replace(/\s+/g, "-");

  const [isWish, setIsWish] = useState(false);
  const dispatch = useAppDispatch();

  function addToWishlistHandler(product: IProduct) {
    dispatch(addToWishlists(product));
    setIsWish(!isWish);
  }

  function removeFromWishlistHandler(product: IProduct) {
    dispatch(removeFromWishlists(product));
    setIsWish(!isWish);
  }

  useEffect(() => {
    if (wishlists?.find((i: IProduct) => i._id === product._id)) {
      setIsWish(true);
    } else {
      setIsWish(false);
    }
  }, []);

  return (
    <>
      <div className="border p-4 bg-white relative overflow-visible shadow-lg rounded-md">
        <div className="h-40 overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-[18%] md:hover:-translate-y-1/4 hover:shadow-img">
          <img
            src={`${host}/${images[0].url}`}
            loading="lazy"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="pt-[10%] pb-3 space-y-3">
          <Link
            className="block font-bold text-sm capitalize hover:text-blue-500 transition-all"
            to={`/products/${productSlug}`}
          >
            {name.length > 55 ? name.slice(0, 55) + "..." : name}
          </Link>
          <span className="capitalize inline-block bg-red-300 text-white text-xs px-1.5 rounded-xl">
            {category}
          </span>
          {/* <Stars stars={rating} /> */}
        </div>
        <div className="space-y-3 border-t border-[#ddd] pt-3">
          <div className={`${style.flex_normal} justify-between`}>
            <div className={`${style.flex_normal} gap-2`}>
              <span className="text-green-600 font-bold text-base">
                {formattedPrice(discount_price)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formattedPrice(price)}
              </span>
            </div>
            {isWish ? (
              <AiFillHeart
                cursor="pointer"
                title="Remove from wish list"
                color="red"
                onClick={() => removeFromWishlistHandler(product)}
                size={25}
              />
            ) : (
              <AiOutlineHeart
                cursor="pointer"
                title="Add to wish list"
                color="red"
                onClick={() => addToWishlistHandler(product)}
                size={25}
              />
            )}
          </div>
          <button className={`${style.cart_button}`}>
            <AiOutlineShoppingCart
              title="Add to cart"
              className="h-4 w-4"
              color="#fff"
            />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </>
  );
}
