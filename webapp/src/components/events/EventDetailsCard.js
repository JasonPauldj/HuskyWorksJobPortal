import React, { useEffect, useRef, useState } from "react";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import "./EventDetailsCard.scss";
import Maps from "./Maps";
import { ClipLoader } from "react-spinners";

function EventDetailsCard(props) {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvent(props.event);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <CardComponent className="event-container">
      {loading === false ? (
        <div>
          <h3>{event.event_title}</h3>
          <h3>{event.event_organizer}</h3>
          <h3>{event.event_type}</h3>
          <h3>{event.event_description}</h3>
          <h3>{event.no_of_seats}</h3>
          <h3>{event.event_date}</h3>
          <Maps
            lat={props.event.event_location.latitude}
            lng={props.event.event_location.longitude}
          />
        </div>
      ) : (
        <ClipLoader size={120} />
      )}
    </CardComponent>
  );
}

export default EventDetailsCard;
