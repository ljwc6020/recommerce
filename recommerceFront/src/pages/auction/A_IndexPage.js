import React from "react";
import { Outlet } from "react-router-dom";

const A_IndexPage = () => {
  return (
    <div>
      A_IndexPage
      <Outlet />
    </div>
  );
};

export default A_IndexPage;
