import { Axios } from "axios";
export const API_SERVER_HOST = "http://localhost:8080"; // userApi에 host 작성 시 삭제 예정
// import { API_SERVER_HOST } from "./userApi";

const host = `${API_SERVER_HOST}/auction`;

export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  try {
    const res = await Axios.get(`${host}/list`, { params: { page, size } });
    return res.data;
  } catch (error) {
    console.error("Error fetching auction list:", error);
    throw error;
  }
};

export const getOne = async (apno) => {
  const res = await Axios.get(`${host}/read/${apno}`);

  return res.data;
};

export const postOne = async (auction) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await Axios.post(`${host}/`, auction, header);
  // const res = await jwtAxios.post(`${host}/`, auction, header); // 권한 작업 후 jwtAxios로 수정 예정

  return res.data;
};

export const putOne = async (apno, auction) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await Axios.put(`${host}/${apno}`, auction, header);
  // const res = await jwtAxios.put(`${host}/${apno}`, auction, header); // 권한 작업 후 jwtAxios로 수정 예정

  return res.data;
};

export const deleteOne = async (auction) => {
  const res = await Axios.delete(`${host}/${auction.apno}`, {
    // const res = await jwtAxios.delete(`${host}/${auction.apno}`, { // 권한 작업 후 jwtAxios로 수정 예정
    data: auction,
  });

  return res.data;
};
