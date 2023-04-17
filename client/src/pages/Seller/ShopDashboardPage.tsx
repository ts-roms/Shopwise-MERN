import { useState } from "react";
import DashboardHeader from "../../components/shop/Dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/Dashboard/DashboardSidebar";

export default function ShopDashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <DashboardHeader />
      <section>
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* <DashboardContent activeTab={activeTab} /> */}
      </section>
    </>
  );
}
