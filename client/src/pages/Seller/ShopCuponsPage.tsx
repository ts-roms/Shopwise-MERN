import ShopCupons from "../../components/shop/Dashboard/ShopCupons";
import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";

export default function ShopCuponsPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={8} />
          <div className="w-full overflow-x-scroll flex-grow rounded bg-white shadow h-[87vh] flex p-8">
            <ShopCupons />
          </div>
        </div>
      </section>
    </>
  );
}
