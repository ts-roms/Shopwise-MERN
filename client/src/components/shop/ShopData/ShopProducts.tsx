import ProductsData from "../../../constant/product.json";
import { IProduct } from "../../../Interface";
import Product from "../../Product/Product";

export default function ShopProducts() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-y-10 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-10">
      {ProductsData?.map((product: IProduct, idx) => (
        <Product product={product} key={idx} />
      ))}
    </div>
  );
}
