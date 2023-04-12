import ProfileContent from "../components/Profile/ProfileContent";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import { useState } from "react";
import style from "../styles/style";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>
      <div className={`${style.section}`}>
        <div className="flex py-10 gap-4">
          <aside className="w-1/4">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>
          <ProfileContent activeTab={activeTab} />
        </div>
      </div>
    </section>
  );
}
