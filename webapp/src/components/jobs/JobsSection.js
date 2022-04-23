import { useState } from "react";
import JobCard from './JobCard';

function JobsSection(props){

    const [jobs, setJobs] = useState(props.jobs);

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