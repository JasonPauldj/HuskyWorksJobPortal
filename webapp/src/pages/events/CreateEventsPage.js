import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const [date, setDate] = useState(Date.now());
  const [type, setType] = useState("WORKSHOP");
  const [recruiter, setRecruiter] = useState({});
  const [isStudent, setIsStudent] = useState(true);
  let user = useSelector((state) => state.auth.user);
  const nav = useNavigate();

  const dispatch = useDispatch();
  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (user.length == 0) {
      user = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
    setIsStudent(user.isStudent);
  }, []);

  useEffect(() => {
    const fetchRecruiter = async () => {
      return await axios({
        method: "GET",
        url: `http://localhost:9000/recruiters/${user._id}`,
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
        .then((res) => setRecruiter(res.data))
        .catch((err) => console.log(err.data));
    };

    fetchRecruiter();
  }, []);

  // console.log("Recruiter: ", recruiter.username);

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
      event_organizerId: recruiter.organization_id,
      recruiter_id: user._id,
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

    if (!isStudent) {
      addEvent(event);
    }
    setTitle("");
    setDate("");
    setDesc("");
    setLat(0);
    setLng(0);
    setOrgName("");
    setSeats(0);
    navigate(`/dashboard-recruiter/${recruiter._id}`, {replace: true});

  };

  const handleClose=(ev)=>{
      //TODO - REMOVE HARDCODED VALUE
  navigate(`/dashboard-recruiter/${recruiter._id}`, {replace: true});
  }

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-4-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              <CardComponent className={`ht-full-percent ${classes.createEventCard}`}>
              <CloseIcon  style={{position: 'absolute',right:'5px', top: '5px', fontSize: '3rem'}} onClick={handleClose} />
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
                </div>
              </CardComponent>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CreateEventsPage;
