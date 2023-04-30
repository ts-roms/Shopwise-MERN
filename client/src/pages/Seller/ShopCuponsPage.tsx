import loadable from "@loadable/component";
const ShopHeader = loadable(
  () => import("../../components/shop/ShopLayout/ShopHeader")
);
const ShopSidebar = loadable(
  () => import("../../components/shop/ShopLayout/ShopSidebar")
);
const ShopCupons = loadable(
  () => import("../../components/shop/Dashboard/ShopCupons")
);

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
