import  CardComponent  from '../genericCard/CardComponent';
import {useNavigate} from 'react-router-dom';

function JobCard(props) {
    const navigate = useNavigate();

    const handleCardOnClick = ()=>{
        navigate(`/jobs/${props.job_id}`)
    }

    return (<CardComponent onClick={handleCardOnClick}>
        <div>
            <h3>{props.job_title}</h3>
            <h4>{props.job_type}</h4>
            <h5>{props.job_deadline}</h5>
        </div>
    </CardComponent>)
}

export default JobCard