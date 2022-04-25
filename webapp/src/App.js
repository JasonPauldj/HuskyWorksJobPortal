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
import { useSelector } from "react-redux";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import OrgDetailsPage from "./pages/organisation/OrgDetailsPage";
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import CreateEventsPage from "./pages/events/CreateEventsPage";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuth, "isAuth");

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

            {/* Path for Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:event_id" element={<EventDetailsPage />} />
            <Route path="/events/create-event" element={<CreateEventsPage />} />
          </Routes>
        </div>
      </Router>
      {/* <Fragment>
        <Login/>
      </Fragment> */}
      {/* <div className="flex-horizontal py-1">
        <div className="ly-1-3-1-bd-sec-left">
          <Navbar />
        </div>
        <div className="ly-1-3-1-bd-sec-right">
          <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
            <div className="ly-1-3-1-bd-sec-right-main">
            <MainSection />
            </div>
            <div className="ly-1-3-1-bd-sec-right-sidebar">
            <RightSideBar />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
