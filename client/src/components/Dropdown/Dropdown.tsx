import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import style from "../../styles/style";
import categories from "../../constant/categories.json";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  subTitle: string;
  title: string;
  image_Url: string;
}

export default function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick(e: any) {
    setIsDropdownOpen((prev) => !prev);
  }

  function handleSubmit(category: Category) {
    navigate(`products?category=${category.title}`);
    setIsDropdownOpen((prev) => !prev);
    window.location.reload();
  }

  return (
    <div>
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
          onClick={handleClick}
          color={isDropdownOpen ? "orange" : "black"}
        />

        {isDropdownOpen ? (
          <div className="w-full bg-[#fff] absolute rounded-b-md shadow-sm z-30">
            {categories &&
              categories.map((category) => (
                <div
                  className={`${style.flex_normal} cursor-pointer transition-all hover:bg-[#ff7d1a] hover:text-white`}
                  onClick={() => handleSubmit(category)}
                  key={category.id}
                >
                  <div className={`${style.flex_normal} py-1.5 px-2.5`}>
                    <img
                      src={category.image_Url}
                      className="h-7 w-7 object-contain mr-2.5 select-none"
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
