import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import ReviewCard from "./ReviewCard";
import classes from "./ReviewContainer.module.scss";
import SendIcon from "@mui/icons-material/Send";

function ReviewContainer(props) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    let url = `http://localhost:9000/reviews?organizationId=${props.organizationId}`;
    const fetchReviews = async () => {
      const response = await axios.get(url);
      setReviews(response.data);
    };
    fetchReviews();
  }, []);

  const [rev, setRev] = useState("");
  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const review = {
      nuid: "002122052",
      organizationId: props.organizationId,
      review: rev,
    };

    const postReview = async (rev) => {
      return await axios({
        method: "POST",
        url: "http://localhost:9000/reviews",
        data: rev,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
        },
        validateStatus: (status) => {
          return true;
        },
      })
        .then((res) => setReviews([...reviews, res.data]))
        .catch((err) => console.log(err.response.data));
    };

    postReview(review);
    setRev("");
  };
  const reviewCards = reviews.map((review, index) => {
    return <ReviewCard key={index} nuid={review.nuid} review={review.review} />;
  });
  return (
    <CardComponent className={classes.reviewContainer}>
      <div className={classes.addReview}>
        <input
          type="text"
          name="addreview"
          className={classes.revInput}
          placeholder="Add a review"
          onChange={(e) => setRev(e.target.value)}
          value={rev}
        />
        <SendIcon
          onClick={handleReviewSubmit}
          style={{ fontSize: "large" }}
          className={classes.sendBtn}
        />
      </div>
      <div className={classes.reviewContainerCards}>{reviewCards}</div>
    </CardComponent>
  );
}

export default ReviewContainer;
