import loadable from "@loadable/component";
import { IProduct } from "../../Interface";
import { useEffect } from "react";
import style from "../../styles/style";
import { formattedPrice } from "../../helper/formatPrice";
const AddtoCart = loadable(() => import("../Product/AddtoCart/AddtoCart"));
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { host } from "../../server";
const Carousel = loadable(() => import("./Carousel/Carousel"));
const Slider = loadable(() => import("./Slider/Slider"));

export default function ProductDetails({ product }: { product: IProduct }) {
  const { images, name, discount_price, price, description, shop } = product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full py-5 mt-8">
      <div className="block w-full lg:flex">
        <div className="w-full lg:w-1/2">
          <Carousel images={images} />
          <Slider images={images} />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="space-y-12 px-3 py-9 lg:p-10">
            <h1 className={`${style.productTitle}`}>{name}</h1>
            <p className="text-sm lg:text-base">{description}</p>

            <div className={`${style.flex_normal}`}>
              <h4 className={`${style.productDiscountPrice} text-3xl`}>
                {formattedPrice(discount_price)}
              </h4>
              <span className={`${style.price}`}>{formattedPrice(price)}</span>
            </div>

            <div className={`${style.flex_normal} justify-between`}>
              <AddtoCart product={product} />
              <AiOutlineHeart title="Add to Wishlist" size={30} />
            </div>
            <div className={`${style.flex_normal} flex-col md:flex-row gap-8`}>
              <div className={`${style.flex_normal} gap-3`}>
                <img
                  className="h-12 w-12 rounded-full"
                  src={`${host}/${shop.avatar}`}
                  alt="Shop Profile"
                />
                <div>
                  <h4 className={`${style.shop_name}`}>{shop.name}</h4>
                  {/* <h4>{shop.ratings} Ratings</h4> */}
                </div>
              </div>
              <button
                className={`${style.button} text-white bg-blue-500 hover:bg-blue-600 transition-all focus:bg-blue-600`}
              >
                Send Message
                <AiOutlineMessage title="Send Message" className="ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
