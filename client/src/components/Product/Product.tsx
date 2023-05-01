import loadable from "@loadable/component";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../helper/formatPrice";
import style from "../../styles/style";
const Stars = loadable(() => import("./Stars/Stars"));
import { IProduct } from "../../Interface";
import { host } from "../../server";
export interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { name, category, price, discount_price, images } = product;

  const productSlug = product.name.replace(/\s+/g, "-");

  return (
    <>
      <Link to={`/products/${productSlug}`}>
        <div className="border p-4 bg-white relative overflow-visible shadow-lg rounded-md">
          <div className="h-40 overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-[18%] md:hover:-translate-y-1/4 hover:shadow-img">
            <img
              src={`${host}/${images[0].url}`}
              loading="lazy"
              className="object-contain h-full w-full"
            />
          </div>
          <div className="pt-[10%] pb-3 space-y-3">
            <p className="font-bold text-sm capitalize">
              {name.length > 55 ? name.slice(0, 55) + "..." : name}
            </p>
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
              <AiOutlineHeart title="Add to wishlist" size={19} />
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
      </Link>
    </>
  );
}
