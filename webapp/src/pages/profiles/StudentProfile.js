import React from 'react';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import CardComponent from '../../components/genericComponent/genericCard/CardComponent';
import classes from "./StudentProfile.module.scss";
import NewProjectForm from './StudentProfile/NewProjectForm';
import NewWorkExForm from './StudentProfile/NewWorkExForm';
import NewEducationForm from './StudentProfile/NewEducationForm';
import EditIcon from '@mui/icons-material/Edit';
import dateFormat from 'dateformat';
import AuthService from "../../utilities/AuthService";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";


function StudentProfile(props) {

  let user = useSelector((state) => state.auth.user);
  console.log(user, "user");

  //const isAuth = useSelector(state => state.auth.isAuthenticated);
  //console.log(isAuth, "isAuth");

  const [student, setStudentProfile] = useState({});
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [workEx, setWorkEx] = useState([]);
  const nav = useNavigate();
  const dispatch = useDispatch();


  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (user.length == 0) {
      user = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  //load initial student details 
  useEffect(() => {
            const fetchStudentDetails = async () => {
                // const response = await axios.get(`http://localhost:9000/students/${user._id}`);
                // setStudentProfile(response.data);
                return await axios({
                  method: "GET",
                 url: `http://localhost:9000/students/${user._id}`,
                 headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                  }
                }).then(res => setStudentProfile(res.data)).catch(err=>console.log(err.data));
            };
            fetchStudentDetails();
    }, []);

  //load initial education details for the particular student
  useEffect(() => {
      const fetchEducation = async () => {
        const res = await axios.get(`http://localhost:9000/educations?student_id=${user._id}`);
        setEducation(res.data);
      };
      fetchEducation();
    }, []);


  //load initial project details for the particular student
  useEffect(() => {
    const fetchProject = async () => {
      const res = await axios.get(`http://localhost:9000/projects?student_id=${user._id}`);
      // const res = await axios.get(`http://localhost:9000/projects?student_id=6265ea2f57c0502e065ed034`);
      setProject(res.data);
    };
    fetchProject();
  }, []);


  //load initial project details for the particular student
  //not working as expected; fetching all project rows
  useEffect(() => {
    const fetchWorkEx = async () => {
     const res = await axios.get(`http://localhost:9000/experiences/?student_id=${user._id}`);
      // const res = await axios.get(`http://localhost:9000/experiences/?student_id=6265ea2f57c0502e065ed034`);
      
      setWorkEx(res.data);
    };
    fetchWorkEx();
  }, []);

  const handleAddEdu = () => {
    nav(`/profiles/studentEducation/${user._id}`, {state: {education: null}});
    // nav(`/profiles/studentEducation/6265ea2f57c0502e065ed034`, {state: {education: null}});
  }

  const handleEduEdit = (edu) => {
    console.log("Edu Edit Triggered!")
    // console.log(eduBool);
   nav(`/profiles/studentEducation/${user._id}`, {state: {education: edu}});
    // nav(`/profiles/studentEducation/6265ea2f57c0502e065ed034`, {state: {education: edu}});
    
    }

  const handleAddProject = () => {
   nav(`/profiles/studentProject/${user._id}`, {state: {project: null}});
  //  nav(`/profiles/studentProject/6265ea2f57c0502e065ed034`, {state: {project: null}});
   
  }

  const handleProjectEdit = (proj) => {
      console.log("Project Edit Btn Pressed!")
      // console.log(eduBool);
     nav(`/profiles/studentProject/${user._id}`, {state: {project: proj}});
      // nav(`/profiles/studentProject/6265ea2f57c0502e065ed034`, {state: {project: proj}});
      
      }

  const handleAddWorkEx = () => {
     nav(`/profiles/studentWorkEx/${user._id}`, {state: {workEx: null}});
      // nav(`/profiles/studentWorkEx/6265ea2f57c0502e065ed034`, {state: {workEx: null}});
      
    }

  const handleWorkExEdit = (work) => {
        console.log("WorkEx Edit Btn Pressed!")
        // console.log(eduBool);
       nav(`/profiles/studentWorkEx/${user._id}`, {state: {workEx: work}});
      //  nav(`/profiles/studentWorkEx/6265ea2f57c0502e065ed034`, {state: {workEx: work}});
       
        }

  const handleDivClick = (idx) => {
    console.log("Expanded", idx);
    let element = document.getElementsByClassName(classes.divClick);
    console.log("Element", element[idx]);
    element[idx].classList.toggle(classes.divClickExpanded);
  }

    //Cards with existing education details
  const eduCards = education.map((edu, idx) => {
      return <CardComponent key ={edu._id} className={classes.divClick} onClick={() => handleDivClick(idx)}>
        <div className="eduDetails">
        <div className={classes.divTitle}>
        <div className={classes.divTitleText}>
        <h3>{edu.university}</h3>
        </div>
        <div className={classes.divTitleBtn}>
        <EditIcon onClick={() => handleEduEdit(edu)} style={{fontSize: "2rem"}}/>
        </div>
        </div>
        <div className={classes.divTextDetails}>

          <h3>{edu.major}</h3>
          <div className="eduDates">
            <p>{dateFormat(edu.start_date, "yyyy-mm-dd") } - {dateFormat(edu.end_date, "yyyy-mm-dd")}</p>
          </div>
        </div>
        </div>
      </CardComponent>
    });

    //Cards with existing project details
    const projectCards = project.map((project, idx) => {
      return <CardComponent key ={project._id} className={classes.divClick} onClick={() => handleDivClick(idx)}>
        <div className="projectDetails">
        <div className={classes.divTitle}>
        <div className={classes.divTitleText}>
        <h3>{project.project_title}</h3>
        </div>
        <div className={classes.divTitleBtn}>
        <EditIcon onClick={() => handleProjectEdit(project)} style={{fontSize: "2rem"}}/>
        </div>
        </div>
        <div className={classes.divTextDetails}>
          <div className="projectDates">
            <p>{dateFormat(project.start_date, "yyyy-mm-dd") } - {dateFormat(project.end_date, "yyyy-mm-dd")}</p>
          </div>
        </div>
        </div>
      </CardComponent>
    });

    //Cards with existing project details
    const workExCards = workEx.map((workEx, idx) => {
      return <CardComponent key ={workEx._id} className={classes.divClick} onClick={() => handleDivClick(idx)}>
        <div className="workExDetails">
          <div className={classes.divTitle}>
          <div className={classes.divTitleText}>
            
          <h3>{workEx.title}</h3></div>
          <div className={classes.divTitleBtn}>
          <EditIcon onClick={() => handleWorkExEdit(workEx)} style={{fontSize: "2rem"}}/></div>
          </div>
        <div className={classes.divTextDetails}>
          <h3>{workEx.employer_name}</h3>
          <div className="projectDates">

            {/* trim dates to just show month n year */}
            <p>{dateFormat(workEx.start_date, "yyyy-mm-dd") } - {dateFormat(workEx.end_date, "yyyy-mm-dd")}</p>
          </div>
        </div>
        </div>
      </CardComponent>
    });

    const StudentProfileCard = (props) =>{ 
        return(
        <CardComponent className={classes.divCardsContainer}>

            <div className={classes.studentHeader}>
           
                <div className={classes.studentProfileImg}/>
                <div className={classes.studentDetails}>
                  <h3>{user.userName}</h3>
                  <h5>{student.major}MS in Software Engineering Systems</h5>
                  {/* <h5>{student.gpa}GPA: 3.7</h5> */}
                  <h5>{student.email}stinsons.bar@northeastern.edu</h5>
                  <h5>{student.nuid}nuid</h5>
                </div>

                  
                </div>
              
            <br/> <hr/>
            <div>
                <div className={classes.divTitle}>
                  <div className={classes.divTitleText}>Education Details</div>
                  <div className={classes.divTitleBtn}>
                 <button onClick={handleAddEdu}> + Add </button>
                  </div>
                  </div>
                  {eduCards}
            </div>
            <div>
                <div className={classes.divTitle}>
                  <div className={classes.divTitleText}>Add Experience</div>
                  <div className={classes.divTitleBtn}>
                 <button onClick={handleAddWorkEx}> + Add </button>
                  </div>
                  </div>
                    {workExCards}
            </div>
            <div>
                <div className={classes.divTitle}>
                  <div className={classes.divTitleText}>Add Project</div>
                  <div className={classes.divTitleBtn}>
                 <button onClick={handleAddProject}> + Add </button>
                  </div>
                  </div>
                    {projectCards}
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
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}



export default StudentProfile;