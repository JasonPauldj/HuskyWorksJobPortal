import { useEffect, useState } from "react";
import JobCard from './JobCard';

function JobsSection(props){

    const [jobs, setJobs] = useState(props.jobs);

    useEffect(()=>{
        setJobs(props.jobs);
    },[props]);

    const jobCards = jobs.map((job) => {
        return (
            <JobCard key={job._id} job={job} />
        )
    });

    return(
        <>
        {jobCards}
        </>
    )
}

export default JobsSection;