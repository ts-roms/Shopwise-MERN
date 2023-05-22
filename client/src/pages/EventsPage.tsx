import loadable from "@loadable/component";
import style from "../styles/style";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
const EventCard = loadable(
  () => import("../components/Events/EventCard/EventCard")
);

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);
  return (
    <section className="mt-20">
      <div className={`${style.section}`}>
        {allEvents?.map((event) => (
          <EventCard />
        ))}
      </div>
    </section>
  );
}
