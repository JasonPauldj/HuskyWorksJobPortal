import React from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../genericComponent/genericCard/CardComponent";

function EventCard(props) {
  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/events/${props.event_id}`);
  };

  return (
    <CardComponent className="wt-90-percent" onClick={handleCardOnClick}>
      <div>
        <h3>{props.event_title}</h3>
        <h4>{props.event_type}</h4>
        <h5>{props.event_date}</h5>
      </div>
    </CardComponent>
  );
}

export default EventCard;
