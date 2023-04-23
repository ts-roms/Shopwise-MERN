import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";
import ShopAllEvents from "../../components/shop/Dashboard/ShopAllEvents";

export default function ShopAllEventsPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={5} />
          <div className="w-full flex-grow flex justify-between overflow-x-scroll rounded bg-white shadow h-[87vh]">
            <ShopAllEvents />
          </div>
        </div>
      </section>
    </>
  );
}
