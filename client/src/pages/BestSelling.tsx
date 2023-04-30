import { useState, useEffect } from "react";
const Product = loadable(() => import("../components/Product/Product"));
import productsData from "../constant/product.json";
import style from "../styles/style";
import { IProduct } from "../Interface";
import loadable from "@loadable/component";
import { useAppSelector } from "../hooks";

export default function BestSelling() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { allProducts } = useAppSelector((state) => state.allProducts);

  useEffect(() => {
    const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
    setProducts(sorted);
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex">
      <div className={`${style.section}`}>
        {products.length === 0 ? (
          <h1 className="text-2xl text-center">Sorry, No Product right now.</h1>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
            {products?.map((product, idx) => (
              <Product key={idx} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
