import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";
import AddProduct from "../../components/shop/Dashboard/AddProduct";

export default function SellerAddProductPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-2 md:gap-5 mt-3">
          <ShopSidebar activeTab={4} />
          <div className="w-full flex-grow flex justify-between">
            <AddProduct />
          </div>
        </div>
      </section>
    </>
  );
}
