import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formattedPrice } from "../../../helper/formatPrice";
import { useAppSelector } from "../../../hooks";
import { server } from "../../../server";
import style from "../../../styles/style";

export default function TotalBill() {
  const { cart } = useAppSelector((state) => state.cart);
  const [shippingCharged, setShippingCharged] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const totalBill = cart?.reduce((acc, item) => {
    const price = item.discount_price ? item.discount_price : item.price;
    return acc + item.quantity * price;
  }, 0);

  const mrpCartPrice = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  async function handleCouponCheck(e: FormEvent<Element>) {
    e.preventDefault();

    try {
      const res = await axios.get(`${server}/coupons/${couponCode}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Coupon applied successfully");
      }
    } catch (e: AxiosError | any) {
      if (e.response) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    if (totalBill < 150000) {
      setShippingCharged(true);
    }
  }, [cart]);

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
        <p className="text-[#000000a4]">Cart Value:</p>
        <p className="font-semibold text-lg">{formattedPrice(totalBill)}</p>
      </div>
      <div
        className={`${style.flex_normal} justify-between  
      `}
      >
        <p className="text-[#5cb85c] font-bold">Total Saving:</p>
        <p className="text-[#5cb85c] font-bold text-lg">
          {formattedPrice(mrpCartPrice - totalBill)}
        </p>
      </div>
      <div
        className={`${style.flex_normal} justify-between
      `}
      >
        <p className="text-[#000000a4]">Shipping:</p>
        <p
          className={`text-lg ${
            !shippingCharged ? "line-through" : "font-semibold"
          }`}
        >
          {formattedPrice(15000)}
        </p>
        {/* {!shippingCharged && <span className="text-xs">Free</span>} */}
      </div>
      <div
        className={`${style.flex_normal} justify-between
      `}
      >
        <p className="text-[#5cb85c] font-bold">Discount:</p>
        <p className="text-[#5cb85c] font-bold text-lg">-</p>
      </div>
      <div className="w-full py-2 border-t font-bold">
        <p className="text-lg text-end">{formattedPrice(totalBill)}</p>
      </div>

      <form onSubmit={handleCouponCheck}>
        <input
          type="text"
          className={`${style.input} block w-full px-3 py-1.5`}
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <div className="mt-6">
          <button className="w-full border border-orange-500 py-1.5 rounded text-orange-500 font-medium transition-all hover:text-white hover:bg-orange-500">
            Apply Coupon Code
          </button>
        </div>
      </form>
    </div>
  );
}
