import axios from 'axios';
import React, {useState  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
// Add css file here


const NewWorkExForm = () => {

    let { state } = useLocation();
    const [title, setTitle] = useState(state.workEx ? state.workEx.title : "");
    const [employerName, setEmployerName] = useState(state.workEx ? state.workEx.employer_name : "" );
    const [startDate, setStartDate] = useState(state.workEx ? dateFormat(state.workEx.start_date, "yyyy-mm-dd") : "");
    const [endDate, setEndDate] = useState(state.workEx ? dateFormat(state.workEx.end_date, "yyyy-mm-dd") : "");
    const [location, setLocation] = useState(state.workEx ? state.workEx.location : "");
    const [description, setDescription] = useState(state.workEx ? state.workEx.description : "");
    const nav = useNavigate();
    let user = useSelector((state) => state.auth.user);

    const handleFormSubmit = async () => {
        let workEx = {
            student_id: "6265ea2f57c0502e065ed034",
            title: title,
            employer_name: employerName,
            start_date: startDate,
            end_date: endDate,
            location: location,
            description: description,
            }

    const addWorkEx = async (workEx) => {
        return await axios({
            method: "POST",
            url: `http://localhost:9000/experiences`,
            data: workEx,
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
        }
        addWorkEx(workEx);
        handleWorkExDiagClose();
        }

    const handleWorkExDiagClose = () => {
        // nav(`/profiles/${student_id}`);
           nav(`/profiles/6265ea2f57c0502e065ed034`);
       }

    const handleFormUpdate = async () => {
        let workEx = {
            student_id: "6265ea2f57c0502e065ed034",
            title: title,
            employer_Name: employerName,
            start_date: startDate,
            end_date: endDate,
            location: location,
            description: description,
            }
    
            const updateWorkEx = async (workEx) => {
                return await axios({
                    method: "PUT",
                    url: `http://localhost:9000/experiences/${state.workEx._id}`,
                    data: workEx,
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
                }
                updateWorkEx(workEx);
                handleWorkExDiagClose();
       }

       
    return (
        <div>
             <form>
                <div className='new-experience__controls'>
                    <label> Title <input id="title" onChange={(e) => setTitle(e.target.value)} value={title}/></label><br/>
                    <label> Employer name <input id="employer_name" onChange={(e) => setEmployerName(e.target.value)} value={employerName} /></label><br/>
                    <label> Start Date <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} /></label><br/>
                    <label> End Date <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} /></label><br/>
                    <label> Location <input id="location" onChange={(e) => setLocation(e.target.value)} value={location} /></label><br/>
                    <label> Description <input id="description" onChange={(e) => setDescription(e.target.value)} value={description} /></label><br/>
                </div>
                <Button onClick={state.workEx ? handleFormUpdate : handleFormSubmit}>{state.workEx ? "Update" : "Submit"}</Button>
             </form>
            <div>
             <Button onClick={handleWorkExDiagClose}>Close</Button>
            </div>  

        </div>
           
    )
};

export default NewWorkExForm;