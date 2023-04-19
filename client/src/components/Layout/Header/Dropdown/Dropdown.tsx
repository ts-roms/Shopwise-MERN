import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useRef, MouseEvent } from "react";
import style from "../../../../styles/style";
import categories from "../../../../constant/categories.json";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../../Interface";

export default function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(e: any) {
    setIsDropdownOpen((prev) => !prev);
  }

  function handleSubmit(category: ICategory) {
    navigate(`/products?category=${category.title}`);
    setIsDropdownOpen((prev) => !prev);
    window.location.reload();
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div onClick={handleClick} ref={ref}>
      <div className="relative h-[60px] w-[270px] hidden lg:block">
        <BiMenuAltLeft
          size={30}
          className="absolute left-2 top-1/2 -translate-y-1/2"
        />
        <button
          className={`font-medium w-full h-full mt-[10px] text-[17px] bg-white ${style.flex_normal} justify-between pl-10 rounded-t-md`}
        >
          All Categories
        </button>
        <IoIosArrowDown
          size={20}
          className="absolute top-1/2 -translate-y-1/2 right-2"
          color={isDropdownOpen ? "orange" : "black"}
        />

        {isDropdownOpen ? (
          <div className="w-full bg-[#fff] absolute rounded-b-md shadow-sm z-30 max-h-[60vh] overflow-scroll">
            {categories &&
              categories?.map((category, idx) => (
                <div
                  className={`${style.flex_normal} cursor-pointer transition-all hover:bg-[#ff7d1a] hover:text-white`}
                  onClick={() => handleSubmit(category)}
                  key={idx}
                >
                  <div className={`${style.flex_normal} py-1.5 px-2.5`}>
                    <img
                      src={category.image_Url}
                      className="h-7 w-7 object-contain mr-2.5 select-none"
                      loading="lazy"
                      alt={category.title}
                    />
                    <p className="m-3 select-none text-sm">{category.title}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
