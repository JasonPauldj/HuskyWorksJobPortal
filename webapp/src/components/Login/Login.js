import React from 'react';
import './Login.scss';


// const eyeClick = document.querySelector("[data-password]");
// const password_elem = document.getElementById("password");

// eyeClick.onclick = () => {
//   const icon = eyeClick.children[0];
//   icon.classList.toggle("fa-eye-slash");
//   if (password_elem.type === "password") {
//     password_elem.type = "text";
//   } else if (password_elem.type === "text") {
//     password_elem.type = "password";
//   }
// };


const Login = () => {
    return (
 <div className="container">
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
        <input type="email" className="input-text" placeholder="&nbsp;"/>
        <span className="label">Email</span>
        <span className="input-icon"><i className="fa-solid fa-envelope"></i></span>
      </label>
      <label className="inp">
        <input type="password" className="input-text" placeholder="&nbsp;" id="password"/>
        <span className="label">Password</span>
        <span className="input-icon input-icon-password" data-password><i className="fa-solid fa-eye"></i></span>
      </label>
      <button className="btn btn-login">Login</button>
    </form>
    <p className="text-mute">Not a member? <a href="$">Sign up</a></p>
  </div>

</div>
    );
}
   
  export default Login;
  
