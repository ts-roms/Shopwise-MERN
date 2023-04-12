import ProfileContent from "../components/Profile/ProfileContent";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import style from "../styles/style";

export default function ProfilePage() {
  return (
    <section>
      <div className={`${style.section}`}>
        <div className="bg-white flex py-10">
          <aside className="w-1/4">
            <ProfileSidebar />
          </aside>
          <ProfileContent />
        </div>
      </div>
    </section>
  );
}
