import React, { useEffect, useState } from "react";
import Review from "./Review";
import ReviewService from "../service/ReviewService";

function ReviewList() {
  const [reviews, setReviews] = useState([]); // reviews를 배열로 초기화

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ReviewService.getAllReviews();
        if (Array.isArray(data)) {
          // 데이터가 배열인지 확인
          setReviews(data);
        } else {
          console.error("Received data is not an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.reviewId} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;
