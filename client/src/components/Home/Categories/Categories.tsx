import style from "../../../styles/style";
import categoriesData from "../../../constant/categories.json";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../Interface";

export default function Categories() {
  const navigate = useNavigate();

  function handleSubmit(category: ICategory) {
    navigate(`products?category=${category.title}`);
    window.location.reload();
  }

  return (
    <section>
      <div className={`${style.section}`}>
        <h1 className={`${style.heading}`}>Shop on Different Categories:</h1>
        <div className="grid grid-cols-1 mt-8 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-8">
          {categoriesData &&
            categoriesData?.map((category, idx) => (
              <div
                key={idx}
                onClick={() => handleSubmit(category)}
                className={`bg-white rounded-md ${style.flex_normal} flex-col shadow p-4 cursor-pointer hover:scale-105 transition-all duration-300`}
              >
                <div className="h-32 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    loading="lazy"
                    src={category.image_Url}
                    alt={category.title}
                  />
                </div>
                <p className="mt-4 text-gray-800">{category.title}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
