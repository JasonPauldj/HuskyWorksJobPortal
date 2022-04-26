import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth_slice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import AuthService from "../../utilities/AuthService";

function Navbar() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);
  let auth = useSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();
  const handleLogOut = () => {
    if (auth) {
      dispatch(authActions.logout());
      AuthService.removeCurrUser();
      nav("/");
    }
  };

  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (user) {
      user = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  //Dashboard, browse jobs, browse events, my applications, profile - student
  //Dashboard, create jobs, create events, my orgranization, profile -recruiter

  return user.isStudent ? (
    <CardComponent className="navbar">
      <div>
        <Link to="/" className="navbar-title">
          HuskyWorks
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to={`/dashboard-student/${user._id}`}
          className="navbar-links-items"
        >
          Dashboard
        </Link>
        <Link to="/jobs" className="navbar-links-items">
          Browse Jobs
        </Link>
        <Link to="/events" className="navbar-links-items">
          Browse Events
        </Link>
        <Link to="/student-applications" className="navbar-links-items">
          My Applications
        </Link>
        <Link to={`/studentProfile/${user._id}`} className="navbar-links-items">
          My Profile
        </Link>
      </div>
      <div className="navbar-profile">
        <div className="navbar-profile-photo" />
        <h3> {auth ? user.userName : "Barney Stinson"} </h3>
        <LogoutIcon onClick={handleLogOut} />
      </div>
    </CardComponent>
  ) : (
    <CardComponent className="navbar">
      <div>
        <Link to="/" className="navbar-title">
          HuskyWorks
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to={`/dashboard-recruiter/${user._id}`}
          className="navbar-links-items"
        >
          Dashboard
        </Link>
        <Link to="/jobs/create-job" className="navbar-links-items">
          Create a job
        </Link>
        <Link to="/events/create-event" className="navbar-links-items">
          Create an event
        </Link>
        <Link
          to={`/organizations/${user.recruiter.organization_id}`}
          className="navbar-links-items"
        >
          My Organization
        </Link>
        <Link
          to={`/recruiterProfile/${user._id}`}
          className="navbar-links-items"
        >
          My Profile
        </Link>
      </div>
      <div className="navbar-profile">
        <div className="navbar-profile-photo" />
        <h3> {auth ? user.userName : "Barney Stinson"} </h3>
        <LogoutIcon onClick={handleLogOut} />
      </div>
    </CardComponent>
  );
}

export default Navbar;
