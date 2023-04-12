import UserProfile from "./ProfileComponent/UserProfile";

interface IProps {
  activeTab: number;
}

export default function ProfileContent({ activeTab }: IProps) {
  return (
    <div className="w-full bg-white rounded-md shadow py-8">
      {activeTab === 0 && <UserProfile />}
    </div>
  );
}
