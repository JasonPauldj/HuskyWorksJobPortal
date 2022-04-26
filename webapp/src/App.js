import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import LeftSideBar from "./components/boilerplate/left_side_bar/LeftSideBar";
import MainSection from "./components/boilerplate/main_section/MainSection";
import RightSideBar from "./components/boilerplate/right_side_bar/RightSideBar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentProfile from "./pages/profiles/StudentProfile";
import SignUpStudent from "./components/Login/SignUpStudent";
import RecruiterSignUp from "./components/Login/RecruiterSignUp";
import RecruiterDashboard from "./pages/dashboards/RecruiterDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import JobsPage from "./pages/jobs/JobsPage";
import { useSelector, useDispatch } from "react-redux";
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

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const applications = useSelector((state) => state.applications.applications);
  console.log(isAuth, "isAuth");

  const dispatch = useDispatch();

  //fetching applications from DB for dev purposes.
  //TODO - This shold be called only if logged in as STUDENT. and Id of Student should be passed.
  useEffect(() => {
    dispatch(fetchStudentApplications("6266dfbe83f165d16ae1ef02"));
  }, []);

  return (
    <div className="prbg">
      <Router>
        <div className="app-state">
          <Routes>
            <Route
              path="/"
              element={!isAuth ? <Login /> : <JobsPage />}
            ></Route>
            <Route path="/student/:id" element={<StudentProfile />}></Route>
            <Route path="/signup-student" element={<SignUpStudent />}></Route>
            <Route
              path="/signup-recruiter"
              element={<RecruiterSignUp />}
            ></Route>
            <Route
              path="/dashboard-student/:id"
              element={<StudentDashboard />}
            ></Route>
            <Route
              path="/dashboard-recruiter/:id"
              element={<RecruiterDashboard />}
            ></Route>
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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
