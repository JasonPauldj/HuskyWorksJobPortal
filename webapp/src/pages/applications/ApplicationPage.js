import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import ApplicationCard from '../../components/applications/ApplicationCard';
import classes from './ApplicationPage.module.scss';


function ApplicationPage(props){
   
    const applications = useSelector((state=>state.applications.applications));

    const applicationCards = applications.map((application)=>  <ApplicationCard key={application._id} application={application}/>)


    return (
        <div className="prbg ht-full-viewport py-1">
          <div className="flex-horizontal">
            <div className="ly-1-4-bd-sec-left">
             <Navbar />
            </div>
            <div className="ly-1-4-bd-sec-right">
              <div className="ly-1-4-bd-sec-right-container flex-horizontal">
                <div className="ly-1-4-bd-sec-right-main">
                    {/*add css to this div*/}
                    <div className={classes.applicationCardsWrapper}>
                        {applicationCards}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      );


}

export default ApplicationPage;