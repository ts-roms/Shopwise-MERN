import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../constant/product.json";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { IProduct } from "../Interface";
import Loader from "../components/Loader/Loader";
import style from "../styles/style";

export default function ProductPage() {
  const { product_slug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  const productName = product_slug?.replace(/-/g, " ");

  useEffect(() => {
    if (productName) {
      const product = products.find((product) => product.name === productName);
      if (product !== undefined) {
        setProduct(product);
      }
    }
  }, [productName]);

  return (
    <>
      {product ? (
        <section>
          <div className={`${style.section}`}>
            <ProductDetails product={product} />
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
