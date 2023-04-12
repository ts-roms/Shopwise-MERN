import style from "../../styles/style";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiReceiptRefund } from "react-icons/hi";
import {
  AiOutlineCreditCard,
  AiOutlineMessage,
  AiOutlineLogout,
} from "react-icons/ai";
import { TbAddressBook } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";

interface IProps {
  setActiveTab: (prev: number) => void;
  activeTab: number;
}

export default function ProfileSidebar({ setActiveTab, activeTab }: IProps) {
  const navigate = useNavigate();

  const userLinks = [
    { linkName: "Profile", icon: <RxPerson />, id: 1 },
    { linkName: "Orders", icon: <HiOutlineShoppingBag />, id: 2 },
    { linkName: "Refunds", icon: <HiReceiptRefund />, id: 3 },
    { linkName: "Track order", icon: <MdOutlineTrackChanges />, id: 4 },
    { linkName: "payment method", icon: <AiOutlineCreditCard />, id: 5 },
    { linkName: "address", icon: <TbAddressBook />, id: 6 },
  ];

  return (
    <div className="bg-white shadow rounded-lg py-8">
      {userLinks?.map((link, idx) => (
        <div
          key={idx}
          className={`${style.flex_normal} gap-3 cursor-pointer transition-all px-8 py-4 hover:bg-orange-200`}
          onClick={() => setActiveTab(idx)}
        >
          <span
            className={`${activeTab === idx ? "text-orange-500" : ""} text-xl`}
          >
            {link.icon}
          </span>
          <span
            className={`${
              activeTab === idx ? "text-orange-500" : ""
            } capitalize`}
          >
            {link.linkName}
          </span>
        </div>
      ))}
      <div
        className={`${style.flex_normal} gap-3 cursor-pointer transition-all px-8 py-4 hover:bg-orange-200`}
        onClick={() => setActiveTab(userLinks.length + 1)}
      >
        <span
          className={`${
            activeTab === userLinks.length + 1 ? "text-orange-500" : ""
          } text-xl`}
        >
          <span
            className={`${
              activeTab === userLinks.length + 1 ? "text-orange-500" : ""
            } text-xl`}
          >
            <AiOutlineLogout />
          </span>
        </span>
        <span
          className={`${
            activeTab === userLinks.length + 1 ? "text-orange-500" : ""
          } capitalize`}
        >
          Log out
        </span>
      </div>
    </div>
  );
}
