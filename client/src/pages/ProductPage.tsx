import loadable from "@loadable/component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../constant/product.json";
const ProductDetails = loadable(
  () => import("../components/ProductDetails/ProductDetails")
);
import { IProduct } from "../Interface";
import Loader from "../components/Loader/Loader";
import style from "../styles/style";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/ProductDetails/RelatedProducts/RelatedProducts";
import { useAppSelector } from "../hooks";
import { host } from "../server";

export default function ProductPage() {
  const { product_slug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { allProducts } = useAppSelector((state) => state.allProducts);
  const productName = product_slug?.replace(/-/g, " ");

  useEffect(() => {
    if (productName) {
      const product = [...allProducts]?.find(
        (product) => product.name === productName
      );
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
            <ProductDetailsInfo product={product} />
            {product && <RelatedProducts product={product} />}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

const ProductDetailsInfo = ({ product }: { product: IProduct }) => {
  const [activeTab, setActiveTab] = useState("productDetails");
  console.log(product);
  const { images, name, description, shop } = product;

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="bg-white lg:px-10 rounded my-16 px-3 py-6">
      <div className="w-full flex justify-between border-b py-4">
        <h4
          className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-xl relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
            activeTab === "productDetails" ? "after:w-full" : "after:w-0"
          }`}
          onClick={() => handleTabClick("productDetails")}
        >
          Products Details
        </h4>
        <h4
          className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-xl relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
            activeTab === "reviews" ? "after:w-full" : "after:w-0"
          }`}
          onClick={() => handleTabClick("reviews")}
        >
          Products Reviews
        </h4>
        <h4
          className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-xl relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
            activeTab === "seller" ? "after:w-full" : "after:w-0"
          }`}
          onClick={() => handleTabClick("seller")}
        >
          Seller Information
        </h4>
      </div>
      {activeTab === "productDetails" && (
        <div className="space-y-6 lg:space-y-10 px-4 lg:px-8 py-5">
          <p className="text-base lg:text-lg whitespace-pre-line">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
            quos dolor, assumenda tempore optio laboriosam saepe porro quaerat
            magni fuga iure ducimus, dignissimos exercitationem dicta quisquam
            nulla sint. Consequatur, atque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Illum animi ut labore eaque, fugiat
            vitae adipisci officia modi. Facere dolorum, natus in eligendi iure
            cumque repellendus illo aut cum quis.
          </p>
          <p className="text-base lg:text-lg whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam odio
            error aut incidunt fuga voluptatibus accusantium earum cupiditate
            quidem optio, fugit voluptas, in molestias dignissimos asperiores
            deleniti! Alias, laborum ut?
          </p>
          <p className="text-base lg:text-lg whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam odio
            error aut incidunt fuga voluptatibus accusantium earum cupiditate
            quidem optio, fugit voluptas, in molestias dignissimos asperiores
            deleniti! Alias, laborum ut? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Ad, expedita voluptatum a ipsum eos delectus alias
            reprehenderit voluptates eligendi placeat blanditiis aliquid dolorem
            dolor commodi, consequuntur ut! Suscipit necessitatibus id, unde
            delectus fugiat provident.
          </p>
        </div>
      )}
      {activeTab === "reviews" && (
        <div className="flex justify-center items-center h-[40vh]">
          <p>No review yet</p>
        </div>
      )}
      {activeTab === "seller" && (
        <div className="w-full p-5 lg:flex">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className={`${style.flex_normal} gap-3`}>
              <img
                className="h-12 w-12 rounded-full"
                src={`${host}/${shop.avatar}`}
                alt=""
              />
              <div>
                <h4 className={`${style.shop_name} text-xl`}>{shop.name}</h4>
                {/* <h4>{shop.ratings} Ratings</h4> */}
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              laborum, eos voluptates odit architecto suscipit deserunt rerum
              dolorem eum, quas vel temporibus, eius cupiditate? Sunt deleniti
              quisquam incidunt architecto veniam?
            </p>
          </div>
          <div className="w-full lg:w-1/2 lg:flex flex-col items-end">
            <div className="text-left space-y-2">
              <h4 className="font-medium">
                Joined on :{" "}
                <span>{new Date(shop.createdAt).toLocaleDateString()}</span>
              </h4>
              <h4 className="font-medium">
                Total Products : <span>123</span>
              </h4>
              <h4 className="font-medium">
                Total Reviews : <span>23</span>
              </h4>
              <Link className="inline-block" to="/shop">
                <button className={` ${style.button} text-white `}>
                  Visit Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
