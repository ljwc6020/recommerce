import { useSearchParams } from "react-router-dom";
import A_ListComponent from "../../components/Auction/A_ListComponent";
const ListPage_p = () => {
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <>
      <div className="shopList_section">
        <A_ListComponent />
      </div>
    </>
  );
};

export default ListPage_p;
