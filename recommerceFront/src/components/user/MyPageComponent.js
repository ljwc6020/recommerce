import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { readUser, validateCurrentPassword } from "../../api/userApi";
import PasswordConfirmModal from "../modal/PasswordConfirmModal";

const MyPageComponent = () => {
  const user = useSelector((state) => state.loginSlice); // 로그인 정보 가져오기
  const [userData, setUserData] = useState(null); // 사용자 정보 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const navigate = useNavigate();

  const email = user.email;

  useEffect(() => {
    if (email) {
      const fetchUserData = async () => {
        try {
          const fetchedUserData = await readUser(email);
          setUserData(fetchedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [email]);

  const handleConfirmPassword = async (pw) => {
    if (!pw) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const result = await validateCurrentPassword(email, pw);
      if (result.valid) {
        setShowModal(false);
        navigate("/user/modify");
      } else {
        alert(result.message || "비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Password validation failed:", error);
      alert("비밀번호 검증에 실패했습니다.");
    }
  };

  return (
    <div className="myPageBundle">
      <span>My Page</span>
      <div className="InfoBundle">
        {userData && (
          <div className="userInfo">
            <div>E-mail: {userData.email}</div>
            <div>Nickname: {userData.nickname}</div>
            <div>Phone: {userData.phone}</div>
            <div>Birth: {userData.birth}</div>
          </div>
        )}
        <div className="btnBundle">
          <button onClick={() => setShowModal(true)}>정보 수정</button>
          <button onClick={() => navigate(`/user/remove/${email}`)}>
            회원 탈퇴
          </button>
        </div>
        {showModal && (
          <PasswordConfirmModal
            onConfirm={handleConfirmPassword}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageComponent;
