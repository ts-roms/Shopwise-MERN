import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import logo from "../../assets/logo.png";
import style from "../../styles/style";
import { AiOutlineSearch } from "react-icons/ai";
import productData from "../../constant/product.json";

type Product = {
  id: number;
  name: string;
  image_Url: { public_id: string; url: string }[];
};

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProduct, setSearchedProduct] = useState<Product[]>([]);

  console.log(productData);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchQuery(e.target.value);

    const filteredProduct = productData.filter((product) =>
      product.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    setSearchedProduct(filteredProduct);
  }

  return (
    <div className={`${style.flex_normal} px-11 py-7  justify-between`}>
      <div>
        <Link to="/" className={`${style.flex_normal}`}>
          <img className="h-10 w-20" src={logo} alt="Logo" />
          <span>Shopwise</span>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Seach Product"
              value={searchQuery}
              className={`${style.input} border-[#ff7d1a] h-11 px-2 w-full`}
              onChange={handleChange}
            />
            <AiOutlineSearch
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              size={25}
              color="orange"
            />
            {searchedProduct && searchedProduct.length !== 0 ? (
              <div className="absolute min-h-30vh bg-slate-50 shadow-sm z-90 p-4">
                {searchedProduct.map((product) => {
                  const productSlug = product.name.replace(/\s+/g, "-");
                  return (
                    <Link to={`/products/${productSlug}`} key={product.id}>
                      <div className={`${style.flex_normal} py-3 w-full`}>
                        <img
                          className="w-11 h-10 mr-8"
                          src={product.image_Url[0].url}
                        />
                        <h1>{product.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
