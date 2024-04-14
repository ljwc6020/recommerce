import { useEffect, useState } from "react";
import useCustomMovePage from "../../hooks/useCustomMovePage";
import { getOne } from "../../api/auctionApi";
import { API_SERVER_HOST } from "../../api/userApi";

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
  const { moveProoductListPage, moveModifyPage } = useCustomMovePage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(auctionProduct.price);

  const [openImg, setOpenImg] = useState(false);
  const [selectedImgPath, setSelectedImgPath] = useState("");
  const { apno } = useParams();

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

  return (
    <div class="mt-20"> 
  <div class="shopRead_group flex">


    <div class="shopRead_img w-400 h-400">
      {auctionProduct.uploadFileNames.map((imgFile, i) => (
        <img alt="product" key={i} src={`${host}/auction/view/${imgFile}`} />
      ))}
    </div>

    {openImg && (
      <ImageModal
        openImg={openImg}
        callbackFn={closeImageModal}
        imagePath={selectedImgPath}
      />
    )}
    <div class="shopRead_details">
      <div class="shopRead_area">
        <div class="shopRead_wrap">
          <div class="shopRead_box">
            <div class="shopRead_pdesc">{auctionProduct.apDesc}</div>
          </div>
        </div>
        <div class="shopRead_wrap">
          <div class="shopRead_box">
            <div class="shopRead_pname">{auctionProduct.apName}</div>
          </div>
        </div>
        <div>
          <div class="shopRead-pno">상품 번호: {auctionProduct.apno}</div>
        </div>
      </div>
 
      <div class="shopRead_area">
        <div class="shopRead_wrap">
          <div class="shopRead_box">
            <div class="shopRead_info">판매가</div>
            <div class="shopRead_price">
              {formatNumber(auctionProduct.apStartPrice)}원
            </div>
          </div>
        </div>
      </div>

      <div class="shopRead_area">
        <div class="shopRead_btn">
          <button type="button" class="shopRead_addBtn">장바구니 담기</button>
          <button type="button" class="shopRead_paymentBtn">1:1 채팅</button>
          <button type="button" class="shopRead_listBtn" onClick={moveProoductListPage}>목록</button>
          <button type="button" class="shopRead_modifyBtn" onClick={() => moveModifyPage(apno)}>수정</button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default A_ReadComponent;
