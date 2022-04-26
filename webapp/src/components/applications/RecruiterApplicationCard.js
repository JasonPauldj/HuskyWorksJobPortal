import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from './RecruiterApplicationCard.module.scss';

function RecruiterApplicationCard(props) {

    const [student, setStudent] = useState({});

    //fetching the student information from the application 
    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`http://localhost:9000/students/?student_id=${props.application.student_id}`);
            setStudent(response.data[0]);
        };
        fetchStudent();
    }, [])

    return (
        <>
            {student &&
                <CardComponent className={`${classes.applicationCard}`}>
                    <div className={classes.labels}>
                        <div>{`Name :`}</div>
                        <div>{`Major :`}</div>
                        <div>{`GPA :`}</div>
                        <div>{`Email : `}</div>
                        <div>{`Applied On : `}</div>
                    </div>
                    <div>
                        <div>{`${student.firstname} ${student.lastname}`}</div>
                        <div>{student.major}</div>
                        <div>{student.gpa ? student.gpa.$numberDecimal : ''}</div>
                        <div>{student.email}</div>
                        <div>{props.application.application_date.split("T")[0]}</div>
                    </div>
                </CardComponent>
            }
        </>

    )

}

export default RecruiterApplicationCard;