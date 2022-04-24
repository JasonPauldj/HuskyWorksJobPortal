import { useEffect, useState } from "react";
import EventCard from "./EventCard";

function EventsSection(props) {
  const [events, setEvent] = useState(props.events);

  useEffect(() => {
    setEvent(props.events);
  }, [props]);

  const eventCards = events.map((event) => {
    return <EventCard key={event._id} event={event} />;
  });

  return <>{eventCards}</>;
}

export default EventsSection;
