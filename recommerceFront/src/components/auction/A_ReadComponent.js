import { useEffect, useState } from "react";
import useCustomMovePage from "../../hooks/useCustomMovePage";
import { getOne } from "../../api/auctionApi";
import { API_SERVER_HOST } from "../../api/userApi";
import useCustomTimes from "../../hooks/useCustomTimes";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "../../util/formatNumberUtil";
import ImageModal from "../modal/ImageModal";
import LoadingModal from "../modal/LoadingModal";

const initState = {
  apName: "",
  apDesc: "",
  apStartPrice: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const A_ReadComponent = () => {
  const [auctionProduct, setAuctionProduct] = useState(initState);
  const { moveProductListPage, moveModifyPage } = useCustomMovePage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [selectedImgPath, setSelectedImgPath] = useState("");
  const { apno } = useParams();
  const remainingTime = useCustomTimes(auctionProduct.apStartTime);

  useEffect(() => {
    setLoading(true);

    getOne(apno).then((data) => {
      console.log(data);
      setAuctionProduct(data);
      window.scrollTo(0, 0);
      setLoading(false);
    });
  }, [apno]);

  const closeImageModal = () => {
    setOpenImg(false);
  };

  const auctionStatusDescriptions = {
    PENDING: "경매 대기 중",
    ACTIVE: "경매 진행 중",
    CLOSED: "경매 종료",
    CANCELLED: "경매 취소",
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <div className="max-w-md">
            {auctionProduct.uploadFileNames.map((imgFile, i) => (
              <img
                key={i}
                src={`${host}/auction/view/${imgFile}`}
                className="w-full rounded-lg shadow-md cursor-pointer"
                alt="product"
                onClick={() => {
                  setOpenImg(true);
                  setSelectedImgPath(`${host}/auction/view/${imgFile}`);
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="max-w-md">
            <div className="text-lg mb-4">{auctionProduct.apCategory}</div>
            <div className="font-bold text-2xl mb-4">
              {auctionProduct.apName}
            </div>
            <div className="text-lg mb-4">{auctionProduct.apDesc}</div>
            <div className="text-gray-700 mb-4">
              물품 번호: {auctionProduct.apno}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg">시작가</div>
              <div className="text-lg">
                {formatNumber(auctionProduct.apStartPrice)}원
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg">입찰단위</div>
              <div className="text-lg">
                {formatNumber(auctionProduct.apBidIncrement)}원
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg">물품상태</div>
              <div className="text-lg">
                {auctionStatusDescriptions[auctionProduct.apStatus]}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">시작시간</div>
              <div className="text-lg">{auctionProduct.apStartTime}</div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="text-sm">
                (경매는 시작 후 2시간 동안 진행됩니다)
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg">경매 시작까지</div>
              <div className="text-lg">{remainingTime}</div>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
                onClick={() => {
                  // handleChat logic here
                }}
              >
                경매 채팅
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                onClick={moveProductListPage}
              >
                목록
              </button>
              <button
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
                onClick={() => moveModifyPage(apno)}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
      {openImg && (
        <ImageModal
          openImg={openImg}
          callbackFn={closeImageModal}
          imagePath={selectedImgPath}
        />
      )}
    </div>
  );
};

export default A_ReadComponent;
