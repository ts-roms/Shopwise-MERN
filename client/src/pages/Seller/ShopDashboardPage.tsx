import loadable from "@loadable/component";
const ShopHeader = loadable(
  () => import("../../components/shop/ShopLayout/ShopHeader")
);
const ShopSidebar = loadable(
  () => import("../../components/shop/ShopLayout/ShopSidebar")
);

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
