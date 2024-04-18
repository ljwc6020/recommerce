import React, { useState, useEffect } from "react";
import { getMySaleList, deleteSaleList } from "../api/salesApi"; // 판매 목록 조회 및 삭제 API 임포트

const SaleListComponent = ({ userSno }) => {
  const [saleList, setSaleList] = useState([]);

  // 판매 목록을 불러오는 함수
  const fetchSaleList = async () => {
    try {
      const data = await getMySaleList(userSno); // 판매 목록 조회 API 호출
      setSaleList(data); // 받아온 데이터를 상태에 설정
    } catch (error) {
      console.error("Error fetching sale list:", error);
    }
  };

  // 컴포넌트가 마운트될 때 판매 목록을 불러옴
  useEffect(() => {
    fetchSaleList();
  }, []);

  // 판매 목록 삭제 함수
  const handleDeleteSaleList = async (sno) => {
    try {
      await deleteSaleList(sno); // 판매 목록 삭제 API 호출
      // 삭제 후 판매 목록을 다시 불러옴
      fetchSaleList();
    } catch (error) {
      console.error("Error deleting sale list:", error);
    }
  };

  return (
    <div>
      <h2>판매 목록</h2>
      <ul>
        {saleList.map((sale) => (
          <li key={sale.sno}>
            <div>{sale.title}</div>
            <div>{sale.price}</div>
            {/* 판매 목록의 다른 정보들을 표시할 수 있음 */}
            <button onClick={() => handleDeleteSaleList(sale.sno)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaleListComponent;
