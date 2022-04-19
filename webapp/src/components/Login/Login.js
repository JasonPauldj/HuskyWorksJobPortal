import axios from 'axios';
import React, { useState } from 'react';
import './Login.scss';



function Login() {

    const[user, setUser] = useState(null);
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(false);
    const[success, setSuccess] = useState(false);
    
    
     const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const response =  await axios.post("http://localhost:9000/login", {username, password});
          console.log(response.data);
          setUser(response.data);
        } catch(error) {
          setError(error);
        }
    }


    return (
 <div className="container">
     {/* TODO redirect to either dashboard or profile page */}
     {user ? (<h1>Welcome {user.userName}</h1>): (
     <div>
     <div className="welcome-container">
    <h1 className="heading-secondary">Welcome to <span className="lg">HuskyWorks</span></h1>
 </div>
 

 <div className="signup-container">
    <h1 className="heading-primary">Log in<span className="span-blue">.</span></h1>
    <p className="text-mute">Enter your credentials to access your account.</p>
    {/* <div className="login-wrapper">
      <a href="#" className="btn btn-google">
        <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" />
        Log In with Google
      </a>
      <div className="line-breaker">
        <span className="line"></span>
        <span>or</span>
        <span className="line"></span>
      </div>
    </div> */}

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
      <button className="btn btn-login" onClick={handleSubmit}>Login</button>
    </form>
    <p className="text-mute">Not a member? <a href="$">Sign up</a></p>
  </div>

     </div>
  )}

</div>
    );
}
   
  export default Login;
  
