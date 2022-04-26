import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import classes from "../jobs/JobsPage.module.scss";
import JobCard from "../../components/jobs/JobCard";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "../../utilities/AuthService";
import { authActions } from "../../store/auth_slice";
import EventCard from "../../components/events/EventCard";
import "./StudentDashboard.scss";


function RecruiterDashboard() {
    let recruiter = useSelector(state => state.auth.user);
    console.log(recruiter, "recruiter");
    console.log(recruiter.organizationId, "org");

  const [jobs, setJobs] = useState([]);
  const [jobsPosted, setJobsPosted] = useState([]);
  const [orgPosting, setOrgPosting] = useState([]);
  const [eventsPosted, setEventsPosted] = useState({});
  const dispatch = useDispatch();

  const checkUser = () => {
    if (recruiter.length == 0) {
      recruiter = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchJobsPosted = async () => {
      const response = await axios.get("http://localhost:9000/jobs");
      setJobs(response.data);
      let jobs = response.data;
      const jobsPostedByrecruiter = response.data.filter(
        (job) => job.recruiterId === recruiter._id
      );
      setJobsPosted(jobsPostedByrecruiter);
      console.log(" jobs posted", jobsPosted);

      const organizationPosting = jobs.filter(
        (job) => job.organization_id === recruiter.organizationId
      );
      setOrgPosting(organizationPosting);
      console.log("Org jobs: ", orgPosting);
    };
    fetchJobsPosted();
  }, []);

  useEffect(() => {
    const fetchEventsPosted = async () => {
        const response = await axios.get('http://localhost:9000/events');
        console.log(response.data, "check events")
        // setEvents(response.data);
        console.log(recruiter._id, "recruiter Id");

        response.data.map((d)=> console.log(d.recruiterId, "recids"));
        const eventsPostedByrecruiter = response.data.filter((event) => event.recruiterId === recruiter._id);
        setEventsPosted(eventsPostedByrecruiter);
        console.log(" events posted", eventsPostedByrecruiter);
    }
    fetchEventsPosted(); 
}, [])


  const jobsPostedCards = jobsPosted.map((job) => {
    return (
      <JobCard
        key={job._id}
        job={job}
        job_id={job._id}
        isRecruiter={true}
      />
    );
  });

  const orgPostingCards = orgPosting.map((job) => {
    return (
      <JobCard
        key={job._id}
        job={job}
        job_id={job._id}
        isRecruiter={true}
        // job_title={job.job_title}
        // job_type={job.job_type}
        // job_deadline={new Date(job.job_deadline).toLocaleDateString()}
        // org
      />
    );
  });

  // const eventsPostedByRecruiter = eventsPosted.map((event) => {
  //   return <EventCard key={event._id} event={event} />;
  // });
  


  // const eventsPostedByRecruiter = eventsPosted.map((event) => {
  //   return <EventCard key={event._id} event={event} />;
  // });

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-4-bd-sec-left">
          <Navbar />
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/* APPS */}
              <div className="applications-section-header">
                <p className="heading">Jobs </p>
              </div>
              {/* <div class="h_line"></div> */}

              <div className={classes.jobsContainer}>{jobsPostedCards}</div>
              <div className="view-more">
                {/* <button onClick={viewMoreApplications}>View More</button> */}
              </div>
              {/* <div className={classes.jobsContainer}>{jobCards}</div> */}

              {/* EVENTS */}
              <div className="applications-section-header">
                <p className="heading">Organization Jobs</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div className={classes.jobsContainer}>{orgPostingCards}</div>
              <div className="view-more">
                {/* <button onClick={viewMoreEvents}>View More</button> */}
              </div>
              {/* RECOS */}

              <div className="applications-section-header">
                <p className="heading">Events</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div>
              <div className={classes.jobsContainer}>{orgPostingCards}</div>
                <div className="view-more">
                  {/* <button onClick={viewMoreJobs}>View More</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
