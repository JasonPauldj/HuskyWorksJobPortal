import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import LeftSideBar from "./components/boilerplate/left_side_bar/LeftSideBar";
import MainSection from "./components/boilerplate/main_section/MainSection";
import RightSideBar from "./components/boilerplate/right_side_bar/RightSideBar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentProfile from "./pages/profiles/StudentProfile";
import SignUpStudent from "./components/Login/SignUpStudent";
import RecruiterSignUp from "./components/Login/RecruiterSignUp";
import RecruiterDashboard from "./pages/dashboards/RecruiterDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import JobsPage from "./pages/jobs/JobsPage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import OrgDetailsPage from "./pages/organisation/OrgDetailsPage";
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import CreateEventsPage from "./pages/events/CreateEventsPage";
import CreateOrgPage from "./pages/organisation/CreateOrgPage";
import { fetchStudentApplications } from "./store/applications_slice";
import { useEffect } from "react";
import ApplicationPage from "./pages/applications/ApplicationPage";
import CreateJobsPage from "./pages/jobs/CreateJobsPage";
import RecruiterApplicationPage from "./pages/applications/RecruterApplicationPage";
import AuthService from './utilities/AuthService';
import {authActions} from './store/auth_slice';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const applications = useSelector((state) => state.applications.applications);
  console.log(isAuth, "isAuth");

  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);


  const checkUser = () => {
    //if user not in store
    if (!user) {
      user = AuthService.getCurrUser();
      
      //if user not in persistent local store
      if(!user)
      {
        return;
      }
      //add user to store
       dispatch(authActions.login(user));
    }


  };

  useEffect(() => {
    checkUser();
  }, []);

  //fetching applications from DB for dev purposes.
  //TODO - This shold be called only if logged in as STUDENT. and Id of Student should be passed.
  
  
  useEffect(() => {
    if(user && user.student){
    dispatch(fetchStudentApplications(user.student._id));
    }
  }, []);


  return (
    <div className="prbg">
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={!isAuth ? <Login /> : ( user.student ? <Navigate to={`/dashboard-student/${user.student._id}`} /> : <Navigate to={`/dashboard-recruiter/${user.recruiter._id}`} />  )}
            ></Route>
            <Route path="/student/:id" element={<StudentProfile />}></Route>
            <Route path="/signup-student" element={<SignUpStudent />}></Route>
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:job_id" element={<JobDetailPage />} />

            {/* Path for Organizations*/}
            <Route path="/organizations" element={<OrgDetailsPage />} />
            <Route path="/organizations/:org_id" element={<OrgDetailsPage />} />
            <Route
              path="/organizations/create-org"
              element={<CreateOrgPage />}
            />

            {/* Path for Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:event_id" element={<EventDetailsPage />} />
            <Route path="/events/create-event" element={<CreateEventsPage />} />
            <Route path="/signup-recruiter" element={<RecruiterSignUp />}></Route>
            <Route path="/dashboard-student/:id" element={<StudentDashboard />}></Route>
            <Route path="/dashboard-recruiter/:id" element={<RecruiterDashboard />}></Route>

            {/*Application routes*/}
            <Route path="/student-applications" element={<ApplicationPage />} />     

            {/* Path for Recruiter Post Job */} 
            <Route path="/jobs/create-job" element={<CreateJobsPage />} />    

            {/* Path for Recruiter View Applications */} 
            <Route path="/applications/:job_id" element={<RecruiterApplicationPage />} />  

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
