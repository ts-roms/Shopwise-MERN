import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import style from "../../../styles/style";

export default function UserAdrress() {
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
            <h4 className="font-semibold">Default</h4>
          </div>
          <div className={`${style.flex_normal} gap-4`}>
            <h4>433, Sarswati tower, New Delhi</h4>
          </div>
          <div className={`${style.flex_normal} gap-4`}>
            <h4>+91 1234567890</h4>
          </div>
          <AiOutlineDelete className="cursor-pointer" size={25} />
        </div>
      </div>
    </div>
  );
}
