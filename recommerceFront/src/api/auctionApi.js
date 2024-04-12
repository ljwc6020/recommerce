import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8080"; // userApi에 host 작성 시 삭제 예정
// import { API_SERVER_HOST } from "./userApi";

const host = `${API_SERVER_HOST}/auction`;

// getList 함수에서의 params 사용 간소화
export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  try {
    const res = await axios.get(`${host}/list`, { params: { page, size } });
    return res.data;
  } catch (error) {
    console.error("Error fetching auction list:", error);
    throw error; // 오류를 호출자에게 전파
  }
};

export const getOne = async (apno) => {
  const res = await axios.get(`${host}/${apno}`);

  return res.data;
};

export const postOne = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${host}/`, product, header);
  // const res = await jwtAxios.post(`${host}/`, auction, header); // 권한 작업 후 jwtAxios로 수정 예정

  return res.data;
};

export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${host}/${pno}`, product, header);
  // const res = await jwtAxios.put(`${host}/${apno}`, auction, header); // 권한 작업 후 jwtAxios로 수정 예정

  return res.data;
};

export const deleteOne = async (product) => {
  const res = await axios.delete(`${host}/${product.pno}`, {
    // const res = await jwtAxios.delete(`${host}/${auction.apno}`, { // 권한 작업 후 jwtAxios로 수정 예정
    data: product,
  });

  return res.data;
};
