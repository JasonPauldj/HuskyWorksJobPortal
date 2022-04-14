import React from "react";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-title">HuskyWorks</div>
      <div className="navbar-links">
        <a href="#" className="navbar-links-items">
          Browse Jobs
        </a>
        <a href="#" className="navbar-links-items">
          Startups
        </a>
        <a href="#" className="navbar-links-items">
          Career Resources
        </a>
      </div>
    </div>
  );
}

export default Navbar;
