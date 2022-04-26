import React from "react";
import classes from "./ReviewCard.module.scss";
function ReviewCard(props) {
  return (
    <div className={classes.reviewCard}>
      <div className={classes.cardProfileData}>
        <div className={classes.profileImg}>
          <img
            src={require("../../assets/Barney.jpeg")}
            className={classes.profileImg}
          />
        </div>
        <div className={classes.profileText}>
          <div className={classes.profileName}>{props.name}</div>
          <div className={classes.profileRole}>Senior Game Designer</div>
        </div>
      </div>
      <div className={classes.cardReview}>
        <p>{props.review}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
