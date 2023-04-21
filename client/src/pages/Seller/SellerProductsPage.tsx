import ShopAllProducts from "../../components/shop/Dashboard/ShopAllProducts";
import ShopProducts from "../../components/shop/ShopData/ShopProducts";
import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";

export default function SellerProductsPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={3} />
          <div className="w-full flex-grow flex justify-between overflow-x-scroll rounded bg-white shadow h-[87vh]">
            <div className="p-8">
              {/* <ShopProducts /> */}
              <ShopAllProducts />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}