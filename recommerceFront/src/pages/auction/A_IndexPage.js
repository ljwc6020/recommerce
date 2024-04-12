import { Outlet, useSearchParams } from "react-router-dom";
import A_ListComponent from "../../components/auction/A_ListComponent";
import BasicLayout from "../../layouts/BasicLayout";

const A_IndexPage = () => {
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <>
      <BasicLayout>
        <A_ListComponent />
        <Outlet />
      </BasicLayout>
    </>
  );
};

export default A_IndexPage;
