import axios from "axios";
import { API_SERVER_HOST } from "./userApi";

const host = `${API_SERVER_HOST}/api/purchases`;

// 마이페이지에서 구매 목록 조회
export const getMyPurchaseList = async (email) => {
  try {
    const res = await axios.get(`${host}/lists/${email}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching my purchase list:", error);
    throw error;
  }
};

// 구매 목록 삭제
export const deletePurchaseList = async (puno) => {
  try {
    const res = await axios.delete(`${host}/lists/${puno}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting purchase list:", error);
    throw error;
  }
};
