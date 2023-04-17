import style from "../../../styles/style";

export default function Hero() {
  return (
    <section>
      <div
        className={`${style.flex_normal} min-h-[80vh] relative w-full bg-no-repeat`}
        style={{
          backgroundImage:
            "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        }}
      >
        <div className={`${style.section} w-11/12 lg:w-3/5`}>
          <h1 className="text-4xl text-gray-700 font-semibold capitalize">
            Get best product for <br />
            home essential
          </h1>
          <p className="pt-5 font-Poppins">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est autem
            pariatur quae deleniti illum eos unde qui! Recusandae pariatur
            necessitatibus incidunt eligendi obcaecati laboriosam veritatis sunt
            eum sed, illo ad earum impedit! Velit consequuntur enim unde,
            reiciendis vitae aut adipisci, culpa aperiam sed perspiciatis
            veniam.
          </p>
        </div>
      </div>
    </section>
  );
}
