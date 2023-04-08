import style from "../../styles/style";
import productData from "../../constant/product.json";
import Product from "../Product/Product";

export default function FeaturedProducts() {
  return (
    <section>
      <div className={`${style.section}`}>
        <h1 className={`${style.heading}`}>Featured Products</h1>
        {productData && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
            {productData?.map((product, idx) => (
              <Product key={idx} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
