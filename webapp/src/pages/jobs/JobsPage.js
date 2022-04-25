import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import FilterSectionComponent from "../../components/genericComponent/FIlterSectionComponent";
import JobCard from "../../components/jobs/JobCard";
import SearchBar from "../../components/genericComponent/SearchBar";
import classes from "./JobsPage.module.scss";
import { JOB_CATEGORIES } from "../../utilities/constants";
import { JOB_LOCATIONS } from "../../utilities/constants";
import ApplyModal from "../../components/jobs/ApplyModal";
import {postApplication} from '../../store/applications_slice';


const JOB_TYPE_FILTERS = ["FULL-TIME", "PART-TIME", "INTERNSHIP"];
const JOB_CATEGORY_FILTERS = [...JOB_CATEGORIES];
const JOB_LOCATION_FILTERS = [...JOB_LOCATIONS];


let isInitial = true;

function JobsPage(props) {
  const [appliedJobTypeFilters, setJobTypeFilters] = useState([]);
  const [appliedJobCategoryFilters, setJobCategoryFilters] = useState([]);
  const [appliedJobLocationFilters, setJobLocationFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isApply, setIsApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  const applications = useSelector((state=>state.applications.applications));
  const dispatch = useDispatch();


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

  /**
   * Function to fetch jobs
   * @param {string} url 
   */
  const fetchJobs = async (url) => {
    const response = await axios.get(url);
    setJobs(response.data);
  };

  //filtering jobs when the filters are changed
  useEffect(() => {
    let url = "http://localhost:9000/jobs";
    let params = [];
    let jobTypeQueryParam = "";
    let jobCategoryQueryParam = "";
    let jobLocationQueryParam = "";

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

    //checking if job category filters are selected
    if (appliedJobCategoryFilters.length > 0) {
      appliedJobCategoryFilters.forEach((jobCategoryValue) => {
        jobCategoryQueryParam += `${jobCategoryValue};`;
      });
    }
    if (jobCategoryQueryParam.length > 0) {
      params.push({
        paramName: "job_categories",
        paramValue: jobCategoryQueryParam.slice(0, jobCategoryQueryParam.length - 1),
      });
      //url += `?job_types=${jobTypeQueryParam.slice(0, jobTypeQueryParam.length - 1)}`
    }


    //checking if job location filters are selected
    if (appliedJobLocationFilters.length > 0) {
      appliedJobLocationFilters.forEach((jobLocationValue) => {
        jobLocationQueryParam += `${jobLocationValue};`;
      });
    }
    if (jobLocationQueryParam.length > 0) {
      params.push({
        paramName: "job_locations",
        paramValue: jobLocationQueryParam.slice(0, jobLocationQueryParam.length - 1),
      });
      //url += `?job_types=${jobTypeQueryParam.slice(0, jobTypeQueryParam.length - 1)}`
    }

    //checking if anything is entered in searchbar
    if (searchText.length > 0) {
      params.push({ paramName: "searchText", paramValue: searchText });
      // url+=`&searchText=${searchText}`
    }

    //constructing url
    if (params.length > 0) {
      params.forEach((param, index) => {
        if (index === 0) {
          url += `?${param.paramName}=${param.paramValue}`;
        } else {
          url += `&${param.paramName}=${param.paramValue}`;
        }
      });
    }

    fetchJobs(url);
  }, [appliedJobTypeFilters, appliedJobCategoryFilters , appliedJobLocationFilters,searchText]);

  
  const handleApplyButtonOnClick = (job)=>{
    setSelectedJob(job);
    setIsApply(true);
  }

  const jobCards = jobs.map((job) => {
        const applicationExist = applications.filter((application) =>application.job_id === job._id);

    return (
      <JobCard
        key={job._id}
        job={job}
        handleApplyButtonOnClick={handleApplyButtonOnClick}
        isApplied={applicationExist.length > 0}
      />
    );
  });

  const isJobTypeSelected = (jobTypeValue) =>
    appliedJobTypeFilters.includes(jobTypeValue);

  const isJobCategorySelected = (jobCategoryValue) =>
    appliedJobCategoryFilters.includes(jobCategoryValue);

    const isJobLocationSelected = (jobLocationValue) =>
    appliedJobLocationFilters.includes(jobLocationValue);

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

  const handleJobCategoryCheckboxChange = (jobCategoryValue) => {
    let updatedJobCategoryFilters;

    //the filter was selected, remove it from appliedFilters
    if (isJobCategorySelected(jobCategoryValue)) {
      updatedJobCategoryFilters = appliedJobCategoryFilters.filter(
        (JTC) => JTC !== jobCategoryValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedJobCategoryFilters = [...appliedJobCategoryFilters, jobCategoryValue];
    }
    setJobCategoryFilters(updatedJobCategoryFilters);
  };

  const handleJobLocationCheckboxChange = (jobLocationValue) => {
    let updatedJobLocationFilters;

    //the filter was selected, remove it from appliedFilters
    if (isJobLocationSelected(jobLocationValue)) {
      updatedJobLocationFilters = appliedJobLocationFilters.filter(
        (JTL) => JTL !== jobLocationValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedJobLocationFilters = [...appliedJobLocationFilters, jobLocationValue];
    }
    setJobLocationFilters(updatedJobLocationFilters);
  };

  const handleSearchInputChange = (searchInput) => {
    setSearchText(searchInput);
  };

  const onApplyConfirm=(job) =>{
    //TODO - REMOVE HARDCODED DOCUMENT_ID and STUDENT_ID

    const application={
      document_id: "1",
      status: "APPLIED",
      job_id: job._id,
      student_id: "6266dfbe83f165d16ae1ef02"
    };

    dispatch(postApplication(application))
    setSelectedJob(null);
    setIsApply(false);
  }

  const onApplyReject=() =>{
    setSelectedJob(null);
    setIsApply(false);
  }

  return (
    <>
      <div className="prbg ht-full-viewport py-1">
        {isApply && <ApplyModal onApplyConfirm={onApplyConfirm} onApplyReject={onApplyReject} job={selectedJob}/>}
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
                    placeholder="Search for Job"
                    label="Search for Job or Organization"
                    onSearchInputChange={handleSearchInputChange}
                  />
                </div>
                {jobs.length===0 && <div className={classes.infoMessage}>No Jobs Were Found</div>}
                {jobs.length> 0 && <div className={classes.jobsContainer}>
                  {jobCards}
                  </div>}
              </div>
              <div className="ly-1-3-1-bd-sec-right-sidebar">
                {/* <CardComponent className="ht-full-percent wt-80-percent"></CardComponent> */}
                <div className={classes.filterWrapper}>
                  <FilterSectionComponent
                    heading={"JOB TYPE"}
                    values={JOB_TYPE_FILTERS}
                    isChecked={isJobTypeSelected}
                    handleCheckboxChange={handleJobTypeCheckboxChange}
                  />
                </div>
                <div className={classes.filterWrapper}>
                  <FilterSectionComponent
                    heading={"JOB CATEGORY"}
                    values={JOB_CATEGORY_FILTERS}
                    handleCheckboxChange={handleJobCategoryCheckboxChange}
                  />
                </div>
                <div className={classes.filterWrapper}>
                  <FilterSectionComponent
                    heading={"JOB LOCATION"}
                    values={JOB_LOCATION_FILTERS}
                    handleCheckboxChange={handleJobLocationCheckboxChange}
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
