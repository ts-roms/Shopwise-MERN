import EventCard from "../components/EventCard/EventCard";
import style from "../styles/style";

export default function EventsPage() {
  window.scroll(0, 0);
  return (
    <section>
      <div className={`${style.section}`}>
        <EventCard />
      </div>
    </section>
  );
}
