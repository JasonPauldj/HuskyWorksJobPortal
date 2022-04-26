import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import LeftSideBar from "./components/boilerplate/left_side_bar/LeftSideBar";
import MainSection from "./components/boilerplate/main_section/MainSection";
import RightSideBar from "./components/boilerplate/right_side_bar/RightSideBar";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
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
import { fetchStudentRegistrations } from "./store/registrations_slice";
import { authActions, userSelector } from "./store/auth_slice";
import AuthService from "./utilities/AuthService";
import NewEducationForm from "./pages/StudentProfile/StudentProfileForms/NewEducationForm";
import NewProjectForm from "./pages/StudentProfile/StudentProfileForms/NewProjectForm";
import NewWorkExForm from "./pages/StudentProfile/StudentProfileForms/NewWorkExForm";
import RecruiterProfile from "./pages/RecruiterProfile/RecruiterProfile";
import AuthService from "./utilities/AuthService";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth_slice";
import { useState, useEffect } from "react";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const applications = useSelector((state) => state.applications.applications);
  const registrations = useSelector(
    (state) => state.registrations.registrations
  );
  const dispatch = useDispatch();
  console.log(isAuth, "isAuth");
  let user = useSelector((state) => state.auth.user);
  // const nav = useNavigate();
  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (!user) {
      user = AuthService.getCurrUser();

      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  //fetching applications from DB for dev purposes.
  //TODO - This shold be called only if logged in as STUDENT. and Id of Student should be passed.
  useEffect(() => {
    dispatch(fetchStudentApplications(user._id));
    dispatch(fetchStudentRegistrations(user._id));
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

            {/*Application routes*/}
            <Route path="/student-applications" element={<ApplicationPage />} />

            {/* Path for Recruiter Post Job */}
            <Route path="/jobs/create-job" element={<CreateJobsPage />} />

            {/* Path for student profile */}
            <Route
              path="/profiles/studentEducation/:student_id"
              element={<NewEducationForm />}
            />
            <Route
              path="/profiles/studentWorkEx/:student_id"
              element={<NewWorkExForm />}
            />
            <Route
              path="/profiles/studentProject/:student_id"
              element={<NewProjectForm />}
            />
            <Route path="/profiles/:student_id" element={<StudentProfile />} />
            <Route
              path="/profiles/:recruiter_id"
              element={<RecruiterProfile />}
            />

            <Route
              path="/profiles/:id"
              element={
                user.isStudent ? <StudentProfile /> : <RecruiterProfile />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
