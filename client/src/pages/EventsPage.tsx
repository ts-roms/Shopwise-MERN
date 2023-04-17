import EventCard from "../components/Events/EventCard/EventCard";
import style from "../styles/style";

export default function EventsPage() {
  window.scroll(0, 0);
  return (
    <section className="mt-20">
      <div className={`${style.section}`}>
        <EventCard />
      </div>
    </section>
  );
}
