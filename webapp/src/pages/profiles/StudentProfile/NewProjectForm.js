import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
// Add css file here


const NewProjectForm = (props) => {
    // const user = useSelector(state => state.auth.user);
    //const [eduBool, setEduBool] = useState(false);
    let { state } = useLocation();
    const [project_title, setTitle] = useState(state.project ? state.project.project_title : "");
    const [startDate, setStartDate] = useState(state.project ? dateFormat(state.project.start_date, "yyyy-mm-dd") : "");
    const [endDate, setEndDate] = useState(state.project ? dateFormat(state.project.end_date, "yyyy-mm-dd") : "");
    const [location, setLocation] = useState(state.project ? state.project.location : "");
    const [project_description, setDescription] = useState(state.project ? state.project.project_description : "");
    const nav = useNavigate();
    let user = useSelector((state) => state.auth.user);

    const handleFormSubmit = async () => {
        let project = {
            student_id: "6265ea2f57c0502e065ed034",
            project_title: project_title,
            start_date: startDate,
            end_date: endDate,
            location: location,
            project_description: project_description,
            }

    const addProject = async (project) => {
        return await axios({
            method: "POST",
            url: `http://localhost:9000/projects`,
            data: project,
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
        addProject(project);
        handleProjDiagClose();
    }

    const handleProjDiagClose = () => {
    // nav(`/profiles/${student_id}`);
       nav(`/profiles/6265ea2f57c0502e065ed034`);
   }

   const handleFormUpdate = async () => {
    let project = {
        student_id: "6265ea2f57c0502e065ed034",
        project_title: project_title,
        start_date: startDate,
        end_date: endDate,
        location: location,
        project_description: project_description,
        }

        const updateProject = async (project) => {
            return await axios({
                method: "PUT",
                url: `http://localhost:9000/projects/${state.project._id}`,
                data: project,
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
            updateProject(project);
            handleProjDiagClose();
   }

    return (
        <div>
            <form>
                <div className='new-project__controls'>
                <label> Project Title <input id="project_title" onChange={(e) => setTitle(e.target.value)} value={project_title}/></label><br/>
                <label> Start Date <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} /></label><br/>
                <label> End Date <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} /></label><br/>
                <label> Location <input id="location" onChange={(e) => setLocation(e.target.value)} value={location}/></label><br/>
                <label> Description <input id="project_description" onChange={(e) => setDescription(e.target.value)} value={project_description} /></label><br/>
                </div>
                <Button onClick={state.project ? handleFormUpdate : handleFormSubmit}>{state.project ? "Update" : "Submit"}</Button>
            </form>
            <div>
                 <Button onClick={handleProjDiagClose}>Close</Button>
            </div>
        </div>
            
    )
};

export default NewProjectForm;