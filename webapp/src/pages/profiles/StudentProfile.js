import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import CardComponent from '../../components/genericComponent/genericCard/CardComponent';
import "./StudentProfile.scss";
// import TextField from "@material-ui/core/TextField";


function StudentProfile(props) {

    const [student, setStudentProfile] = useState({});
    const params = useParams();
    const student_id = params.student_id;

    const handleSubmit = event => {
        event.preventDefault();
        alert('You have submitted the form.')
      }

    //load initial student details 
    useEffect(() => {
            const fetchStudentDetails = async () => {
                const response = await axios.get(`http://localhost:9000/students/${student_id}`);
                setStudentProfile(response.data);
            }
            //   const data = await response.json();
            fetchStudentDetails();
    }, [])


    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [gpa, setGpa] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [location, setLocation] = useState("");

    let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
         university: university,
         major: major,
         mobileNumber: mobileNumber,
        }),
    });


    const StudentProfileCard = (props) =>{ 
        return(
        <CardComponent >
            <div className="formWrapper">
            <form onSubmit={handleSubmit}>
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
                
            <fieldset>
                <legend>Personal Information</legend>
                Firstname <input name="firstName" />
                Lastname <input name="lastName" /><br/>
                NUID <input name="nuid" />
                Major <input name="major" />
                GPA <input name="gpa" />
                Email <input name="email" />
            </fieldset>

            <fieldset>
                <legend> Education Details</legend>
                 University <input type="text" name="university" />
                 Major <input name="major" />
                 GPA <input name="gpa" />
                 Start Date <input type="date" name="start_date" />
                 End Date <input type="date" name="end_date" />
                 Location <input name="location" /><br/>
                <button> Add Education </button>
            </fieldset>

            <fieldset>
                <legend> Work Experience</legend>
                <label> Title <input name="title" /></label>
                <label> Employer name <input name="employer_name" /></label>
                <label> Start Date <input type="date" name="start_date" /></label>
                <label> End Date <input type="date" name="end_date" /></label>
                <label> Location <input name="location" /></label>
                <label> Description <input name="description" /></label><br/>
                <button> Add Experience </button>
            </fieldset>


            <fieldset>
                <legend> Personal Projects</legend>
                <label> Project Title <input name="project_title" /></label>
                <label> Start Date <input type="date" name="start_date" /></label>
                <label> End Date <input type="date" name="end_date" /></label>
                <label> Location <input name="location" /></label>
                <label> Description <input name="project_description" /></label><br/>
                <button> Add Project </button>
            </fieldset>
            <br/>
            <button type="submit">Submit</button>
  
            </form>
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