import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from './ApplicationCard.module.scss';
import axios from "axios";


function ApplicationCard(props) {

    const [job, setJob] = useState({});
    const [org, setOrg] = useState({});


    //fetch job details for the application
    useEffect(() => {

        const fetchJob = async () => {
            const response = await axios.get(`http://localhost:9000/jobs/${props.application.job_id}`);
            setJob(response.data);
        };
        fetchJob();
    }, [])

    //fetch organization details for the application
    useEffect(() => {
        if (job) {
            const fetchOrganization = async () => {
                const response = await axios.get(`http://localhost:9000/organizations/${job.organization_id}`);
                setOrg(response.data);
            };
            fetchOrganization();
        }
    }, [job]);


    const navigate = useNavigate();

    const handleJobDetailsClick=(event)=>{
        navigate(`/jobs/${job._id}`);
    }

    const handleOrgDetailsClick=(event)=>{
        navigate(`/organizations/${org._id}`);
    }

    return (<CardComponent
        className={` ${classes.applicationCard}`}
    >
        <div className={classes.applicationCardWrapper}>
            <div className={classes.orgSection}>
                <img
                    className={classes.orgImg}
                    src={require("../../assets/Barney.jpeg")}
                />
            </div>
            <div className={classes.applicationCardContent}>
                <div className={classes.jobTitle}>{job.job_title}</div>
                <div className={classes.jobDetail}>{org.organizationName}</div>
                <div className={classes.jobDetail}>{job.job_type}</div>
                <div className={classes.jobDetail}>{job.job_salary}</div>
                <div className={job.job_status==='ACTIVE' ? classes.open : classes.closed}>{job.job_status==='ACTIVE' ? "Open" : "Closed"}</div>
            </div>
            <div className={classes.btn_grp}>
                <button onClick={handleJobDetailsClick}>View Job Details</button>
                <button onClick={handleOrgDetailsClick}>View Organization Details</button>
            </div>
        </div>
    </CardComponent>
    )
}

export default ApplicationCard;