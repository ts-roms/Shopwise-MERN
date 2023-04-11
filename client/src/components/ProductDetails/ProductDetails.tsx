import { IProduct } from "../../Interface";
import { useState } from "react";
import style from "../../styles/style";
import { formattedPrice } from "../../helper/formatPrice";
import AddtoCart from "../AddtoCart/AddtoCart";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

export default function ProductDetails({ product }: { product: IProduct }) {
  const [select, setSelect] = useState(0);

  const { image_Url, name, discount_price, price, description, shop } = product;

  window.scrollTo(0, 0);
  return (
    <div className="w-full py-5">
      <div className="block w-full lg:flex">
        <div className="w-full lg:w-1/2">
          <img src={image_Url[select].url} className="w-4/5 mx-auto" alt="" />
          <div className="w-full flex justify-center">
            <div className={`${select == 0 ? "border" : ""} cursor-pointer`}>
              <img
                src={image_Url[0].url}
                className="h-48"
                onClick={() => setSelect(0)}
                alt=""
              />
            </div>
            <div className={`${select == 1 ? "border" : ""} cursor-pointer`}>
              <img
                src={image_Url[1].url}
                className="h-48"
                onClick={() => setSelect(1)}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="space-y-12 p-10">
            <h1 className={`${style.productTitle}`}>{name}</h1>
            <p>{description}</p>

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
            <div className={`${style.flex_normal} gap-8`}>
              <div className={`${style.flex_normal} gap-3`}>
                <img
                  className="h-12 w-12 rounded-full"
                  src={shop.shop_avatar.url}
                  alt=""
                />
                <div>
                  <h4 className={`${style.shop_name}`}>{shop.name}</h4>
                  <h4>{shop.ratings} Ratings</h4>
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
