import React from "react";
import { useSelector } from "react-redux";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import Navbar from "../../components/navbar/Navbar";

function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user, "user");
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuth, "isAuth");
  return (
    <div>
      <Navbar />
      {/* Applied jobs */}
      {/* Recommendations */}
      {/* Applied Events */}
      <CardComponent>
        <div>
          <h3>{user.userName}</h3>
          <h4>{user.userName}</h4>
          <h5>{user.userName}</h5>
        </div>
      </CardComponent>
    </div>
  );
}

export default StudentDashboard;
