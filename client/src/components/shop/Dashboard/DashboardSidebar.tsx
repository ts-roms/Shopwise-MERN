import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import style from "../../../styles/style";
import { HiOutlineReceiptRefund } from "react-icons/hi";

interface IProps {
  setActiveTab: (prev: number) => void;
  activeTab: number;
}

export default function DashboardSidebar({ setActiveTab, activeTab }: IProps) {
  const sellerLinks = [
    {
      linkName: "dashboard",
      icon: <RxDashboard size={25} title="Dashboard" />,
      id: 1,
    },
    {
      linkName: "all orders",
      icon: <FiShoppingBag size={25} title="All Orders" />,
      id: 2,
    },
    {
      linkName: "all products",
      icon: <FiPackage size={25} title="Refunds" />,
      id: 3,
    },
    {
      linkName: "add product",
      icon: <AiOutlineFolderAdd size={25} title="Add Product" />,
      id: 4,
    },
    {
      linkName: "all events",
      icon: <BsCalendarEvent size={25} title="All Events" />,
      id: 5,
    },
    {
      linkName: "create event",
      icon: <VscNewFile size={25} title="Create Event" />,
      id: 6,
    },
    {
      linkName: "withdraw money",
      icon: <CiMoneyBill size={25} title="withdraw money" />,
      id: 7,
    },
    {
      linkName: "refunds",
      icon: <HiOutlineReceiptRefund size={25} title="Refunds" />,
      id: 8,
    },
    {
      linkName: "settings",
      icon: <CiSettings size={25} title="settings" />,
      id: 8,
    },
  ];

  return (
    <aside className="w-full lg:w-1/4 h-[90vh] overflow-scroll bg-white shadow">
      <div className="w-full py-4">
        {/* <Link to="/dashboard" className={`${style.flex_normal} gap-4`}>
          <RxDashboard title="Dashboard" size={30} color="#555" />
          <h5 className={`text-lg`}>Dashboard</h5>
        </Link> */}
        {sellerLinks?.map((link, idx) => (
          <div
            key={idx}
            className={`${style.flex_normal} gap-3 cursor-pointer transition-all px-5 py-4 lg:px-12 hover:bg-orange-200`}
            onClick={() => setActiveTab(idx)}
          >
            <span
              className={`${
                activeTab === idx ? "text-orange-500" : "text-[#555]"
              } text-xl`}
            >
              {link.icon}
            </span>
            <span
              className={`${
                activeTab === idx ? "text-orange-500" : "text-[#555]"
              } capitalize hidden text-sm lg:text-base md:block`}
            >
              {link.linkName}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
