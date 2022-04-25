import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function RecruiterDashboard() {
    const recruiter = useSelector(state => state.auth.user);
    console.log(recruiter, "recruiter");
    console.log(recruiter.organizationId, "org");

    const [jobs, setJobs] = useState([]);
    const [jobsPosted, setJobsPosted] = useState([]);
    const [orgPosting, setOrgPosting] = useState([]);



   
    useEffect(() => {
          const fetchJobsPosted = async () => {
              const response = await axios.get('http://localhost:9000/jobs');
              setJobs(response.data);
              let jobs = response.data;
              const jobsPostedByrecruiter= response.data.filter((job) => job.recruiterId === recruiter._id);
              setJobsPosted(jobsPostedByrecruiter);
              console.log(" jobs posted", jobsPosted);

              const organizationPosting= jobs.filter((job) => job.organization_id === recruiter.organizationId);
              setOrgPosting(organizationPosting);
              console.log("Org jobs: ", orgPosting);
          }
          fetchJobsPosted(); 
  }, [])





    return (
   <div className="container">
      <h1>Hello Recruiter {recruiter.userName}</h1>
      <div>
      {jobsPosted && jobsPosted.map((job) => job.job_title)}
      {orgPosting && orgPosting.map((job) => job._id)}

      </div>
   </div>
    );
}
   
  export default RecruiterDashboard;
  
