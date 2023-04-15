import { formattedPrice } from "../../helper/formatPrice";
import style from "../../styles/style";
import Countdown from "../CountDown/Countdown";

export default function EventCard() {
  return (
    <div className="w-full bg-white rounded-lg flex flex-col gap-6 p-6">
      <div className="w-full lg:w-1/2 mx-auto">
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          loading="lazy"
          alt=""
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
        <h4 className={`${style.productTitle}`}>Iphone 14 Pro Max 8/256gb</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit quos
          veniam libero aliquam! Est qui, soluta maiores praesentium eveniet
          minus voluptatum ipsa ratione beatae nisi hic, exercitationem modi
          aliquam expedita! Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Labore aspernatur recusandae quod asperiores nobis id architecto
          nam.
        </p>
        <div className="flex justify-between flex-wrap gap-5 items-center">
          <div className={`${style.flex_normal} gap-5`}>
            <h4 className="line-through text-gray-400 font-medium">
              {formattedPrice(12999999)}
            </h4>
            <h4 className="font-bold text-xl text-green-600">
              {formattedPrice(7999999)}
            </h4>
          </div>
          <span className="text-sky-400 text-lg">276 solds</span>
        </div>
        <div>
          <Countdown />
        </div>
      </div>
    </div>
  );
}
