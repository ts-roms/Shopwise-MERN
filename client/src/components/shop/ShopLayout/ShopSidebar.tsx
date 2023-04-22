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
  activeTab: number;
}

export default function ShopSidebar({ activeTab }: IProps) {
  const sellerLinks = [
    {
      linkName: "dashboard",
      link: "/dashboard",
      icon: <RxDashboard size={25} title="Dashboard" />,
      id: 1,
    },
    {
      linkName: "all orders",
      link: "/shop-orders",
      icon: <FiShoppingBag size={25} title="All Orders" />,
      id: 2,
    },
    {
      linkName: "all products",
      link: "/shop-products",
      icon: <FiPackage size={25} title="All Products" />,
      id: 3,
    },
    {
      linkName: "add product",
      link: "/shop-add-product",
      icon: <AiOutlineFolderAdd size={25} title="Add Product" />,
      id: 4,
    },
    {
      linkName: "all events",
      link: "/shop-events",
      icon: <BsCalendarEvent size={25} title="All Events" />,
      id: 5,
    },
    {
      linkName: "create event",
      link: "/shop-create-event",
      icon: <VscNewFile size={25} title="Create Event" />,
      id: 6,
    },
    {
      linkName: "withdraw money",
      link: "/shop-withdraw-money",
      icon: <CiMoneyBill size={25} title="withdraw money" />,
      id: 7,
    },
    {
      linkName: "Discount codes",
      link: "/shop-cupouns",
      icon: <AiOutlineGift size={25} title="Cupouns" />,
      id: 8,
    },
    {
      linkName: "refunds",
      link: "/shop-refunds",
      icon: <HiOutlineReceiptRefund size={25} title="Refunds" />,
      id: 9,
    },
    {
      linkName: "settings",
      link: "/shop-settings",
      icon: <CiSettings size={25} title="settings" />,
      id: 10,
    },
  ];

  return (
    <aside className="w-fit lg:w-1/4 h-[87vh] overflow-scroll bg-white shadow">
      <div className="w-full py-4">
        {sellerLinks?.map((link) => (
          <Link to={link.link} key={link.id}>
            <div
              key={link.id}
              className={`${style.flex_normal} gap-3 cursor-pointer transition-all w-fit md:w-full px-5 py-4 lg:px-12 hover:bg-orange-200`}
            >
              <span
                className={`${
                  activeTab === link.id ? "text-orange-500" : "text-[#555]"
                } text-xl`}
              >
                {link.icon}
              </span>
              <span
                className={`${
                  activeTab === link.id ? "text-orange-500" : "text-[#555]"
                } capitalize hidden text-sm lg:text-base md:block`}
              >
                {link.linkName}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
