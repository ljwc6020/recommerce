import axios from "axios";
import { API_SERVER_HOST } from "./userApi";

const host = `${API_SERVER_HOST}/auction`;

// getList 함수에서의 params 사용 간소화
export const getList = async (pageParam) => {
  const { page, size, apName, apCategory } = pageParam;

  try {
    const res = await axios.get(`${host}/list`, {
      params: { page, size, apName, apCategory },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
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

  return res.data;
};

export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${host}/${pno}`, product, header);

  return res.data;
};

export const deleteOne = async (product) => {
  const res = await axios.delete(`${host}/${product.pno}`, {
    data: product,
  });

  return res.data;
};
