import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';


// Add css file here


const NewEducationForm = (props) => {
    // const user = useSelector(state => state.auth.user);
    let { state } = useLocation();
    const [uni, setUni] = useState(state.education ? state.education.university : "");
    const [major, setMajor] = useState(state.education ? state.education.major : "");
    const [gpa, setGpa] = useState(state.education ? state.education.gpa : "");
    const [startDate, setStartDate] = useState(state.education ? dateFormat(state.education.start_date, "yyyy-mm-dd") : "");
    const [endDate, setEndDate] = useState(state.education ? dateFormat(state.education.end_date, "yyyy-mm-dd") : "");
    const [location, setLocation] = useState(state.education ? state.education.location: "");
    let user = useSelector((state) => state.auth.user);
    const nav = useNavigate();

    const handleFormSubmit = async () => {
        let education = {
            student_id: "6265ea2f57c0502e065ed034",
            university: uni,
            start_date: startDate,
            end_date: endDate,
            location: location,
            major: major,
            gpa: gpa
            
        }

        const addEducation = async (edu) => {
            return await axios({
              method: "POST",
              url: "http://localhost:9000/educations",
              data: edu,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                accept: "*/*",
                "authorization": `bearer ${user._id}`
              },
              validateStatus: (status) => {
                return true;
              },
            })
              .catch((err) => console.log(err.response.data));
          };
      
          addEducation(education);
          handleEduDiagClose();
    }

    const handleFormUpdate = () => {
        let education = {
            student_id: "",
            university: uni,
            start_date: startDate,
            end_date: endDate,
            location: location,
            major: major,
            gpa: gpa
            
        }

        const updateEducation = async (edu) => {
            return await axios({
              method: "PUT",
              url: `http://localhost:9000/educations/${state.education._id}`,
              data: edu,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "authorization": `bearer ${user._id}`,
                accept: "*/*",
              },
              validateStatus: (status) => {
                return true;
              },
            })
              .catch((err) => console.log(err.response.data));
          };
      
          updateEducation(education);
          handleEduDiagClose();
    }

const handleEduDiagClose = () => {
   //  nav(`/profiles/${student_id}`);
     nav(`/profiles/6265ea2f57c0502e065ed034`);
}

    return (
        <div>
            <form>
                <div className='new-education__controls'>
                 University <input type="text" id="university" onChange={(e) => setUni(e.target.value)} value={uni}/><br/>
                 Major <input type="text" id="major" onChange={(e) => setMajor(e.target.value)} value={major}/><br/>
                 GPA <input type="number" id="gpa" min="0.01" step="0.01" onChange={(e) => setGpa(e.target.value)} value={gpa}/><br/>
                 Start Date <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate}/><br/>
                 End Date <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate}/><br/>
                 Location <input type="text" id="location" onChange={(e) => setLocation(e.target.value)} value={location}/><br/><br/>
                </div>

          <Button onClick={state.education ? handleFormUpdate : handleFormSubmit}>{state.education ? "Update" : "Submit"}</Button>
            </form>
        <div>
            <Button onClick={handleEduDiagClose}>Close</Button>
        </div>    
        </div>  
            
    )
};

export default NewEducationForm;