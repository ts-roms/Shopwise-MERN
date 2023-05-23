import loadable from "@loadable/component";
import style from "../styles/style";
import { useAppSelector } from "../hooks";
const EventCard = loadable(
  () => import("../components/Events/EventCard/EventCard")
);

export default function EventsPage() {
  const { events } = useAppSelector((state) => state.events);

  return (
    <section className="mt-20">
      <div className={`${style.section}`}>
        <div className="grid gap-5">
          {events?.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
