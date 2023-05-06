import loadable from "@loadable/component";
const TrackUserOrder = loadable(
  () => import("./ProfileComponent/TrackUserOrder")
);
const UserAdrress = loadable(() => import("./ProfileComponent/UserAdrress"));
const UserOrders = loadable(() => import("./ProfileComponent/UserOrders"));
const UserPasswordChange = loadable(
  () => import("./ProfileComponent/UserPasswordChange")
);
const UserProfile = loadable(() => import("./ProfileComponent/UserProfile"));
const UserRefunds = loadable(() => import("./ProfileComponent/UserRefunds"));

interface IProps {
  activeTab: number;
}

export default function ProfileContent({ activeTab }: IProps) {
  return (
    <div className="w-full bg-white rounded-md shadow py-8 px-6 min-h-[428px] lg:min-h-[456px]">
      {activeTab === 0 && <UserProfile />}
      {activeTab === 1 && <UserOrders />}
      {activeTab === 2 && <UserRefunds />}
      {activeTab === 3 && <TrackUserOrder />}
      {activeTab === 4 && <UserPasswordChange />}
      {activeTab === 5 && <UserAdrress />}
    </div>
  );
}
