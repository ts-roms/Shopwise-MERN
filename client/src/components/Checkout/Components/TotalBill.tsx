import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { formattedPrice } from "../../../helper/formatPrice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ICoupon } from "../../../Interface";
import { totalSavingCalculate } from "../../../redux/actions/cartActions";
import { server } from "../../../server";
import style from "../../../styles/style";

export default function TotalBill() {
  const { cart, cartPrice, totalSaving } = useAppSelector(
    (state) => state.cart
  );
  const [shippingCharged, setShippingCharged] = useState(false);
  const [enterCouponCode, setEnterCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [coupon, setCoupon] = useState<null | ICoupon>(null);
  const dispatch = useAppDispatch();

  // to show difference between the mrp price and selling price
  const mrpCartPrice = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const shippingCharge = 15000;

  // calculate total saving
  function calculateTotalSaving(
    mrpCartPrice: number,
    cartPrice: number,
    couponDiscount: number,
    shippingCharged: boolean
  ) {
    let totalSaving = 0;

    if (couponDiscount > 0 && !shippingCharged) {
      totalSaving = mrpCartPrice - cartPrice + couponDiscount + shippingCharge;
    } else if (couponDiscount > 0 && shippingCharged) {
      totalSaving = mrpCartPrice - cartPrice + couponDiscount;
    } else {
      totalSaving = mrpCartPrice - cartPrice;
    }

    return totalSaving;
  }

  // final price which user has to pay
  const finalPrice = mrpCartPrice - totalSaving;

  // verfiy the enterd coupon code with server
  async function handleCouponCheck(e: FormEvent<Element>) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/coupons/`,
        { couponCode: enterCouponCode, cartPrice },
        { withCredentials: true }
      );

      const coupon = res.data;
      setCoupon(coupon);
    } catch (error: AxiosError | any) {
      setEnterCouponCode("");
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    }
  }

  // wheather to charge for shipping or not
  useEffect(() => {
    if (cartPrice < 150000) {
      setShippingCharged(true);
    } else {
      setShippingCharged(false);
    }
  }, [cart, cartPrice]);

  // if user enter coupon then apply coupon to only for those product which shop have generated coupon code
  useEffect(() => {
    if (coupon) {
      const eligibleItems = cart?.filter(
        (item) => item.shop?._id === coupon.shop?._id
      );

      if (eligibleItems.length === 0) {
        toast.error("Coupon code is not valid for this shop");
      } else {
        const eligibleItemsPrice = eligibleItems.reduce((acc, item) => {
          const price = item.discount_price || item.price;
          return acc + price * item.quantity;
        }, 0);

        const discountPrice = (eligibleItemsPrice * coupon.value) / 100;
        setCouponDiscount(discountPrice);
        setEnterCouponCode("");
      }
    } else {
      setCouponDiscount(0);
      setEnterCouponCode("");
    }

    dispatch(
      totalSavingCalculate(
        calculateTotalSaving(
          mrpCartPrice,
          cartPrice,
          couponDiscount,
          shippingCharged
        )
      )
    );
  }, [cart, coupon, couponDiscount]);

  return (
    <div className="w-full bg-white p-8 shadow rounded space-y-2">
      <div
        className={`${style.flex_normal} justify-between  
      `}
      >
        <p className="text-[#000000a4]">Cart MRP Value:</p>
        <p className="font-semibold text-lg line-through">
          {formattedPrice(mrpCartPrice)}
        </p>
      </div>
      <div
        className={`${style.flex_normal} justify-between  
      `}
      >
        <p className="text-[#000000a4]">Cart Discount Value:</p>
        <p className="font-semibold text-lg">{formattedPrice(cartPrice)}</p>
      </div>

      <div
        className={`${style.flex_normal} justify-between
      `}
      >
        <p className="text-[#000000a4]">Shipping:</p>
        <p
          className={`text-lg ${
            !shippingCharged ? "line-through font-extralight" : "font-semibold"
          }`}
        >
          {formattedPrice(shippingCharge)}
        </p>
        {/* {!shippingCharged && <span className="text-xs">Free</span>} */}
      </div>
      <div
        className={`${style.flex_normal} justify-between
      `}
      >
        <p
          className={`${
            couponDiscount > 0 ? "text-[#5cb85c] font-bold" : "text-[#000000a4]"
          } `}
        >
          Coupon Discount:
        </p>
        <p
          className={`${
            couponDiscount > 0
              ? "text-[#5cb85c] font-bold "
              : "text-[#000000a4]"
          } text-lg`}
        >
          {couponDiscount > 0 ? formattedPrice(couponDiscount) : "---"}
        </p>
      </div>
      <div
        className={`${style.flex_normal} justify-between  
      `}
      >
        <p className="text-[#5cb85c] font-bold">Total Saving:</p>
        <p className="text-[#5cb85c] font-bold text-lg">
          {formattedPrice(totalSaving)}
        </p>
      </div>

      <div className="w-full py-2 border-t font-bold">
        <p className="text-lg text-end">{formattedPrice(finalPrice)}</p>
      </div>

      <form onSubmit={handleCouponCheck}>
        <input
          type="text"
          className={`${style.input} block w-full px-3 py-1.5`}
          placeholder={
            coupon
              ? "You can only apply one coupon at a time"
              : "Enter Coupon Code"
          }
          value={enterCouponCode}
          disabled={coupon ? true : false}
          required
          onChange={(e) => setEnterCouponCode(e.target.value)}
        />
        {coupon && (
          <div className="flex px-2 items-center justify-between text-gray-800 bg-green-50 border border-green-500 rounded text-sm mt-2 italic">
            <p>
              coupon code <span className="font-bold ">"{coupon?.name}"</span>
              applied
            </p>
            <RxCross2 cursor="pointer" onClick={() => setCoupon(null)} />
          </div>
        )}

        <div className="mt-6">
          <button className="w-full border border-orange-500 py-1.5 rounded text-orange-500 font-medium transition-all hover:text-white hover:bg-orange-500">
            Apply Coupon Code
          </button>
        </div>
      </form>
    </div>
  );
}
