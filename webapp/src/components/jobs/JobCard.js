import  CardComponent  from '../genericCard/CardComponent';

function JobCard(props) {
    return (<CardComponent>
        <div>
            <h3>{props.job_title}</h3>
            <h4>{props.job_type}</h4>
            <h5>{props.job_deadline}</h5>
        </div>
    </CardComponent>)
}

export default JobCard