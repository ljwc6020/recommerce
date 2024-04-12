import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const A_IndexPage = () => {
  const location = useLocation();

  return (
    <BasicLayout>
      <div>
        <div>
          <ul>
            <li>- 경매 -</li>
            <li></li>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default A_IndexPage;
