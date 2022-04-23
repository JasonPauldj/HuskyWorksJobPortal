import React from 'react';
import { useSelector } from "react-redux";




function StudentProfile() {
    const loggedInStudent = useSelector(state => state.auth.user);
    console.log(loggedInStudent, "loggedInStudent");
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuth, "isAuth");
    return (
   <div className="container">
      <h1>Hello Student</h1>
   </div>
    );
}
   
  export default StudentProfile;
  
