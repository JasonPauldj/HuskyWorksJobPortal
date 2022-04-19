import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
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
        <a href="#" className="navbar-links-items">
          Career Resources
        </a>
      </div>
    </div>
  );
}

export default Navbar;
