import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.scss';



function SignUpStudent() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[nuid, setNuid] = useState("");
    const[gpa, setGpa]= useState(0.0);
    const[major, setMajor]= useState("");
    const[email, setEmail]= useState("");
    const[student, setStudent] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();


    const handleSignUp = async(e) => {
        e.preventDefault();
        try{
          const response =  await axios.post("http://localhost:9000/students", {username, password, firstname, lastname, nuid, gpa, major,email});
          console.log(response.data);
          setStudent(response.data);
          navigate(`/`);
        } catch(error) {
          setError(error);
        }
    }

    return (
   <div className="container">
     {/* TODO redirect to either dashboard or profile page */}
   
     <div>
     <div className="welcome-container">
    {/* <h1 className="heading-secondary">Sign Up as a Student</h1> */}
 </div>
 

 <div className="signup-container">
    <h1 className="heading-primary">Sign Up as a Student</h1>
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
        <input type="text" className="input-text" placeholder="&nbsp;" id="nuid"  onChange={(e) => setNuid(e.target.value)}/>
        <span className="label">NUID</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="number" className="input-text" placeholder="&nbsp;" id="gpa"  onChange={(e) => setGpa(e.target.value)}/>
        <span className="label">GPA</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" id="major"  onChange={(e) => setMajor(e.target.value)}/>
        <span className="label">Major</span>
        <span className="input-icon"></span>
      </label>
      <label className="inp">
        <input type="text" className="input-text" placeholder="&nbsp;" id="email"  onChange={(e) => setEmail(e.target.value)}/>
        <span className="label">Email</span>
        <span className="input-icon"></span>
      </label>
      <button className="btn btn-login" onClick={handleSignUp}>Sign Up</button>
    </form>
  </div>

     </div>
  

</div>
    );
}
    


export default SignUpStudent;