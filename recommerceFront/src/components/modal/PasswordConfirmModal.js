import React, { useState } from "react";

const PasswordConfirmModal = ({ onConfirm, onClose }) => {
  const [pw, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태 추가

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // 입력이 변경될 때 에러 메시지 초기화
  };

  const handleConfirm = async () => {
    if (pw.length === 0) {
      // 간단한 클라이언트 측 유효성 검사
      setError("비밀번호를 입력해주세요.");
      return;
    }

    // 클라이언트 측에서 비밀번호를 검증하고 처리
    if (isValidPassword(pw)) {
      onConfirm(); // 비밀번호가 맞으면 onConfirm 호출하여 확인 작업 수행
    } else {
      setError("잘못된 비밀번호입니다.");
    }
  };

  // 클라이언트 측에서 비밀번호를 검증하는 함수
  const isValidPassword = (pw) => {
    // 비밀번호 유효성 검사 로직을 작성하세요.
    // 예를 들어, 비밀번호가 특정 조건을 충족해야 한다면 해당 조건을 여기에 추가하세요.
    // 이 함수는 서버로 요청을 보내지 않고 클라이언트 측에서 비밀번호를 검증합니다.
    return pw.length >= 8; // 간단한 예시: 비밀번호는 8자 이상이어야 유효함
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>비밀번호 확인</h2>
        <input
          type="password"
          aria-label="비밀번호" // 접근성 향상을 위한 aria-label 추가
          value={pw}
          onChange={handlePasswordChange}
          placeholder="비밀번호 입력"
        />
        {error && <div className="error">{error}</div>}
        <button onClick={handlePasswordChange}>확인</button>
      </div>
    </div>
  );
};

export default PasswordConfirmModal;
