import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import ReviewCard from "./ReviewCard";
import "./ReviewContainer.scss";
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

  const reviewCards = reviews.map((review, index) => {
    return <ReviewCard key={index} nuid={review.nuid} review={review.review} />;
  });
  return (
    <CardComponent className="reviewContainer">
      <div className="reviewContainer cards">{reviewCards}</div>
    </CardComponent>
  );
}

export default ReviewContainer;
