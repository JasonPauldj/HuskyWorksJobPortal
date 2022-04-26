import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./CreateEventsPage.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth_slice";
import AuthService from "../../utilities/AuthService";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


function CreateEventsPage() {
  const [title, setTitle] = useState("");
  const [orgName, setOrgName] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [seats, setSeats] = useState(0);
  const [date, setDate] = useState("");
  const [type, setType] = useState("WORKSHOP");
  // const [recruiter, setRecruiter] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [message, setMessage] = useState("");
  let user = useSelector((state) => state.auth.user);
  const nav = useNavigate();

  const dispatch = useDispatch();
  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (!user) {
      user = AuthService.getCurrUser();
      if (!user) {
        nav("/");
        return;
      }
      if (user.isStudent) {
        handleUnAuthorizedError();
        nav("/events");
        return;
      }
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
    setIsStudent(user.isStudent);
  }, []);

  const handleSuccessMessage = (event) => {
    // event.preventDefault();
    setShowAlert(true);
    setMessage("Event Created Successfully!");
  };

  const handleUnAuthorizedError = (event) => {
    // event.preventDefault();
    setShowAlert(true);
    setMessage("You are not authorized!");
  };

  const handleErrorMessage = () => {
    setShowAlert(true);
    setMessage("Event cannot be created!");
  };

  const navigate = useNavigate();


  const handleEventSubmit = () => {
    const event = {
      event_title: title,
      event_description: desc,
      event_organizer: orgName,
      event_type: type,
      event_location: {
        latitude: lat,
        longitude: lng,
      },
      no_of_seats: seats,
      event_date: date,
      event_organizerId: user.recruiter.organization_id,
      recruiter_id: user.recruiter._id,
    };

    const addEvent = async (event) => {
      return await axios({
        method: "POST",
        url: "http://localhost:9000/events",
        data: event,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
          Authorization: `bearer ${user.token}`,
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.data));
    };

    addEvent(event);
    setTitle("");
    setDate("");
    setDesc("");
    setLat(0);
    setLng(0);
    setOrgName("");
    setSeats(0);
    navigate(`/dashboard-recruiter/${user.recruiter._id}`, {replace: true});

  };

  const handleClose=(ev)=>{
      //TODO - REMOVE HARDCODED VALUE
  navigate(`/dashboard-recruiter/${user.recruiter._id}`, {replace: true});
  }

  return (

    <CardComponent className={`ht-full-percent ${classes.createEventCard}`}>
      <div className={classes.formContainer}>
        <h3>Create an Event</h3>
        <TextField
          placeholder="Enter Title"
          className={classes.formInputs}
          label="Title"
          margin="dense"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          placeholder="Enter Organizer Name"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          value={orgName}
          label="Organizer Name"
          onChange={(e) => setOrgName(e.target.value)}
        />
        <TextField
          placeholder="Enter Event Description"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          value={desc}
          label="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          placeholder="Enter Event Location"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          label="Location"
          value={`${lat}, ${lng}`}
          onChange={(e) => {
            const location = e.target.value.split(",");
            setLat(location[0]);
            setLng(location[1]);
          }}
        />
        <TextField
          placeholder="Enter Available Seats"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          value={seats}
          label="Seats"
          onChange={(e) => setSeats(e.target.value)}
        />
        <TextField
          type="date"
          className={classes.formInputs}
          variant="outlined"
          value={date}
          margin="dense"
          onChange={(e) => setDate(e.target.value)}
        />
        <FormControl className={classes.formInputs}>
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Event Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"NETWORKING"}>Networking</MenuItem>
            <MenuItem value={"WORKSHOP"}>Workshop</MenuItem>
            <MenuItem value={"CAREER FAIR"}>Career fair</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.formBtn}
          margin="dense"
          onClick={handleEventSubmit}
        >
          Submit
        </Button>
        <Snackbar open={showAlert} autoHideDuration={2000} message={message} />
      </div>

    </CardComponent>

  );
}

export default CreateEventsPage;
