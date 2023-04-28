import { useState } from "react";
import { sliderItems } from "../../../constant/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Hero() {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="relative bg-white h-[80vh] overflow-hidden">
      <div className="flex justify-between w-full absolute top-1/2 -translate-y-2/4 z-40">
        <button
          className="bg-black rounded-tr opacity-40 rounded-br py-6 px-3 flex justify-center items-center"
          onClick={() => sliderRef?.slickPrev()}
        >
          <FaChevronLeft color="white" size={30} />
        </button>
        <button
          className="bg-black rounded-tl opacity-40 rounded-bl py-6 px-3 flex justify-center items-center"
          onClick={() => sliderRef?.slickNext()}
        >
          <FaChevronRight color="white" size={30} />
        </button>
      </div>
      <div className="h-full w-full">
        <Slider {...settings} className="w-full h-full" ref={setSliderRef}>
          {sliderItems?.map((i) => (
            <div key={i.id}>
              <img
                className="h-[80vh] w-full object-cover"
                alt=""
                src={i.img}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
