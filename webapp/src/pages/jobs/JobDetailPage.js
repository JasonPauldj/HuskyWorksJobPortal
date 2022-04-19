import Navbar from "../../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CardComponent from '../../components/genericComponent/genericCard/CardComponent';

function JobDetailPage(props) {
    const [job, setJob] = useState({});

    const params = useParams();
    const job_id = params.job_id;

    useEffect(() => {
        const fetchJob = async () => {
            const response = await axios.get(`http://localhost:9000/jobs/${job_id}`);
            setJob(response.data);
        }
        //   const data = await response.json();
        fetchJob();

    }, [])

    const JobDetailCard = (props) =>{ 
        return(
        <CardComponent>
            <div>
                <h3>{job.job_title}</h3>
                <h4>{job.job_type}</h4>
                <h5>{new Date(job.job_deadline).toLocaleDateString()}</h5>
                <p>{job.job_description}</p>
                <p>{job.job_responsibilities}</p>
            </div>
        </CardComponent>
    )
}

    return (<>
     <div className="prbg">
        <div className="flex-horizontal py-1">
          <div className="ly-1-3-1-bd-sec-left my-1">
          <Navbar />
          </div>
          <div className="ly-1-3-1-bd-sec-right">
            <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
              <div className="ly-1-3-1-bd-sec-right-main">
              {job && <JobDetailCard /> }
              </div>
              <div className="ly-1-3-1-bd-sec-right-sidebar">
               {/*HERE IS WHERE YOUR RIGHT CONTENT SHOULD GO*/}   
              </div>
            </div>
          </div>
        </div>
      </div>
 
        {/* <div className="flex-horizontal">
            <div className="body-section-left">
                <div className="leftSideBar">
                </div>
            </div>
            <div className="body-section-right">
               
            </div>
        </div> */}
    </>)

}

export default JobDetailPage;