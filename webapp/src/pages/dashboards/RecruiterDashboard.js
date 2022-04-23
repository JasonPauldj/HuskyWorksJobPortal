import React from 'react';
import { useSelector } from "react-redux";

function RecruiterDashboard() {
    const user = useSelector(state => state.auth.user);
    console.log(user, "user");
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuth, "isAuth");
    return (
   <div className="container">
      <h1>Hello Recruiter {user.userName}</h1>
   </div>
    );
}
   
  export default RecruiterDashboard;
  
