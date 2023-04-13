import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import style from "../../../styles/style";
export default function UserPaymentMethod() {
  return (
    <div className="w-full px-5">
      <div className={`w-full ${style.flex_normal} justify-between`}>
        <h1 className="text-[#000000ba] pb-2 text-2xl">Payment Methods</h1>

        <button className={`${style.button} text-white`}>
          <span className="mr-1">
            <MdOutlineAdd size={25} />
          </span>
          Add New
        </button>
      </div>

      <div className="space-y-10 mt-6 py-3">
        <div
          className={`w-full rounded ${style.flex_normal} justify-between bg-gray-50 shadow py-4 px-8`}
        >
          <div className={`${style.flex_normal}`}>
            <img
              src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
              alt=""
            />
            <h4 className="font-semibold">Just9krish</h4>
          </div>
          <div className={`${style.flex_normal} gap-4`}>
            <h4>1234 **** *** ****</h4>
            <h4>08/28</h4>
          </div>
          <AiOutlineDelete className="cursor-pointer" size={25} />
        </div>
      </div>
    </div>
  );
}
