import style from "../../../styles/style";
import { FaShippingFast } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Branding() {
  return (
    <div className={`${style.section}`}>
      <div className="my-12 md:flex flex-wrap gap-4 space-y-3 md:space-y-0 lg:justify-between w-full">
        <div className="flex items-center flex-1 bg-white rounded-md shadow py-5 px-8 gap-4">
          <FaShippingFast color="#ff7d1a" size={40} />
          <div>
            <h4 className="font-semibold">Free Shipping</h4>
            <p className="text-gray-800 text-sm">From all order over 500</p>
          </div>
        </div>
        <div className="flex items-center flex-1 bg-white rounded-md shadow  py-5 px-8 gap-4">
          <MdLocalOffer color="#ff7d1a" size={40} />
          <div>
            <h4 className="font-semibold">Amazing Deals</h4>
            <p className="text-gray-800 text-sm">Saves upto 40% off</p>
          </div>
        </div>
        <div className="flex items-center flex-1 bg-white rounded-md shadow  py-5 px-8 gap-4">
          <FaShippingFast color="#ff7d1a" size={40} />
          <div>
            <h4 className="font-semibold">Affordable Prices</h4>
            <p className="text-gray-800 text-sm">Direct price of Manufacurer</p>
          </div>
        </div>
        <div className="flex items-center flex-1 bg-white -md shadow  py-5 px-8 gap-4">
          <RiSecurePaymentLine color="#ff7d1a" size={40} />
          <div>
            <h4 className="font-semibold">Secure Payments</h4>
            <p className="text-gray-800 text-sm">
              100% protected and secure payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
