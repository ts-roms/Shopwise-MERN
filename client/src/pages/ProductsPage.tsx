import loadable from "@loadable/component";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../styles/style";
import { IProduct } from "../Interface";
import { useAppSelector } from "../hooks";
import productsData from "../constant/product.json";
const Product = loadable(() => import("../components/Product/Product"));

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { allProducts } = useAppSelector((state) => state.allProducts);

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  useEffect(() => {
    if (categoryData === null) {
      const sorted = [...allProducts]?.sort((a, b) => a.sold_out - b.sold_out);
      setProducts(sorted);
    } else {
      const sorted = allProducts?.filter(
        (product) => product.category == categoryData
      );
      setProducts(sorted);
    }
    window.scrollTo(0, 0);
  }, [categoryData]);

  return (
    <section className="min-h-screen flex">
      <div className={`${style.section}`}>
        {products.length === 0 ? (
          <h1 className="text-2xl text-center">
            Sorry, No Product for the {categoryData} category right now.
          </h1>
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
