import axios from "axios";
import React, { useEffect, useState } from "react";
import EventsSection from "../events/EventsSection";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import JobsSection from "../jobs/JobsSection";
import classes from "./OrgDetailsCard.module.scss";

function OrgDetailsCard(props) {
  const [orgJobs, setOrgJobs] = useState([]);
  const [orgEvents, setOrgEvents] = useState([]);

  console.log(props.organization._id);

  useEffect(() => {
    const fetchOrgJobs = async () => {
      const res = await axios.get(
        `http://localhost:9000/jobs/?org_id=${props.organization._id}`
      );
      setOrgJobs(res.data);
    };

    fetchOrgJobs();
  }, []);

  useEffect(() => {
    const fetchOrgEvents = async () => {
      const res = await axios({
        method: "GET",
        url: `http://localhost:9000/events/?org_id=${props.organization._id}`,
        maxContentLength: 1,
      });
      setOrgEvents(res.data);
    };

    fetchOrgEvents();
  }, []);

  return (
    <CardComponent className={classes.mainContainer}>
      <div>
        <div className={classes.orgHeader}>
          <img
            src={props.organization.organizationLogo}
            className={classes.orgLogo}
          />
          <h3 className={classes.orgName}>
            {props.organization.organizationName}
          </h3>
        </div>
        <h2 className={classes.orgAboutus}>About Us:</h2>
        <p className={classes.orgAboutus}>{props.organization.aboutUs}</p>
        <h3>{props.organization.sponsorship}</h3>
      </div>

      <CardComponent>
        <div className={classes.moreTitle}>
          {`More Jobs at ${props.organization.organizationName}`}
        </div>
        <div className={classes.jobsContainer}>
          <JobsSection jobs={orgJobs} />
        </div>
      </CardComponent>
      <CardComponent style={{ margin: "1rem 1rem" }}>
        <div className={classes.moreTitle}>
          {`More Events at ${props.organization.organizationName}`}
        </div>
        <div className={classes.jobsContainer}>
          <EventsSection events={orgEvents} />
        </div>
      </CardComponent>
    </CardComponent>
  );
}

export default OrgDetailsCard;
