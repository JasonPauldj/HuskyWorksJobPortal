import React from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from "./EventCard.module.scss";
function EventCard(props) {
  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/events/${props.event._id}`);
  };

  const handleApplyButtonOnClick = (event) => {
    event.stopPropagation();
    props.handleApplyButtonOnClick(props.event);
  };

  return (
    <CardComponent
      className={`wt-30-percent ${classes.eventCard}`}
      onClick={handleCardOnClick}
    >
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
        {`${props.event.event_type} | Seats ${props.event.no_of_seats}`}
      </div>
      <div className={classes.eventDate}>{`Apply By: ${new Date(
        props.event.event_date
      ).toLocaleDateString()}`}</div>
      <div className={classes.divider}></div>
      {!props.isRegistered && (
        <div className={classes.apply} data-tip="" data-for="cardTooltip">
          <button
            className={classes.btn_apply}
            onClick={handleApplyButtonOnClick}
          >
            Register
          </button>
          <ReactTooltip id="cardTooltip" type="info">
            <span>Click to register for this event</span>
          </ReactTooltip>
        </div>
      )}

      {props.isRegistered && (
        <p className={classes.apply}>Registered</p>
      )}
    </CardComponent>
  );
}

export default EventCard;
