import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { host } from "../../../server";
import { ImageProps } from "../Carousel/Carousel";

export default function Slider({ images }: { images: ImageProps[] }) {
  const [slide, setSlide] = useState(0);

  function changeSlide(direction: string) {
    if (direction === "l") {
      setSlide(slide !== 0 ? slide - 1 : images.length - 1);
    }

    if (direction === "r") {
      setSlide(slide === images.length - 1 ? 0 : slide + 1);
    }
  }
  return (
    <div className="lg:hidden w-full relative overflow-x-hidden pt-22">
      <div
        className={`w-[${
          images.length * 100
        }vw] flex items-center justify-center transition-all duration-700 ease-in-out`}
        style={{
          width: `${images.length * 100}vw`,
          transform: `translateX(${-100 * slide}vw)`,
        }}
      >
        {images?.map((image) => (
          <div key={image.id} className="w-[100vw]">
            <img
              src={`${host}/${image.url}`}
              className="object-center"
              loading="lazy"
              alt={image.name}
            />
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <div
          onClick={() => changeSlide("l")}
          className="bg-white h-8 w-8 rounded-full flex justify-center items-center"
        >
          <GrFormPrevious />
        </div>
        <div
          onClick={() => changeSlide("r")}
          className="bg-white h-8 w-8 rounded-full flex justify-center items-center"
        >
          <GrFormNext />
        </div>
      </div>
    </div>
  );
}
