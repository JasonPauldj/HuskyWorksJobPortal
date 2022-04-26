import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import LeftSideBar from "./components/boilerplate/left_side_bar/LeftSideBar";
import MainSection from "./components/boilerplate/main_section/MainSection";
import RightSideBar from "./components/boilerplate/right_side_bar/RightSideBar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import SignUpStudent from "./components/Login/SignUpStudent";
import RecruiterSignUp from "./components/Login/RecruiterSignUp";
import RecruiterDashboard from "./pages/dashboards/RecruiterDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import { useSelector } from "react-redux";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import OrgDetailsPage from "./pages/organisation/OrgDetailsPage";
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import CreateEventsPage from "./pages/events/CreateEventsPage";
import CreateOrgPage from "./pages/organisation/CreateOrgPage";
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
  console.log(isAuth, "isAuth");
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);

  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (user.length == 0) {
      user = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="prbg">
      <Router>
        <div>
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
