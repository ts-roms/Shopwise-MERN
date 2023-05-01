import loadable from "@loadable/component";
import style from "../../styles/style";
const EventCard = loadable(() => import("./EventCard/EventCard"));

export default function Events() {
  return (
    <section className="">
      <div className={`${style.section}`}>
        <h1 className={`${style.heading}`}>Popular Events</h1>
        <div className="bg-white w-full">
          <EventCard />
        </div>
      </div>
    </section>
  );
}
