import React, { useState } from "react";
import PasswordConfirmModal from "./PasswordConfirmModal"; // 모달 컴포넌트 임포트
import { useNavigate } from "react-router-dom"; // 네비게이션을 위한 훅

const ParentComponent = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const navigate = useNavigate(); // 라우터 네비게이션 훅

  // 모달 닫기 함수
  const handleClose = () => {
    setModalOpen(false);
  };

  // 비밀번호 확인 후 처리할 로직
  const handleConfirmPassword = async (password) => {
    console.log("Password confirmed:", password);
    // 비밀번호 검증 API 호출 등 로직을 추가할 수 있습니다.
    const isValid = await validatePassword(password); // 예시 함수, 실제 구현 필요
    if (isValid) {
      navigate("/modify-profile"); // 비밀번호 확인 성공 시, 프로필 수정 페이지로 이동
    } else {
      alert("비밀번호가 틀렸습니다. 다시 시도해주세요."); // 실패 메시지
    }
    handleClose(); // 비밀번호 확인 후 모달 닫기
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Modify Profile</button>
      {modalOpen && (
        <PasswordConfirmModal
          onClose={handleClose}
          onConfirm={handleConfirmPassword}
        />
      )}
    </div>
  );
};

export default ParentComponent;

// 비밀번호 검증 함수 예시 (서버 API 호출 포함)
async function validatePassword(pw) {
  try {
    const response = await fetch("api/user/validate-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pw }),
    });
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error("Password validation failed:", error);
    return false;
  }
}
