import { Routes, Route } from "react-router-dom";
import App from "./App";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import Layout_1_4 from "./components/boilerplate/layouts/Layout_1_4";
import Layout_1_3_1 from "./components/boilerplate/layouts/Layout_1_3_1";
import OrgDetailsPage from "./pages/organisation/OrgDetailsPage";
import StudentProfile from "./pages/profiles/StudentProfile";

function MainApp(props) {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:job_id" element={<JobDetailPage />} />

      {/* Path for Organization Detail Page */}
      <Route path="/organizations/" element={<OrgDetailsPage />} />
      <Route path="/organizations/:org_id" element={<OrgDetailsPage />} />

      <Route path="/profiles/:student_id" element={<StudentProfile />} />

      {/* DUMMY PATHS TO CHECK LAYOUTS */}
      <Route path="/layout_1_3_1" element={<Layout_1_3_1 />} />
      <Route path="/layout_1_4" element={<Layout_1_4 />} />
    </Routes>
  );
}

export default MainApp;
