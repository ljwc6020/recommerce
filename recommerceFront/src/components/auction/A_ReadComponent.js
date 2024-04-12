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
  const [quantity, setQuantity] = useState(1);
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

  const handleQuantityInput = (event) => {
    const inputQuantity = event.target.value;
    const quantityNumber = parseInt(inputQuantity, 10);

    if (!isNaN(quantityNumber) && quantityNumber > 0) {
      setQuantity(quantityNumber);
    } else {
      setQuantity(1);
    }
  };

  const increaseQty = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQty = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    setTotalPrice(auctionProduct.apStartPrice * quantity);
  }, [quantity, auctionProduct.apStartPrice]);

  return (
    <div className="shopRead_group">
      {loading ? <LoadingModal /> : <></>}
      {/* 상품 영역 */}
      <div className="shopRead_img">
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
      <div className="shopRead_details">
        <div className="shopRead_area">
          <div className="shopRead_wrap">
            <div className="shopRead_box">
              <div className="shopRead_pdesc">{auctionProduct.apDesc}</div>
            </div>
          </div>
        </div>
        <div className="shopRead_wrap">
          <div className="shopRead_box">
            <div className="shopRead_pname">{auctionProduct.apName}</div>
          </div>
        </div>
        <div>
          <div className="shopRead-pno">상품 번호: {auctionProduct.apno}</div>
        </div>
      </div>
      <div className="shopRead_area">
        <div className="shopRead_wrap">
          <div className="shopRead_box">
            <div className="shopRead_info">판매가</div>
            <div className="shopRead_price">
              {formatNumber(auctionProduct.apStartPrice)}원
            </div>
          </div>
        </div>
        {/* 수량 조절 버튼 */}
        <div className="shopRead_wrap quantity_control">
          <div className="shopRead_info">구매 수량:</div>
          <div className="shopRead_qty">
            <input
              type="text"
              className="quantity_display"
              value={quantity}
              onChange={handleQuantityInput}
              min="1" // 최소 수량을 1로 설정합니다.
            />
            <button className="quantity_button" onClick={decreaseQty}>
              -
            </button>
            <button className="quantity_button" onClick={increaseQty}>
              +
            </button>
          </div>
        </div>
        {/* 동적으로 변하는 가격 */}
        <div className="shopRead_wrap total_price">
          <div className="">TOTAL</div>
          <div className="shopRead_totalPrice">{totalPrice}원</div>
        </div>
      </div>
      <div className="shopRead_area">
        {/* 버튼 영역 */}
        <div className="shopRead_btn">
          <button type="button" className="shopRead_addBtn">
            장바구니 담기
          </button>
          <button type="button" className="shopRead_paymentBtn">
            바로 구매하기
          </button>
          <button
            type="button"
            className="shopRead_listBtn"
            onClick={moveProoductListPage}
          >
            목록
          </button>

          <button
            type="button"
            className="shopRead_modifyBtn"
            onClick={() => moveModifyPage(apno)}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default A_ReadComponent;
