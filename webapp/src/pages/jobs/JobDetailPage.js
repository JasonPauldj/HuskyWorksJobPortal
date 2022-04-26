import Navbar from "../../components/navbar/Navbar";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./JobDetailPage.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import JobsSection from "../../components/jobs/JobsSection";
import ReviewContainer from "../../components/orgs/ReviewContainer";

function JobDetailPage(props) {
  const [job, setJob] = useState(null);
  const [orgJobs, setOrgJobs] = useState([]);
  const [org_id, setOrgId] = useState(0);
  const nav = useNavigate();

  const params = useParams();
  const job_id = params.job_id;

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`http://localhost:9000/jobs/${job_id}`);
      setJob(response.data);
    };
    //   const data = await response.json();
    fetchJob();
  }, []);

  useEffect(() => {
    if (job) {
      const fetchOrgJobs = async () => {
        const response = await axios.get(
          `http://localhost:9000/jobs/?org_id=${job.organization_id}`
        );
        setOrgJobs(response.data);
      };
      //   const data = await response.json();
      fetchOrgJobs();
      setOrgId(job.organization_id);
    }
  }, [job]);

  const handleOrgClick = () => {
    nav(`/organizations/${job.organization_id}`);
  };

  const JobDetailCard = (props) => {
    return (
      <CardComponent className={classes.jobDetailCard}>
        <div>
          <div className={classes.orgSection}>
            <img
              className={classes.orgImg}
              src={require("../../assets/Barney.jpeg")}
            />
            <span onClick={handleOrgClick} style={{ cursor: "pointer" }}>
              {job.organizationName}
            </span>
          </div>
          <div className={classes.jobTitle}>{job.job_title}</div>
          <div className={classes.jobDetails}>
            {" "}
            <LocationOnIcon style={{ fontSize: "0.8rem" }} />{" "}
            {`${job.job_location} | ${job.job_type} | Pay ${job.job_salary}`}{" "}
          </div>
          <div className={classes.jobDeadline}>{`Apply By: ${new Date(
            job.job_deadline
          ).toLocaleDateString()}`}</div>
          <div className={classes.divider}></div>
          <div className={classes.jobDesc}>
            <section className={classes.sectionTitle}>Job Description</section>
            <section>{job.job_description}</section>
          </div>
          <div className={classes.jobResp}>
            <section className={classes.sectionTitle}>
              Job Responsibilities
            </section>
            <section>{job.job_responsibilities}</section>
          </div>
        </div>
      </CardComponent>
    );
  };

  return (
    <>
      <div className="prbg">
        <div className="flex-horizontal py-1">
          <div className="ly-1-3-1-bd-sec-left">
            <Navbar />
          </div>
          <div className="ly-1-3-1-bd-sec-right">
            <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
              <div className="ly-1-3-1-bd-sec-right-main">
                <div className={classes.mainContainer}>
                  {job && <JobDetailCard />}
                  <div className={classes.moreJobsTitle}>
                    More Jobs At this Organization
                  </div>
                  <div className={classes.jobsContainer}>
                    <JobsSection jobs={orgJobs} />
                  </div>
                </div>
              </div>
              <div className="ly-1-3-1-bd-sec-right-sidebar">
                <ReviewContainer key={org_id} organizationId={org_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetailPage;
