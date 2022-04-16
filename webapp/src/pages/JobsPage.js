import {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar'
import LeftSideBar from '../components/left_side_bar/LeftSideBar';
import FilterSectionComponent from '../components/FIlterSectionComponent';
import JobCard from '../components/jobs/JobCard';

const JOB_TYPE_FILTERS= ["FULLTIME", "PARTTIME", "INTERNSHIP"];

function JobsPage(props) {
    
    const [appliedJobTypeFilters, setJobTypeFilters] = useState([]);
    const [jobs,setJobs] = useState([]);

    //getting all jobs when the component is rendered for the first Time
    useEffect( ()=>{
        const fetchJobs = async ()=> {
           const response = await axios.get('http://localhost:9000/jobs');
           setJobs(response.data);
        }
    //   const data = await response.json();
        fetchJobs();
    },[])

    const jobCards = jobs.map((job)=>{
        return (
            <JobCard key={job._id} job_title={job.job_title} job_type={job.job_type} job_deadline={job.job_deadline} />
        )
    });

    const isJobTypeSelected=(jobTypeValue)=> appliedJobTypeFilters.includes(jobTypeValue)
    
    const handleJobTypeCheckboxChange = (jobTypeValue) =>{
        let updatedJobTypeFilters;
        
        //the filter was selected, remove it from appliedFilters
        if(isJobTypeSelected(jobTypeValue)){
            updatedJobTypeFilters=appliedJobTypeFilters.filter((JTV)=> JTV !== jobTypeValue)
        }
        //the filter was not selected, add it to appliedFilters\
        else{
            updatedJobTypeFilters =[...appliedJobTypeFilters,jobTypeValue];
        }
        setJobTypeFilters(updatedJobTypeFilters);
    }
    
    return (<>
        <Navbar />
        <div className="body-section-left">
            <div className="leftSideBar">
                <FilterSectionComponent heading={"JOB TYPE"} values={JOB_TYPE_FILTERS} isChecked={isJobTypeSelected} handleCheckboxChange={handleJobTypeCheckboxChange} />
            </div>
        </div>
        <div>
            {jobCards}
        </div>
        <div>This is jobs page</div>
    </>)
}

export default JobsPage;