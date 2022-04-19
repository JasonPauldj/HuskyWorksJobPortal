import {Routes, Route} from 'react-router-dom';
import App from './App';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
 
function MainApp (props) {
    return(
        <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:job_id' element={<JobDetailPage />} />
        </Routes>
    )

}

export default MainApp;