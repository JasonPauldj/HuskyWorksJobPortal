import {useState} from 'react';
import Navbar from '../components/navbar/Navbar'
import LeftSideBar from '../components/left_side_bar/LeftSideBar';
import FilterSectionComponent from '../components/FIlterSectionComponent';

const JOB_TYPE_FILTERS= ["FULLTIME", "PARTTIME", "INTERNSHIP"];

function JobsPage(props) {
    
    const [appliedJobTypeFilters, setJobTypeFilters] = useState([]);

    const isJobTypeSelected=(jobTypeValue)=> appliedJobTypeFilters.includes(jobTypeValue)
    
    const handleJobTypeCheckboxChange = (jobTypeValue) =>{
        let updatedJobTypeFilters;
        
        //the filter was selected, remove it from appliedFilters
        if(isJobTypeSelected(jobTypeValue)){
            updatedJobTypeFilters=appliedJobTypeFilters.filter((JTV)=> JTV !== jobTypeValue)
        }
        //the filter was not selected, add it to appliedFilters\
        else{
            updatedJobTypeFilters =[...appliedJobTypeFilters,jobTypeValue];
        }
        setJobTypeFilters(updatedJobTypeFilters);
    }
    
    return (<>
        <Navbar />
        <div className="body-section-left">
            <div className="leftSideBar">
                <FilterSectionComponent values={JOB_TYPE_FILTERS} isChecked={isJobTypeSelected} handleCheckboxChange={handleJobTypeCheckboxChange} />
            </div>
        </div>
        <div>This is jobs page</div>
    </>)
}

export default JobsPage;