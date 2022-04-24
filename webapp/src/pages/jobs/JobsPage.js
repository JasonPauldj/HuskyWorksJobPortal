import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import FilterSectionComponent from "../../components/genericComponent/FIlterSectionComponent";
import JobCard from "../../components/jobs/JobCard";
import SearchBar from "../../components/genericComponent/SearchBar";
import classes from "./JobsPage.module.scss";

const JOB_TYPE_FILTERS = ["FULL-TIME", "PART-TIME", "INTERNSHIP"];

let isInitial = true;

function JobsPage(props) {
  const [appliedJobTypeFilters, setJobTypeFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);

  //getting all jobs when the component is rendered for the first Time
  useEffect(() => {
    if (isInitial) {
      const fetchJobs = async () => {
        const response = await axios.get("http://localhost:9000/jobs");
        setJobs(response.data);
      };
      //   const data = await response.json();
      fetchJobs();
    } else {
      isInitial = false;
    }
  }, []);

  const fetchJobs = async (url) => {
    const response = await axios.get(url);
    setJobs(response.data);
  };

  //filtering jobs when the filters are changed
  useEffect(() => {
    let url = "http://localhost:9000/jobs";
    let params = [];
    let jobTypeQueryParam = "";

    //checking if job type filters are selected
    if (appliedJobTypeFilters.length > 0) {
      appliedJobTypeFilters.forEach((jobTypeValue) => {
        jobTypeQueryParam += `${jobTypeValue};`;
      });
    }

    if (jobTypeQueryParam.length > 0) {
      params.push({
        paramName: "job_types",
        paramValue: jobTypeQueryParam.slice(0, jobTypeQueryParam.length - 1),
      });
      //url += `?job_types=${jobTypeQueryParam.slice(0, jobTypeQueryParam.length - 1)}`
    }

    if (searchText.length > 0) {
      params.push({ paramName: "searchText", paramValue: searchText });
      // url+=`&searchText=${searchText}`
    }

    if (params.length > 0) {
      params.forEach((param, index) => {
        if (index === 0) {
          url += `?${param.paramName}=${param.paramValue}`;
        } else {
          url += `&${param.paramName}=${param.paramValue}`;
        }
      });
    }

    // const fetchJobs = async () => {
    //     const response = await axios.get(url);
    //     setJobs(response.data);
    // }

    fetchJobs(url);
  }, [appliedJobTypeFilters, searchText]);

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

  const isJobTypeSelected = (jobTypeValue) =>
    appliedJobTypeFilters.includes(jobTypeValue);

  const handleJobTypeCheckboxChange = (jobTypeValue) => {
    let updatedJobTypeFilters;

    //the filter was selected, remove it from appliedFilters
    if (isJobTypeSelected(jobTypeValue)) {
      updatedJobTypeFilters = appliedJobTypeFilters.filter(
        (JTV) => JTV !== jobTypeValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedJobTypeFilters = [...appliedJobTypeFilters, jobTypeValue];
    }
    setJobTypeFilters(updatedJobTypeFilters);
  };

  const handleSearchInputChange = (searchInput) => {
    setSearchText(searchInput);
  };

  return (
    <>
      <div className="prbg ht-full-viewport py-1">
        <div className="flex-horizontal">
          <div className="ly-1-3-1-bd-sec-left ">
            <Navbar />
          </div>
          <div className="ly-1-3-1-bd-sec-right ">
            <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
              <div className="ly-1-3-1-bd-sec-right-main">
                <div>
                  <SearchBar
                    id="search-jobs"
                    placeholder="Search for Job or Organization"
                    label="Search for Job or Organization"
                    onSearchInputChange={handleSearchInputChange}
                  />
                </div>

                <div className={classes.jobsContainer}>{jobCards}</div>
              </div>
              <div className="ly-1-3-1-bd-sec-right-sidebar">
                {/* <CardComponent className="ht-full-percent wt-80-percent"></CardComponent> */}
                <div>
                  <FilterSectionComponent
                    heading={"JOB TYPE"}
                    values={JOB_TYPE_FILTERS}
                    isChecked={isJobTypeSelected}
                    handleCheckboxChange={handleJobTypeCheckboxChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobsPage;
