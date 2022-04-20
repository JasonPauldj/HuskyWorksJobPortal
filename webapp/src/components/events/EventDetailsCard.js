import React, { useEffect, useRef, useState } from "react";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import "./EventDetailsCard.scss";
import Maps from "./Maps";

function EventDetailsCard(props) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    setLat(props.eventLocation.latitude);
    setLng(props.eventLocation.longitude);
  });
  return (
    <CardComponent className="event-container">
      <div>
        <h3>{props.eventTitle}</h3>
        <h3>{props.eventOrganizer}</h3>
        <h3>{props.eventType}</h3>
        <h3>{props.eventDesc}</h3>
        <h3>{props.eventSeats}</h3>
        <h3>{props.eventDate}</h3>
        {/* <h3>{props.eventLocation.latitude.toString()}</h3>
        <h3>{props.eventLocation.longitude.toString()}</h3> */}

        <Maps lat={lat} lng={lng} />
      </div>
    </CardComponent>
  );
}

export default EventDetailsCard;
