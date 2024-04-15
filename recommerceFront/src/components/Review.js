import React from "react";
import ReviewService from "../service/ReviewService";

function Review({ review }) {
  const handleDelete = async () => {
    await ReviewService.deleteReview(review.reviewId);
    // Optionally refresh the list or use state management
  };

  return (
    <div>
      <h3>{review.content}</h3>
      <p>Rating: {review.rating}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Review;
