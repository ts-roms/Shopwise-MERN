import loadable from "@loadable/component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { sliderItems } from "../../../constant/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";

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
    <section className="relative mt-20 md:m-0 bg-white overflow-hidden">
      <div className="flex justify-between w-full absolute top-1/2 -translate-y-2/4 z-40">
        <button
          className="bg-black rounded-tr opacity-40 rounded-br text-xl lg:text-3xl py-3 px-1.5 lg:py-6 lg:px-3 flex justify-center items-center"
          onClick={() => sliderRef?.slickPrev()}
        >
          <FaChevronLeft color="white" />
        </button>
        <button
          className="bg-black rounded-tl opacity-40 rounded-bl text-xl lg:text-3xl py-3 px-1.5 lg:py-6 lg:px-3 flex justify-center items-center"
          onClick={() => sliderRef?.slickNext()}
        >
          <FaChevronRight color="white" />
        </button>
      </div>
      <Slider {...settings} className="w-full h-full" ref={setSliderRef}>
        {sliderItems?.map((i) => (
          <div key={i.id}>
            <img
              className="lg:h-[80vh] w-full md:object-cover"
              loading="lazy"
              src={i.img}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
