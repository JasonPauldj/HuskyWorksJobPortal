import CardComponent from "../genericComponent/genericCard/CardComponent";
import { useNavigate } from "react-router-dom";
import classes from "./JobCard.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReactTooltip from 'react-tooltip';


function JobCard(props) {
  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/jobs/${props.job_id}`);
  };

  return (
    <CardComponent
      className={`wt-30-percent ${classes.jobCard}`}
      onClick={handleCardOnClick}
    >
      <div >
        <div className={classes.orgSection}>
          <img
            className={classes.orgImg}
            src={require("../../assets/Barney.jpeg")}
          />
          <span>{props.job.organizationName}</span>
        </div>
        <div
          className={classes.jobDesc}
        >{`${props.job.organizationName} is looking for a ${props.job.job_title}`}</div>
        <div className={classes.jobDetails}>
          {" "}
          <LocationOnIcon style={{ fontSize: "0.8rem" }} />{" "}
          {`${props.job.job_location} | ${props.job.job_type} | Pay ${props.job.job_salary}`}{" "}
        </div>
        <div className={classes.jobDeadline}>{`Apply By: ${new Date(
          props.job.job_deadline
        ).toLocaleDateString()}`}</div>
        <div className={classes.divider}></div>
        <div className={classes.apply} data-tip="" data-for="cardTooltip">
          <button className={classes.btn_apply}>Apply</button>
          <ReactTooltip id='cardTooltip' type='info'>
        <span>Click to apply for job</span>
      </ReactTooltip>
        </div>
      </div>

    </CardComponent>
  );
}

export default JobCard;
