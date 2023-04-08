import { useState, useEffect } from "react";
import productsData from "../../constant/product.json";
import style from "../../styles/style";
import Product from "../Product/Product";

export interface IProduct {
  id: number;
  category?: string;
  name: string;
  description: string;
  price: number;
  image_Url: { public_id: string; url: string }[];
  shop: {
    name: string;
    shop_avatar: {
      public_id: string;
      url: string;
    };
    ratings: number;
  };
  reviews?: { user: {}; comment: string; rating: number }[];
  rating: number;
  total_sell: number;
  discount_price: number;
}

export default function BeastDeals() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const bestDealProducts = productsData?.sort(
      (a, b) => b.total_sell - a.total_sell
    );
    setProducts(bestDealProducts.slice(0, 5));
  }, []);

  return (
    <section>
      <div className={`${style.section} text-`}>
        <h1 className={`${style.heading}`}>
          Best Deals on different products:
        </h1>
        {products && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
            {products?.map((product) => (
              <Product product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
