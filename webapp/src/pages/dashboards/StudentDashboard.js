import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import classes from "../jobs/JobsPage.module.scss";
import JobCard from "../../components/jobs/JobCard";
import EventCard from "../../components/events/EventCard";
import "./StudentDashboard.scss";
import { authActions } from "../../store/auth_slice";
import AuthService from "../../utilities/AuthService";

function StudentDashboard() {
  let user = useSelector((state) => state.auth.user);

  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  // const [recommendations, setRecommendations] = useState([]);
  const dispatch = useDispatch();

  const checkUser = () => {
    if (user.length == 0) {
      user = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  console.log(user, "user");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      await axios
        .get(`http://localhost:9000/student/applications/${user._id}`)
        .then(async (res) => {
          setJobs(res.data);
        });
    };
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      await axios
        .get(`http://localhost:9000/student/events/${user._id}`)
        .then(async (res) => {
          setEvents(res.data);
          console.log("fetch events", res.data);
        });
    };
    fetchRegisteredEvents();
  }, []);

  useEffect(() => {
    const fetchJobRecommendations = async () => {
      await axios.get(`http://localhost:9000/jobs/`).then(async (res) => {
        setAllJobs(res.data);
      });
    };
    fetchJobRecommendations();
  }, []);

  const currjobs = jobs.length > 3 ? jobs.slice(0, 3) : jobs;

  const jobCards = currjobs.map((job) => {
    return (
      <JobCard
        key={job._id}
        job={job}
        job_id={job._id}
        job_title={job.job_title}
        job_type={job.job_type}
        job_deadline={new Date(job.job_deadline).toLocaleDateString()}
        org
      />
    );
  });

  const currEvents = events.length > 3 ? events.slice(0, 3) : events;

  const eventCards = currEvents.map((event) => {
    return <EventCard key={event._id} event={event} />;
  });

  

  const recommendations = allJobs.filter(
    (j) => j.job_category === user.student.interests
  );

  const currRecos = recommendations.length > 3 ? recommendations.slice(0, 3) : recommendations;

  const recommendationCards = currRecos.map((job) => {
    return (
      <JobCard
        key={job._id}
        job={job}
        job_id={job._id}
        job_title={job.job_title}
        job_type={job.job_type}
        job_deadline={new Date(job.job_deadline).toLocaleDateString()}
        org
      />
    );
  });

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-4-bd-sec-left">
          <Navbar />
        </div>
        {recommendations && recommendations.map((r) => r.job_title)}
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/* APPS */}
              <div className="applications-section-header">
                <p className="heading">My Applications</p>
              </div>
              {/* <div class="h_line"></div> */}
              <br></br>
              <div className={classes.jobsContainer}>{jobCards}</div>
              <div className="view-more"><button>View More</button></div>
              {/* <div className={classes.jobsContainer}>{jobCards}</div> */}
              <br></br>
              {/* EVENTS */}
              <div className="applications-section-header">
                <p className="heading">My Events</p>
              </div>
              {/* <div class="h_line"></div> */}
              <br></br>
              <div className={classes.jobsContainer}>{eventCards}</div>
              <div className="view-more"><button>View More</button></div>
              {/* RECOS */}
              <br></br>
              <div className="applications-section-header">
                <p className="heading">My Recommendations</p>
              </div>
              {/* <div class="h_line"></div> */}
              <br></br>
              <div className={classes.jobsContainer}>
                
                  <div className={classes.jobsContainer}>
                    {recommendationCards}
                  </div>
                  <div className="view-more"><button>View More</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
