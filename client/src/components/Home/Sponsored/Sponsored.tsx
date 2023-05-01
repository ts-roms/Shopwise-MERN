import style from "../../../styles/style";
import apple from "../../../assets/apple.png";
import sony from "../../../assets/sony.png";
import microsoft from "../../../assets/microsoft.png";
import dell from "../../../assets/dell.png";
import samsung from "../../../assets/samsung.png";

export default function Sponsored() {
  const sponsors = [apple, sony, microsoft, dell, samsung];

  return (
    <section>
      <div
        className={`${style.section} bg-white py-8 px-5 my-12 cursor-pointer rounded-md shadow-md`}
      >
        <div className="flex justify-center md:justify-between flex-wrap gap-5 w-full items-center">
          {sponsors?.map((sponsor, idx) => (
            <div key={idx}>
              <img
                loading="lazy"
                src={sponsor}
                className="w-40 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
