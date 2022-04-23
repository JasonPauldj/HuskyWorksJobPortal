import React from "react";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from "./OrgDetailsCard.module.scss";

function OrgDetailsCard(props) {
  return (
    <CardComponent className={classes.orgContainer}>
      <div>
        <div className={classes.orgHeader}>
          <img src={props.organizationLogo} className={classes.orgLogo} />
          <h3 className={classes.orgName}>{props.organizationName}</h3>
        </div>
        <h2 className={classes.orgAboutus}>About Us:</h2>
        <p className={classes.orgAboutus}>{props.aboutUs}</p>
        <h3>{props.sponsorship}</h3>
      </div>
    </CardComponent>
  );
}

export default OrgDetailsCard;
