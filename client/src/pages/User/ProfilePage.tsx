import loadable from "@loadable/component";
import { useState } from "react";
import style from "../../styles/style";
const ProfileContent = loadable(
  () => import("../../components/Profile/ProfileContent")
);
const ProfileSidebar = loadable(
  () => import("../../components/Profile/ProfileSidebar")
);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>
      <div className={`${style.section}`}>
        <div className="flex py-10 gap-4">
          <aside className="md:w-1/4 w-full">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>
          <div className="flex-1 w-full overflow-scroll">
            <ProfileContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </section>
  );
}
