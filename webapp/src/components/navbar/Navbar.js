import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth_slice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();
  const handleLogOut = () => {
    if (auth) {
      dispatch(authActions.logout());
      nav("/");
    }
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/" className="navbar-title">
          HuskyWorks
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/jobs" className="navbar-links-items">
          Browse Jobs
        </Link>
        <a
          href="/organizations/625ef5818f55e8e632422328"
          className="navbar-links-items"
        >
          Organization
        </a>
        <a href="/events" className="navbar-links-items">
          Browse Events
        </a>
      </div>
      <div className="navbar-profile">
        <div className="navbar-profile-photo" />
        <h3> {auth ? user.userName : "Barney Stinson"} </h3>
        <LogoutIcon onClick={handleLogOut} />
      </div>
    </div>
  );
}

export default Navbar;
