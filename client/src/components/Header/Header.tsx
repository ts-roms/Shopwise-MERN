import { Link } from "react-router-dom";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import style from "../../styles/style";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import productData from "../../constant/product.json";
import Dropdown from "../Dropdown/Dropdown";
import Navbar from "../Navbar/Navbar";
import UserNavigation from "../UserNavigation/UserNavigation";

type Product = {
  id: number;
  name: string;
  image_Url: { public_id: string; url: string }[];
};

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProduct, setSearchedProduct] = useState<Product[]>([]);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchQuery(e.target.value);

    const filteredProduct = productData.filter((product) =>
      product.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    setSearchedProduct(filteredProduct);
  }

  console.log(searchedProduct);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSearchedProduct([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div
        className={`${style.flex_normal} ${style.section} py-7  justify-between`}
      >
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
                ref={ref}
              />
              <AiOutlineSearch
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                size={25}
                color="orange"
              />
              {searchedProduct.length !== 0 ? (
                <div className="absolute bg-slate-50 shadow-sm z-50 max-h-[60vh] overflow-scroll mt-4 rounded-md py-2">
                  {searchedProduct.map((product, idx) => {
                    const productSlug = product.name.replace(/\s+/g, "-");
                    return (
                      <Link to={`/products/${productSlug}`} key={idx}>
                        <div
                          className={`w-full cursor-pointer transition-all hover:bg-[#ff7d1a] hover:text-white`}
                        >
                          <div className={`px-6 py-2 ${style.flex_normal}`}>
                            <img
                              className="w-11 h-10 mr-8"
                              src={product.image_Url[0].url}
                            />
                            <h1>{product.name}</h1>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <Link to="/seller">
            <button className={`${style.button} text-white`}>
              Become Seller <IoIosArrowForward className="ml-1" />
            </button>
          </Link>
        </div>
      </div>

      <div className="sticky top-0 shadow-sm z-10 transition-all hidden lg:flex items-center justify-between h-[70px] w-full bg-[#ff7d1a]">
        <div className={` ${style.section}`}>
          <div className={`relative ${style.flex_normal} justify-between `}>
            <Dropdown />
            <Navbar />
            <UserNavigation />
          </div>
        </div>
      </div>
    </>
  );
}
