import React from "react";
import AuthService from "../../utilities/AuthService";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";

function RecruiterProfile(props) {
  let user = useSelector((state) => state.auth.user);
  console.log(user, "user");

  const [recruiter, setRecruiterProfile] = useState({});
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
    const fetchRecruitertDetails = async () => {
      // const response = await axios.get(`http://localhost:9000/students/${user.recruiter._id}`);
      // setStudentProfile(response.data);
      return await axios({
        method: "GET",
        url: `http://localhost:9000/recruiters/${user._id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => setRecruiterProfile(res.data))
        .catch((err) => console.log(err.data));
    };
    fetchRecruitertDetails();
  }, []);

  const RecruiterProfileCard = (props) => {
    return (
      <CardComponent>
        <div className={classes.studentHeader}>
          <div className={classes.studentProfileImg} />
          <div className={classes.studentDetails}>
            <h3>{recruiter.username}</h3>
            <h5>{recruiter.firstname}</h5>
            <h5>{recruiter.lastname}</h5>
            <h5>{recruiter.organization_id}</h5>
            <h5>{recruiter.email}</h5>
          </div>
          <EditIcon
            onClick={() => handleEduEdit(edu)}
            style={{ fontSize: "2rem" }}
          />
        </div>
      </CardComponent>
    );
  };

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-4-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              <StudentProfileCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
