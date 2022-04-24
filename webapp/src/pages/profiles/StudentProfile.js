import React from 'react';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import CardComponent from '../../components/genericComponent/genericCard/CardComponent';
import "./StudentProfile.scss";
import EducationDetails from './StudentProfile/StudentEducation';
import ProjectDetails from './StudentProfile/StudentProjects';
import WorkExDetails from './StudentProfile/StudentWorkEx';
import NewEducationForm from './StudentProfile/StudentEducation';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions } from '@mui/material';
// import TextField from "@material-ui/core/TextField";


function StudentProfile(props) {

  const user = useSelector(state => state.auth.user);
  // console.log(user, "user");
  // const isAuth = useSelector(state => state.auth.isAuthenticated);
  // console.log(isAuth, "isAuth");

  const [student, setStudentProfile] = useState({});
  const params = useParams();
  const student_id = params.student_id;
  const [eduBool, setEduBool] = useState(false);
  const [education, setEducation] = useState([]);


  const handleEduBtnClick = event => {
    console.log("Edit Btn Pressed!")
    // console.log(eduBool);
    event.preventDefault();
        setEduBool(true);
    }


    // const eduDia
  //load initial student details 
  useEffect(() => {
            const fetchStudentDetails = async () => {
                const response = await axios.get(`http://localhost:9000/students/${student_id}`);
                setStudentProfile(response.data);
            }
            //   const data = await response.json();
            fetchStudentDetails();
    }, [])

    useEffect(() => {
      const fetchEducation = async () => {
        const res = await axios.get(
          `http://localhost:9000/educations/?student_id=${student_id}`
        );
        setEducation(res.data);
      };
  
      fetchEducation();
    }, []);

    const handleBoolChange = () => {
      setEduBool(false);
    }

    const eduCards = education.map((edu) => {
      return <CardComponent key ={edu._id}>
        <div className="eduDetails">
          <h3>{edu.university}</h3>
          <h3>{edu.major}</h3>
          <div className="eduDates">
            <p>{edu.start_date}</p>
            <p>{edu.end_date}</p>
          </div>
          <Button onClick={handleEduBtnClick}>Edit</Button>
        </div>
      </CardComponent>
    });

    const StudentProfileCard = (props) =>{ 
        return(
        <CardComponent >
            <div className="formWrapper">
           
                <div className="formHeader">
                    <header>
                    <div>
                    <input type="file"/>
                    <button>Upload</button>
                    <br/>
                </div>
                <div>
                    Hello {student.username}
                </div>
                </header>
            <hr/>
                </div>
                
            <div>
                <legend>Personal Information</legend>
                Firstname <input name="firstName" />
                Lastname <input name="lastName" /><br/>
                NUID <input name="nuid" />
                Major <input name="major" />
                GPA <input name="gpa" />
                Email <input name="email" />
            </div>

            <div>
                <legend> Education Details</legend>
{/*                
                  <EducationDetails/> */}
                  {eduCards}
                <button onClick={handleEduBtnClick}> Add Education </button>
            </div>

            <div>
                <legend> Work Experience</legend>
                <WorkExDetails/>
                <button> Add Experience </button>
            </div>


            <div>
                <legend> Personal Projects</legend>
                 <ProjectDetails/>
                <button> Add Project </button>
            </div>
            <br/>
            <button type="submit">Submit</button>
  
            </div>
        </CardComponent>
    )
}

return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-4-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar/>
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
            {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
            <StudentProfileCard/>
            {eduBool ? <NewEducationForm eduBool={eduBool} onChange={handleBoolChange} student_id={student_id}/> : null}
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}



export default StudentProfile;