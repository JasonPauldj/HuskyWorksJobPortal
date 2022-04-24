import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useSelector } from 'react';
import { ClipLoader } from "react-spinners";


// Add css file here


const NewEducationForm = (props) => {
    // const user = useSelector(state => state.auth.user);
    const [eduBool, setEduBool] = useState(false);
    const [uni, setUni] = useState("");
    const [major, setMajor] = useState("");
    const [gpa, setGpa] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");


    useEffect(() => {
    const timer = setTimeout(() => {
        setEduBool(props.eduBool);
      },500);
      return () => clearTimeout(timer);
    }, [eduBool]);

    const handleEduDiagClose = event => {
        event.preventDefault();
        setEduBool(false);
        console.log("Edu Bool", eduBool)
        props.onChange(eduBool);
      }


    const handleFormSubmit = async () => {
        let education = {
            "student_id": `${props.student_id}`,
            "university": uni,
            "start_date": startDate,
            "end_date": endDate,
            "location": location,
            "major": major,
            "gpa": gpa
            
        }

        const addEducation = async (edu) => {
            const res = await axios.post("http://localhost:9000/educations", {edu});
            console.log(res.data);
            return res;
        }
        addEducation(education);
    }
    return (
        <Dialog open={eduBool} onClose={handleEduDiagClose}>
            
            <DialogContent>
                {eduBool ? (
            <form>
                <div className='new-education__controls'>
                 University <input type="text" name="university" onChange={(e) => setUni(e.target.value)}/>
                 Major <input type="text" id="major" onChange={(e) => setMajor(e.target.value)}/>
                 GPA <input type="number" id="gpa" min="0.01" step="0.01" onChange={(e) => setGpa(e.target.value)}/>
                 Start Date <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)}/>
                 End Date <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)}/>
                 Location <input type="text" id="location" onChange={(e) => setLocation(e.target.value)}/><br/>
                </div>

            </form>) : (<ClipLoader size={60}/>)}
            </DialogContent>
        <DialogActions>
          <Button onClick={handleEduDiagClose}>Close</Button>
          <Button onClick={handleFormSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
            
    )
};

export default NewEducationForm;