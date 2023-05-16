import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks";
import { server } from "../../../server";
import style from "../../../styles/style";

export default function Payment() {
  const [select, setSelect] = useState<null | number>(null);
  const stripe = useStripe();
  const element = useElements();
  const { cart, couponID } = useAppSelector((state) => state.cart);

  const cartWithIDandQty = cart?.map((item) => ({
    productId: item._id,
    productQuantity: item.quantity,
  }));

  const cartData = {
    cartWithIDandQty,
    couponID,
  };

  async function handleCardPayment(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/payments/create-payment-intent`,
        cartData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);
    } catch (error: AxiosError | any) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  }

  return (
    <div className="bg-white shadow rounded p-8">
      <div className="space-y-8">
        <button className="flex gap-8" onClick={() => setSelect(1)}>
          <span
            className={`bg-transparent h-6 w-6 rounded-full border-2 border-green-500 flex justify-center items-center relative after:absolute after:bg-green-500 after:z-30 after:rounded-full ${
              select === 1 ? "after:h-[18px] after:w-[18px]" : ""
            }`}
          ></span>
          <h4 className="font-semibold text-[#000000b1]">
            Pay with Debit/Credit Card
          </h4>
        </button>

        {select == 1 && (
          <div className="flex border-b px-14 pb-8">
            <form className="w-full space-y-4" onSubmit={handleCardPayment}>
              <div className="max-w-sm w-full">
                <label
                  htmlFor="nameoncard"
                  className="block text-sm font-medium text-[#999999]"
                >
                  Name On Card
                </label>
                <input
                  id="nameoncard"
                  required
                  className={`${style.input} w-full rounded-none text-[#444] p-0 text-[18px]`}
                />
              </div>

              <div className="max-w-sm w-full">
                <p className="text-sm font-medium text-[#999999]">
                  Card Information
                </p>
                <CardNumberElement
                  options={{
                    placeholder: "XXXX XXXXX XXXXX XXXXX",
                    style: {
                      base: { fontSize: "17px", color: "#444" },
                      empty: {
                        "::placeholder": {
                          color: "#c8c8c8",
                        },
                      },
                    },
                  }}
                  className={`${style.input} rounded-none`}
                />
                <div className={`${style.flex_normal} gap-4 mt-1`}>
                  <div className="w-1/2">
                    <CardExpiryElement
                      options={{
                        style: {
                          base: { fontSize: "17px", color: "#444" },
                          empty: {
                            "::placeholder": {
                              color: "#c8c8c8",
                            },
                          },
                        },
                      }}
                      className={`${style.input} rounded-none`}
                    />
                  </div>
                  <div className="w-1/2">
                    <CardCvcElement
                      options={{
                        style: {
                          base: { fontSize: "17px", color: "#444" },
                          empty: {
                            "::placeholder": {
                              color: "#c8c8c8",
                            },
                          },
                        },
                      }}
                      className={`${style.input} rounded-none`}
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-sm w-full">
                <button className="w-full border border-orange-500 py-1.5 rounded text-orange-500 font-medium transition-all hover:text-white hover:bg-orange-500">
                  Pay
                </button>
              </div>
            </form>
          </div>
        )}

        <button className="flex gap-8" onClick={() => setSelect(2)}>
          <span
            className={`bg-transparent h-6 w-6 rounded-full border-2 border-green-500 flex justify-center items-center relative after:absolute  after:bg-green-500 after:rounded-full after:z-30 ${
              select === 2 ? "after:h-[18px] after:w-[18px]" : ""
            }`}
          ></span>
          <h4 className="font-semibold text-[#000000b1]">Pay with Pay Pal</h4>
        </button>
        <button className="flex gap-8" onClick={() => setSelect(3)}>
          <span
            className={`bg-transparent h-6 w-6 rounded-full border-2 border-green-500 flex justify-center items-center relative after:absolute after:bg-green-500 after:z-30 after:rounded-full ${
              select === 3 ? "after:h-[18px] after:w-[18px]" : ""
            }`}
          ></span>
          <h4 className="font-semibold text-[#000000b1]">Cash On Delivery</h4>
        </button>
      </div>
    </div>
  );
}
