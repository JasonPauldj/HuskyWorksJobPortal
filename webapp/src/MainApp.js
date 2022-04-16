import {Routes, Route} from 'react-router-dom';
import App from './App';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
 
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