import {
  Button,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./CreateJobsPage.module.scss";
import axios from "axios";
import { JOB_CATEGORIES } from '../../utilities/constants';
import { JOB_LOCATIONS } from '../../utilities/constants';
import { JOB_TYPES } from '../../utilities/constants';
import AuthService from "../../utilities/AuthService";


function CreateJobsPage() {

  // let user = useSelector((state) => state.auth.user);

  // const checkUser = () => {
  //   if (user.length == 0) {
  //     user = AuthService.getCurrUser();
  //     dispatch(authActions.login(AuthService.getCurrUser() || {}));
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);

  //TODO - FETCH RECRUITER FROM STATE
  //TODO - FETCH ORGANIZATION FROM BACKEND BASED ON RECRUITER 

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [location, setLocation] = useState("");
  const [deadlineDate, setDeadlineDate] = useState({});
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState(0);


  const handleSubmit = () => {
    const job = {
      job_title: title,
      job_description: desc,
      job_responsibilities: responsibilities,
      job_type: type,
      job_location: location,
      job_deadline: deadlineDate,
      job_status: "ACTIVE",
      job_salary: salary,
      recruiterId: "6266aebe4fc1e005cd7ef8ed",
      organization_id: "62633f632a7fcc1215ddc09e",
      organizationName: "Philips",
      job_post_date: new Date(),
      job_category: category
    };

    const addJob = async (job) => {
      return await axios({
        method: "POST",
        url: "http://localhost:9000/jobs",
        data: job,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.data));
    };

    addJob(job);

    setTitle("");
    setDesc("");
    setResponsibilities("");
    setLocation("");
    setCategory("");
    setDeadlineDate(null);
    setType("");
    setSalary(0);
  };

  const menuJobCatItems = JOB_CATEGORIES.map((category) => {
    return (
      <MenuItem value={category}>{category}</MenuItem>
    )
  })

  const menuJobLocItems = JOB_LOCATIONS.map((location) => {
    return (
      <MenuItem value={location}>{location}</MenuItem>
    )
  })

  const menuJobTypeItems = JOB_TYPES.map((type) => {
    return (
      <MenuItem value={type}>{type}</MenuItem>
    )
  })


  return (
    <CardComponent className={`ht-full-percent ${classes.createJobCard}`}>
      <div className={classes.formContainer}>
        <h3>Create an Job</h3>
        <TextField
          placeholder="Enter Job Title"
          className={classes.formInputs}
          label="Title"
          margin="dense"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          placeholder="Enter Job Description"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          value={desc}
          label="Job Description"
          multiline
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          placeholder="Enter Job Responsibilities"
          className={classes.formInputs}
          multiline
          variant="outlined"
          margin="dense"
          value={responsibilities}
          label="Job Responsibilities"
          onChange={(e) => setResponsibilities(e.target.value)}
        />
        <TextField
          placeholder="Enter Job Salary"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          label="Salary"
          value={salary}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={(e) => setSalary(e.target.value)}
        />
        <div className={classes.selectSection}>
        <FormControl className={classes.selectInput} >
          <InputLabel id="lbl-job-category">Job Category</InputLabel>
          <Select
            labelId="job-category"
            id="job-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Job Category"
          >
            {menuJobCatItems}

          </Select>
        </FormControl>
        </div>
        <div className={classes.selectSection}>
        <FormControl className={classes.selectInput}>
          <InputLabel id="lbl-job-location">Job Location</InputLabel>
          <Select
            labelId="job-loc"
            id="job-loc"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Job Location"
          >
            {menuJobLocItems}
          </Select>
        </FormControl>
        </div>
        <div className={classes.selectSection}>
        <FormControl className={classes.selectInput}>
          <InputLabel id="lbl-job-type">Job Type</InputLabel>
          <Select
            labelId="job-type"
            id="job-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Job Type"
          >
            {menuJobTypeItems}
          </Select>
        </FormControl>
        </div>
        <TextField
          type="date"
          className={classes.formInputs}
          variant="outlined"
          value={deadlineDate}
          margin="dense"
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
        <Button
          className={classes.formBtn}
          margin="dense"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </CardComponent>
  );
}

export default CreateJobsPage;
