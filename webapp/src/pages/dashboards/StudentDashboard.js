import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

let dum = [];

function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user, 'user');
  // console.log(localStorage.getItem('user'), "userdetails");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // const fetchJobs = async () => {
    //   console.log("joojojojo");
    //   applications.map((i) => {
    //     console.log(i, "34567");
    //     axios.get(`http://localhost:9000/jobs/${i.job_id}`).then((response) => {
    //       console.log(response.data, "jojdjdjbss");
    //       dum.push(response.data);
    //       console.log(dum, "popopoop");
    //       setJobs(response.data);
    //       // console.log(jobs, "llslslls");
    //     });
    //   });
    // };

    const fetchAppliedJobs = async () => {
      await axios
        .get(`http://localhost:9000/student/applications/${user._id}`)
        .then(async (res) => {
          setJobs(res.data);
          console.log(jobs, "tesdwt");
          // await fetchJobs();
        });
    };
    fetchAppliedJobs();
  }, []);

  console.log(dum, "dumddwedwewdmm");
  return (
    <div className="flex-horizontal">
      <div className="ly-1-3-1-bd-sec-left ">
        <Navbar />
      </div>
      <div className="ly-1-3-1-bd-sec-right ">
        <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
          <div className="ly-1-3-1-bd-sec-right-main">
            {jobs && jobs.map((j, idx) => <div key={idx}>{j._id}</div>)}

            {/* <div className={classes.jobsContainer}>
                    {jobCards}
                    </div> */}
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
