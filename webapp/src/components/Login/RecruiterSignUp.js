import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.scss';



function RecruiterSignUp() {

   
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[recruiterId, setRecruiterId] = useState("");
    const[email, setEmail]= useState("");
    const[recruiter, setRecruiter] = useState("");
    const[error, setError] = useState("");
    const nav = useNavigate();

    const handleSignUpRecruiter = async(e) => {
        e.preventDefault();
        try{
          const response =  await axios.post("http://localhost:9000/recruiters", {username, password, firstname, lastname,email, recruiterId});
          console.log(response.data);
          setRecruiter(response.data);
          nav(`/`);
        } catch(error) {
          setError(error);
        }
    }

    return (
   <div className="container">
     {/* TODO redirect to either dashboard or profile page */}
   
     <div>
     <div className="welcome-container">
 </div>
 

 <div className="signup-container">
    <h1 className="heading-primary">Sign Up as a Recruiter</h1>
    {/* <p className="text-mute">Enter your credentials to access your account.</p> */}

    <form className="signup-form">
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" onChange={(e) => setUsername(e.target.value)}/>
        <span className="label">Username</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="password" className="input-text" placeholder="&nbsp;" id="password"  onChange={(e) => setPassword(e.target.value)}/>
        <span className="label">Password</span>
        <span className="input-icon input-icon-password" data-password></span>
      </label>
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" id="firstname"  onChange={(e) => setFirstname(e.target.value)}/>
        <span className="label">FirstName</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" id="lastname"  onChange={(e) => setLastname(e.target.value)}/>
        <span className="label">LastName</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" id="recruiterId"  onChange={(e) => setRecruiterId(e.target.value)}/>
        <span className="label">Recruiter ID</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" id="email"  onChange={(e) => setEmail(e.target.value)}/>
        <span className="label">Email</span>
        <span className="input-icon"></span>
      </label>
      <button className="btn btn-login" onClick={handleSignUpRecruiter}>Sign Up</button>
    </form>
  </div>

     </div>
  

</div>
    );
}
    

   
  export default RecruiterSignUp;
  
