import loadable from "@loadable/component";
const ShopHeader = loadable(
  () => import("../../components/shop/ShopLayout/ShopHeader")
);
const ShopSidebar = loadable(
  () => import("../../components/shop/ShopLayout/ShopSidebar")
);

const CreateEvent = loadable(
  () => import("../../components/shop/Dashboard/CreateEvent")
);

export default function SellerCreatEventPag() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={6} />
          <div className="w-full flex-grow flex justify-between overflow-x-scroll rounded bg-white shadow h-[87vh]">
            <CreateEvent />
          </div>
        </div>
      </section>
    </>
  );
}
