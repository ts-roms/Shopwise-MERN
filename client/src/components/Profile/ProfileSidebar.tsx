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
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

interface IProps {
  setActiveTab: (prev: number) => void;
  activeTab: number;
}

export default function ProfileSidebar({ setActiveTab, activeTab }: IProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLinks = [
    { linkName: "Profile", icon: <RxPerson title="Profile" />, id: 1 },
    {
      linkName: "Orders",
      icon: <HiOutlineShoppingBag title="Orders" />,
      id: 2,
    },
    { linkName: "Refunds", icon: <HiReceiptRefund title="Refunds" />, id: 3 },
    {
      linkName: "Track order",
      icon: <MdOutlineTrackChanges title="Track Orders" />,
      id: 4,
    },
    {
      linkName: "payment method",
      icon: <AiOutlineCreditCard title="Payment Methods" />,
      id: 5,
    },
    { linkName: "address", icon: <TbAddressBook title="Address" />, id: 6 },
  ];

  async function handleLogout() {
    try {
      const res = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      console.log(res);
      toast.success(res.data.message);
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error occured!");
    }
  }

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
            } capitalize hidden  lg:block`}
          >
            {link.linkName}
          </span>
        </div>
      ))}
      <div
        className={`${style.flex_normal} gap-3 cursor-pointer transition-all px-8 py-4 hover:bg-orange-200`}
        // onClick={() => setActiveTab(userLinks.length + 1)}
        onClick={handleLogout}
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
            <AiOutlineLogout title="Log out" />
          </span>
        </span>
        <span
          className={`${
            activeTab === userLinks.length + 1 ? "text-orange-500" : ""
          } capitalize hidden lg:block`}
        >
          Log out
        </span>
      </div>
    </div>
  );
}
