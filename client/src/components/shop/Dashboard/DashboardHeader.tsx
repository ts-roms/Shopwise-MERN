import { Link } from "react-router-dom";
import style from "../../../styles/style";
import logo from "../../../assets/shopwise.png";
import { AiOutlineGift } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IAppState } from "../../../Interface";
import { host } from "../../../server";

export default function DashboardHeader() {
  const { seller } = useSelector((state: IAppState) => state.seller);

  return (
    <header className="shadow w-full sticky top-0 left-0 py-4 px-6 bg-white">
      <div className={`${style.flex_normal} justify-between`}>
        <div>
          <Link to="/dashboard">
            <img className="h-11 w-32" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className={` ${style.flex_normal} gap-8 hidden lg:flex`}>
          <Link to="/dashboard/cupouns">
            <AiOutlineGift title="Cupouns" size={30} color="#555" />
          </Link>
          <Link to="/dashboard/cupouns">
            <BsCalendarEvent title="All Events" size={30} color="#555" />
          </Link>
          <Link to="/dashboard/cupouns">
            <FiShoppingBag title="All Products" size={30} color="#555" />
          </Link>
          <Link to="/dashboard/cupouns">
            <FiPackage title="All Orders" size={30} color="#555" />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${host}/${seller.avatar}`}
              alt="Seller Profile Picture"
              className="h-11 w-11 rounded-full object-cover"
            />
          </Link>
        </div>
        <div className="lg:hidden">
          <HiMenuAlt3 size={30} />
        </div>
      </div>
    </header>
  );
}
