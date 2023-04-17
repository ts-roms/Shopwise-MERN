import { Link } from "react-router-dom";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import logo from "../../../assets/logo.png";
import style from "../../../styles/style";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import productData from "../../../constant/product.json";
import Dropdown from "./Dropdown/Dropdown";
import Navbar from "./Navbar/Navbar";
import UserNavigation from "./UserNavigation/UserNavigation";
import { useSelector } from "react-redux";
import { IAppState, IProduct } from "../../../Interface";
import Cart from "../../Cart/Cart";
import Wishlist from "../../Wishlist/Wishlist";
import { host } from "../../../server";

// interface IProduct {
//   id: number;
//   name: string;
//   image_Url: { public_id: string; url: string }[];
// }

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProduct, setSearchedProduct] = useState<IProduct[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const userState = useSelector((state: IAppState) => state?.user);

  const user = userState?.user;

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setSearchQuery(e.target.value);

    const filteredProduct = productData.filter((product: IProduct) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchedProduct(filteredProduct);
  }

  function toggleCart(): void {
    setIsCartOpen((prev: boolean) => !prev);
  }

  function toggleWishlist(): void {
    setIsWishlistOpen((prev: boolean) => !prev);
  }

  function toggleMobileNav() {
    setIsMobileOpen(!isMobileOpen);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        const isLink = (event.target as HTMLElement).closest("a");

        // if the clicked element is a link, return without clearing the state
        if (isLink) {
          return;
        }
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
      <header className="hidden lg:block">
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
                                loading="lazy"
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
            <Link to="/create-shop">
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
              <Navbar mobile={false} toggleMobileNav={toggleMobileNav} />
              <UserNavigation
                userState={userState}
                toggleCart={toggleCart}
                toggleWishlist={toggleWishlist}
              />
            </div>
          </div>
        </div>
        {/* cart model */}
        <Cart toggleCart={toggleCart} isCartOpen={isCartOpen} />
        {/* wishlist model */}
        <Wishlist
          toggleWishlist={toggleWishlist}
          isWishlistOpen={isWishlistOpen}
        />
      </header>

      {/* mobile header  */}
      <header className="w-full fixed top-0 z-50 bg-white shadow left-0 lg:hidden">
        <div className={`${style.section} py-5`}>
          <div className={`${style.flex_normal} justify-between`}>
            <div className="cursor-pointer" onClick={toggleMobileNav}>
              <CgMenuLeft size={30} title="Menu" />
            </div>
            <div>
              <Link className={`${style.flex_normal}`} to="/">
                <img src={logo} alt="Company logo" className="h-8 w-12" />
                <span>Shopwise</span>
              </Link>
            </div>
            <div className="relative cursor-pointer">
              <AiOutlineShoppingCart
                className="hover:fill-gray-800 transition-all"
                size={30}
                onClick={toggleCart}
              />
              <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
                0
              </span>
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 min-h-screen left-0 shadow-md transition-all duration-300 w-3/4 bg-white z-20 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="border-b py-5 px-4  justify-between flex items-center"
            onClick={toggleMobileNav}
          >
            <RiCloseLine size={30} title="Close Menu" />
            <h4 className="flex-1 text-center">Menu</h4>
            <div className="relative cursor-pointer ">
              <AiOutlineHeart
                size={30}
                className="hover:fill-gray-800 transition-all"
                onClick={toggleWishlist}
              />
              <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
                0
              </span>
            </div>
          </div>
          <div className="py-5 px-4 space-y-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Seach Product"
                value={searchQuery}
                className={`${style.input} border-[#ff7d1a] h-9 px-2 w-full`}
                onChange={handleChange}
                ref={ref}
              />
              <AiOutlineSearch
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                size={25}
                color="orange"
              />
              {searchedProduct.length !== 0 ? (
                <div className="absolute bg-slate-50 shadow-sm z-50 max-h-[73vh] overflow-scroll mt-4 rounded-md py-2">
                  {searchedProduct.map((product, idx) => {
                    const productSlug = product.name.replace(/\s+/g, "-");
                    return (
                      <Link
                        to={`/products/${productSlug}`}
                        onClick={toggleMobileNav}
                        key={idx}
                      >
                        <div
                          className={`w-full cursor-pointer transition-all hover:bg-[#ff7d1a] hover:text-white`}
                        >
                          <div className={`px-3 py-2 ${style.flex_normal}`}>
                            <img
                              className="w-11 h-10 mr-8"
                              loading="lazy"
                              src={product.image_Url[0].url}
                            />
                            <h4 className="text-sm">
                              {product.name.slice(0, 30)}...
                            </h4>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div className="pl-4">
              <Navbar mobile={true} toggleMobileNav={toggleMobileNav} />
            </div>
            <div>
              <Link to="/create-shop">
                <button className={`${style.button} text-white`}>
                  Become Seller <IoIosArrowForward className="ml-1" />
                </button>
              </Link>
            </div>
            {!userState.isUserAuthenticate ? (
              <div className={`${style.flex_normal} gap-4`}>
                <Link to="/login" className="text-lg text-gray-600">
                  Login
                </Link>
                /
                <Link to="/signup" className="text-lg text-gray-600">
                  Signup
                </Link>
              </div>
            ) : (
              <Link
                to="/profile"
                onClick={toggleMobileNav}
                className="flex items-center gap-3 p-2 border text-gray-700 hover:text-gray-900  focus:text-gray-900 border-gray-300 transition-all rounded hover:border-gray-500 focus:border-gray-500"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={`${host}/${userState?.user?.avatar}`}
                  alt=""
                />
                <span>{userState?.user?.name}</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
