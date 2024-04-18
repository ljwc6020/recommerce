import axios from "axios";
import { API_SERVER_HOST } from "./userApi";

const host = `${API_SERVER_HOST}/api/sales`;

// 마이페이지에서 판매 목록 조회
export const getMySaleList = async (email) => {
  try {
    const res = await axios.get(`${host}/saleLists/${email}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching my sale list:", error);
    throw error;
  }
};

// 판매 목록 삭제
export const deleteSaleList = async (sno) => {
  try {
    const res = await axios.delete(`${host}/saleLists/${sno}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting sale list:", error);
    throw error;
  }
};
