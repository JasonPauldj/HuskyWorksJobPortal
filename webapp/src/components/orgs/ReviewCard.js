import React from "react";
import "./ReviewCard.scss";
function ReviewCard(props) {
  return (
    <div className="reviewCard">
      <div className="card-profileData">
        <div className="profileImg">
          <img
            src={require("../../assets/Barney.jpeg")}
            className="profileImg"
          />
        </div>
        <div className="profileText">
          <div className="profileName">{props.nuid}</div>
          <div className="profileRole">Senior Game Designer</div>
        </div>
      </div>
      <div className="card-review">
        <p>{props.review}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
