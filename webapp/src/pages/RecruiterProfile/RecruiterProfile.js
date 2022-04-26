import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AuthService from "../../utilities/AuthService";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";
import Navbar from "../../components/navbar/Navbar";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./RecruiterProfile.module.scss";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function RecruiterProfile(props) {
  let user = useSelector((state) => state.auth.user);
  console.log(user, "user");

  //const [recruiter, setRecruiterProfile] = useState({});
  const [recruiterOrg, setOrganization] = useState({});
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
  }, []);

  //load recruiter organization details
  useEffect(() => {
    const fetchOrganizations = async () => {
      await axios
        .get(
          `http://localhost:9000/organizations/${user.recruiter.organization_id}`
        )
        .then(async (res) => {
          // setOrgs(res.data);
          console.log("fetch organization details", res.data);
          setOrganization(res.data);
        })
        .catch((err) => console.log(err.data));
    };
    fetchOrganizations();
  }, []);

  const handleRecruiterEdit = () => {
    console.log("Recruiter Edit Triggered!");
    <EditRecruiterDetails />;
  };

  const EditRecruiterDetails = () => {
    const [firstname, setFirstName] = useState(`${user.recruiter.firstname}`);
    const [lastname, setLastname] = useState(`${user.recruiter.lastname}`);
    // const [organization, setOrganization] = useState(
    //   `${recruiterOrg.organizationName}`
    // );
    const [email, setEmail] = useState(`${user.recruiter.email}`);

    const handleFormSubmit = async () => {
      let recruiter = {
        firstname: firstname,
        lastname: lastname,
        recruiterOrg: recruiterOrg,
        email: email,
      };

      const updateRecruiter = async (recruiter) => {
        return await axios({
          method: "PUT",
          url: `http://localhost:9000/recruiters/${user._id}`,
          data: recruiter,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: `bearer ${user.token}`,
            accept: "*/*",
          },
          validateStatus: (status) => {
            return true;
          },
        }).catch((err) => console.log(err.response.data));
      };

      updateRecruiter(recruiter);
      handleRecDiagClose();
    };

    const handleRecDiagClose = () => {
      //hide form
    };

    return (
      <div className={classes.formContainer}>
        <form>
          <h3>Add Experience Here</h3>

          <TextField
            placeholder="Enter Firstname"
            className={classes.formInputs}
            label="Firstname"
            margin="dense"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            placeholder="Enter Lastname"
            className={classes.formInputs}
            label="Major"
            margin="dense"
            variant="outlined"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <TextField
            className={classes.formInputs}
            margin="dense"
            variant="outlined"
            // defaultValue={organization}
            inputProps={{ readOnly: true }}
          />

          <TextField
            placeholder="Enter Email"
            className={classes.formInputs}
            label="Email Id"
            margin="dense"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Button onClick={handleFormSubmit}>{"Update"}</Button>
        </form>
        <div>
          <Button onClick={handleRecDiagClose}>Close</Button>
        </div>
      </div>
    );
  };

  const RecruiterProfileCard = () => {
    return (
      <CardComponent className={classes.divCardsContainer}>
        <div className={classes.studentHeader}>
          <div className={classes.studentProfileImg} />
          <div className={classes.studentDetails}>
            <h3>{user.recruiter.username}</h3>
            <h5>{user.recruiter.organization_id}</h5>
          </div>
        </div>
        <br /> <hr />
        <div>
          <div className={classes.divTitle}>
            <div className={classes.divTitleText}>My Profile Details</div>
            <div className={classes.divTitleBtn}>
              <EditIcon
                onClick={() => handleRecruiterEdit()}
                style={{ fontSize: "2rem" }}
              />
            </div>
          </div>
        </div>
      </CardComponent>
    );
  };

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-4-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              <RecruiterProfileCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
