import React from "react";
import ReviewList from "./components/ReviewList"; // 후기 목록 컴포넌트
import ReviewForm from "./components/ReviewForm"; // 후기 추가 폼 컴포넌트
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>유저 후기작성</h1>
        <ReviewForm /> // 새 후기를 추가하는 폼
        <ReviewList /> // 사용자 후기 목록을 보여주는 컴포넌트
      </header>
    </div>
  );
}

export default App;
