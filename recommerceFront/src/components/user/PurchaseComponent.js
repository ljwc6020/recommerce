import React, { useState, useEffect } from "react";
import { getMyPurchaseList, deletePurchaseList } from "../api/purchaseApi";

const PurchaseComponent = ({ userEmail }) => {
  const [purchaseList, setPurchaseList] = useState([]);

  // 구매 목록을 불러오는 함수
  const fetchPurchaseList = async () => {
    try {
      const data = await getMyPurchaseList(userEmail);
      setPurchaseList(data);
    } catch (error) {
      console.error("Error fetching purchase list:", error);
    }
  };

  // 컴포넌트가 마운트될 때와 purchaseList가 변경될 때마다 구매 목록을 다시 불러옴
  useEffect(() => {
    fetchPurchaseList();
  }, [userEmail]);

  // 구매 목록 삭제 함수
  const handleDeletePurchaseList = async (puno) => {
    try {
      await deletePurchaseList(puno);
      // 삭제 후 구매 목록을 다시 불러옴
      fetchPurchaseList();
    } catch (error) {
      console.error("Error deleting purchase list:", error);
    }
  };

  return (
    <div>
      <h2>구매 목록</h2>
      <ul>
        {purchaseList.map((purchase) => (
          <li key={purchase.puno}>
            <div>{purchase.productName}</div>
            <div>{purchase.purchaseDate}</div>
            <button onClick={() => handleDeletePurchaseList(purchase.puno)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseComponent;
