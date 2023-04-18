import AddProduct from "../../components/shop/Dashboard/AddProduct";
import ShopHeader from "../../components/shop/ShopLayout/ShopHeader";
import ShopSidebar from "../../components/shop/ShopLayout/ShopSidebar";

export default function SellerAddProductPage() {
  return (
    <>
      <ShopHeader />
      <section>
        <div className="flex gap-5">
          <ShopSidebar activeTab={4} />
          <AddProduct />
        </div>
      </section>
    </>
  );
}
