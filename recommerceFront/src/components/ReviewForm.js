import React, { useState } from "react";
import ReviewService from "../service/ReviewService";

function ReviewForm() {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await ReviewService.createReview({ content, rating });
    // Form submit 후 추가적인 액션 (예: 폼 초기화, 후기 목록 새로고침 등)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Review content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
