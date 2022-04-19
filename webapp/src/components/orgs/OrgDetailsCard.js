import React from "react";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import "./OrgDetailsCard.scss";

function OrgDetailsCard(props) {
  return (
    <CardComponent className="org-container">
      <div>
        <div className="org-header">
          <img src={props.organizationLogo} className="org-logo" />
          <h3 className="org-name">{props.organizationName}</h3>
        </div>
        <h2 className="org-aboutus">About Us:</h2>
        <p className="org-aboutus">{props.aboutUs}</p>
        <h3>{props.sponsorship}</h3>
      </div>
    </CardComponent>
  );
}

export default OrgDetailsCard;
