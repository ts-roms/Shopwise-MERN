import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "../components/Product/Product";
import productsData from "../constant/product.json";
import style from "../styles/style";
import { IProduct } from "../Interface";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [searchParams] = useSearchParams();

  const categoryData = searchParams.get("category");

  useEffect(() => {
    if (categoryData === null) {
      const sorted =
        productsData &&
        productsData.sort((a, b) => a.total_sell - b.total_sell);
      setProducts(sorted);
    } else {
      const sorted =
        productsData &&
        productsData.filter((product) => product.category == categoryData);
      setProducts(sorted);
    }
    window.scrollTo(0, 0);
  }, []);

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
