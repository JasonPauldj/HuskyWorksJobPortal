import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import classes from "../jobs/JobsPage.module.scss";
import JobCard from "../../components/jobs/JobCard";
import EventCard from "../../components/events/EventCard";
import './StudentDashboard.scss';

let dum = [];

function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user, "user");
  // console.log(localStorage.getItem('user'), "userdetails");

  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);


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
          console.log("fetch events", res.data)
        });
    };
    fetchRegisteredEvents();
  }, []);
  const jobCards = jobs.map((job) => {
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

  const eventCards = events.map((event) => {
    return (
      <EventCard
        key={event._id}
        event_id={event._id}
        event_title={event.event_title}
        event_type={event.event_type}
        event_date={new Date(event.event_date).toLocaleDateString()}
        event_seats={event.no_of_seats}
      />
    );
  });

  // console.log(dum, "dumddwedwewdmm");
  return (
    <div className="flex-horizontal">
      <div className="ly-1-3-1-bd-sec-left ">
        <Navbar />
      </div>
      <div className="ly-1-3-1-bd-sec-right ">
        <div className="ly-1-3-1-bd-sec-right-container">
          <div className="ly-1-3-1-bd-sec-right-main">
            <div className="applications-section-header">
              <p className="heading">My Applications</p>
            </div>
            <div class="h_line"></div>
            <br></br>
            <div className={classes.jobsContainer}>{jobCards}</div>
          </div>
          

          <div className="ly-1-3-1-bd-sec-right-sidebar">
            {/* <CardComponent className="ht-full-percent wt-80-percent"></CardComponent> */}
          </div>
        </div>
        <div className="ly-1-3-1-bd-sec-right-container">
          <div className="ly-1-3-1-bd-sec-right-main">
            <div className="applications-section-header">
              <p className="heading">My Events</p>
            </div>
            <div class="h_line"></div>
            <br></br>
            <div className={classes.jobsContainer}>{eventCards}</div>
          </div>
          

          <div className="ly-1-3-1-bd-sec-right-sidebar">
            {/* <CardComponent className="ht-full-percent wt-80-percent"></CardComponent> */}
          </div>
        </div>

        

      </div>
    </div>
  );
}

export default StudentDashboard;
