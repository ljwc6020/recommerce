import { useCallback, useEffect, useState } from "react";
import { getList } from "../../api/auctionApi";
import useCustomMovePage from "../../hooks/useCustomMovePage";

import PagingComponent from "../common/PagingComponent";
import { API_SERVER_HOST } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../util/formatNumberUtil";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const A_ListComponent = () => {
  const { page, size, refresh, moveProoductListPage, moveReadPage } =
    useCustomMovePage();
  const [serverData, setServerData] = useState(initState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getList({ page, size }).then((data) => {
      setServerData(data);
      setLoading(false);
    });
  }, [page, size, refresh]);

  const navigate = useNavigate();

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "/auction/add" });
    window.scrollTo(0, 0);
  });

  return (
    <div className="flex justify-center">
      <div className="shopList_group">
        <div className="shopList_area grid grid-cols-4 gap-4">
          {serverData.dtoList.map((auctionProduct) => (
            <div
              key={auctionProduct.apno}
              className="shopList_wrap mt-64"
              onClick={() => moveReadPage(auctionProduct.apno)}
              style={{ width: "300px", height: "100px" }}
            >
              <div className="shopList_box">
                <div className="shopList_info">
                  <div className="shopList_thum">
                    <img
                      alt={auctionProduct.apno}
                      src={`${host}/auction/view/s_${auctionProduct.uploadFileNames[0]}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="shopList_sum">
                    <div className="shopList_pname">
                      {auctionProduct.apName}
                    </div>
                    <div className="shopList_price">
                      {formatNumber(auctionProduct.apStartPrice)}원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <PagingComponent
            serverData={serverData}
            movePage={moveProoductListPage}
          />
        </div>

        <div className="shopList_btn fixed bottom-50 right-0 mb-8 mr-8 z-10">
          <div
            className="shopList_addBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickAdd}
          >
            상품 등록
          </div>
        </div>
      </div>
    </div>
  );
};

export default A_ListComponent;
