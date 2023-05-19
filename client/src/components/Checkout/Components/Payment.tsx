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

type SavedAddress = {
  fullName: string;
  email: string;
  primaryNumber: number;
  alternateNumber: number;
  zipCode: string;
  selectedCountry: string;
  selectedState: string;
  address1: string;
  address2: string;
  address3: string;
};

export default function Payment() {
  const [select, setSelect] = useState<null | number>(null);
  const stripe = useStripe();
  const elements = useElements();
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
      if (!elements || !stripe) {
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);

      if (cardNumberElement) {
        // creating payment intent
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

        const client_secret = data.clientSecret;

        const { error, paymentIntent } = await stripe?.confirmCardPayment(
          client_secret,
          {
            payment_method: { card: cardNumberElement },
          }
        );

        if (error) {
          toast.error(error.message);
        } else {
          if (paymentIntent.status === "succeeded") {
            const shipping_address = localStorage.getItem("shipping_address");

            let savedAddress: SavedAddress;

            if (shipping_address) {
              savedAddress = JSON.parse(shipping_address);
            } else {
              return toast.error("No address found");
            }

            const shippingAddress = {
              country: savedAddress.selectedCountry,
              zipcode: savedAddress.zipCode,
              state: savedAddress.selectedState,
              address3: savedAddress.address3,
              address2: savedAddress.address2,
              address1: savedAddress.address1,
              fullname: savedAddress.fullName,
              primaryNumber: savedAddress.primaryNumber,
              alternateNumber: savedAddress.alternateNumber,
            };

            const paymentInfo = {
              id: paymentIntent.id,
              status: paymentIntent.status,
              paymentMehod: paymentIntent.payment_method,
            };

            const order = {
              paymentInfo,
              shippingAddress,
              cartWithIDandQty,
              paidPrice: paymentIntent.amount,
            };

            const { data } = await axios.post(`${server}/orders`, order, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });

            toast.success("Order created successfully");
            console.log(data.orders);
          }
        }
      }
    } catch (err: AxiosError | any) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
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
                    placeholder: "XXXX XXXX XXXX XXXX",
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
