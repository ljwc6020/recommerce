import axios from "axios";

const API_URL = "http://localhost:8080/api/reviews";

const getAllReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteReview = async (reviewId) => {
  await axios.delete(`${API_URL}/${reviewId}`);
};

export default {
  getAllReviews,
  deleteReview,
};
