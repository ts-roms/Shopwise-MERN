import loadable from "@loadable/component";
import style from "../../../styles/style";
import { useState, useEffect } from "react";
import { IProduct } from "../../../Interface";
import { useAppSelector } from "../../../hooks";
import productsData from "../../../constant/product.json";
const Product = loadable(() => import("../../Product/Product"));

export default function BeastDeals() {
  const [products, setProducts] = useState<IProduct[] | null>(null);

  let { allProducts } = useAppSelector((state) => state.allProducts);

  useEffect(() => {
    const bestDealProducts = [...allProducts].sort(
      (a, b) => b.sold_out - a.sold_out
    );
    setProducts(bestDealProducts.slice(0, 5));
  }, [allProducts]);

  return (
    <section>
      <div className={`${style.section} text-`}>
        <h1 className={`${style.heading}`}>
          Best Deals on different products:
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
          {products?.map((product, idx) => (
            <Product key={idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
