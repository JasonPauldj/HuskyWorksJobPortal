import React from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from "./EventCard.module.scss";
function EventCard(props) {
  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/events/${props.event_id}`);
  };

  return (
    <CardComponent
      className={`wt-30-percent ${classes.eventCard}`}
      onClick={handleCardOnClick}
    >
      <div>
        <div className={classes.orgSection}>
          <img
            className={classes.orgImg}
            src={require("../../assets/Barney.jpeg")}
          />
          <span className={classes.orgName}>{props.event.event_organizer}</span>
        </div>
        <div
          className={classes.eventDesc}
        >{`${props.event.event_organizer} is looking for a ${props.event.event_title}`}</div>
        <div className={classes.eventDetails}>
          {" "}
          {`${props.event.event_type} | Pay ${props.event.no_of_seats}`}{" "}
        </div>
        <div className={classes.eventDate}>{`Apply By: ${new Date(
          props.event.event_date
        ).toLocaleDateString()}`}</div>
        <div className={classes.divider}></div>
        <div className={classes.apply}>
          <button className={classes.btn_apply}>Apply</button>
        </div>
      </div>
    </CardComponent>
  );
}

export default EventCard;
