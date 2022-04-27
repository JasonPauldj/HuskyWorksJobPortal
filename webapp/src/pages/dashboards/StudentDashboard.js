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
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  let user = useSelector((state) => state.auth.user);

  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        .get(`http://localhost:9000/student/registrations/${user._id}`)
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

  const viewMoreApplications = async (e) => {
    e.preventDefault();
    try {
      navigate(`/student-applications`);
    } catch (error) {
      setError(error);
    }
  };

  const viewMoreJobs = async (e) => {
    e.preventDefault();
    try {
      navigate(`/jobs`);
    } catch (error) {
      setError(error);
    }
  };


  const viewMoreEvents = async (e) => {
    e.preventDefault();
    try {
      navigate(`/events`);
    } catch (error) {
      setError(error);
    }
  };

  //TO DO SHUFFLE
  const currjobs = jobs.length > 3 ? jobs.slice(0, 3) : jobs;

  const jobCards = currjobs.map((job) => {
    return <JobCard key={job._id} job={job} isApplied={true} />;
  });

  const currEvents = events.length > 3 ? events.slice(0, 3) : events;

  const eventCards = currEvents.map((event) => {
    return <EventCard key={event._id} event={event} />;
  });

  const recommendations = allJobs.filter(
    (j) => j.job_category === user.student.interests
  );

  const shuffledArray = recommendations.sort((a, b) => 0.5 - Math.random());
  const currRecos =
  shuffledArray.length > 3 ? shuffledArray.slice(0, 3) : shuffledArray;

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
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            
            <div className="ly-1-4-bd-sec-right-main">
              {/* APPS */}
              <CardComponent className="card-margin">
              <div className="applications-section-header">
                <p className="heading">My Applications</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div className={classes.jobsContainer}>{jobCards}</div>
              <div className="view-more">
                <button onClick={viewMoreApplications}>View More</button>
              </div>
              {/* <div className={classes.jobsContainer}>{jobCards}</div> */}

              {/* EVENTS */}
              <div className="applications-section-header">
                <p className="heading">My Events</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div className={classes.jobsContainer}>{eventCards}</div>
              <div className="view-more">
                <button onClick={viewMoreEvents}>View More</button>
              </div>
              {/* RECOS */}

              <div className="applications-section-header">
                <p className="heading">My Recommendations</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div>
              <div className={classes.jobsContainer}>{recommendationCards}</div>
                <div className="view-more">
                  <button onClick={viewMoreJobs}>View More</button>
                </div>
              </div>
              </CardComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
