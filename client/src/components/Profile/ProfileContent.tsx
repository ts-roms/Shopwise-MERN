import TrackUserOrder from "./ProfileComponent/TrackUserOrder";
import UserAdrress from "./ProfileComponent/UserAdrress";
import UserOrders from "./ProfileComponent/UserOrders";
import UserPaymentMethod from "./ProfileComponent/UserPaymentMethod";
import UserProfile from "./ProfileComponent/UserProfile";
import UserRefunds from "./ProfileComponent/UserRefunds";

interface IProps {
  activeTab: number;
}

export default function ProfileContent({ activeTab }: IProps) {
  return (
    <div className="w-full bg-white rounded-md shadow py-8 px-6">
      {activeTab === 0 && <UserProfile />}
      {activeTab === 1 && <UserOrders />}
      {activeTab === 2 && <UserRefunds />}
      {activeTab === 3 && <TrackUserOrder />}
      {activeTab === 4 && <UserPaymentMethod />}
      {activeTab === 5 && <UserAdrress />}
    </div>
  );
}
