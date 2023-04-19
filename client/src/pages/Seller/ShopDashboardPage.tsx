import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";

export default function ShopDashboardPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-5 mt-3 ">
          <ShopSidebar activeTab={1} />
        </div>
      </section>
    </>
  );
}
