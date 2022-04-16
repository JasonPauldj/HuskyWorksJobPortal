import {Routes, Route} from 'react-router-dom';
import App from './App';
import JobsPage from './pages/JobsPage';
 
function MainApp (props) {
    return(
        <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/jobs' element={<JobsPage />} />
        </Routes>
    )

}

export default MainApp;