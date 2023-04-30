import loadable from "@loadable/component";
const ShopHeader = loadable(
  () => import("../../components/shop/ShopLayout/ShopHeader")
);
const ShopSidebar = loadable(
  () => import("../../components/shop/ShopLayout/ShopSidebar")
);
const ShopAllEvents = loadable(
  () => import("../../components/shop/Dashboard/ShopAllEvents")
);

export default function ShopAllEventsPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={5} />
          <div className="w-full flex-grow flex overflow-x-scroll rounded bg-white shadow h-[87vh]">
            <ShopAllEvents />
          </div>
        </div>
      </section>
    </>
  );
}
