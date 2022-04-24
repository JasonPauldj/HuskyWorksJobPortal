import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsSection from "../../components/events/EventsSection";
import JobsSection from "../../components/jobs/JobsSection";
import Navbar from "../../components/navbar/Navbar";
import OrgDetailsCard from "../../components/orgs/OrgDetailsCard";
import ReviewContainer from "../../components/orgs/ReviewContainer";
import classes from "./OrgDetailsPage.module.scss";

function OrgDetailsPage() {
  const [org, setOrg] = useState({});
  const [orgJobs, setOrgJobs] = useState([]);
  const [orgEvents, setOrgEvents] = useState([]);
  const params = useParams();
  const org_id = params.org_id;

  useEffect(() => {
    const fetchOrg = async () => {
      const res = await axios.get(
        `http://localhost:9000/organizations/${org_id}`
      );
      setOrg(res.data);
    };

    fetchOrg();
  }, []);

  useEffect(() => {
    const fetchOrgJobs = async () => {
      const res = await axios.get(
        `http://localhost:9000/jobs/?org_id=${org_id}`
      );
      setOrgJobs(res.data);
    };

    fetchOrgJobs();
  }, []);

  useEffect(() => {
    const fetchOrgEvents = async () => {
      const res = await axios.get(
        `http://localhost:9000/events/?org_id=${org_id}`
      );
      setOrgEvents(res.data);
    };

    fetchOrgEvents();
  }, []);

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-3-1-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-3-1-bd-sec-right">
          <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
            <div className="ly-1-3-1-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              <div className={classes.mainContainer}>
                {org && (
                  <OrgDetailsCard
                    key={org_id}
                    organizationName={org.organizationName}
                    organizationLogo={org.organizationLogo}
                    aboutUs={org.aboutUs}
                    sponsorship={org.sponsorship}
                  />
                )}
              </div>
              <div className={classes.moreTitle}>
                {`More Jobs at ${org.organizationName}`}
              </div>
              <div className={classes.jobsContainer}>
                <JobsSection jobs={orgJobs} />
              </div>
              <div className={classes.moreTitle}>
                {`More Events at ${org.organizationName}`}
              </div>
              <div className={classes.jobsContainer}>
                <EventsSection events={orgEvents} />
              </div>
            </div>
            <div className="ly-1-3-1-bd-sec-right-sidebar">
              {/*HERE IS WHERE YOUR RIGHT CONTENT SHOULD GO*/}
              <ReviewContainer key={org_id} organizationId={org_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgDetailsPage;
