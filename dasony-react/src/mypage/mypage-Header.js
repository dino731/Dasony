import React from 'react';
import './mypagecss.css';
const MypageHeader = () => {
  return (
 <div className="btn-line">
        <div className="user-levelimg">
          <img
            src="resources/images/루피.png"
            alt=""
            style={{ width: '40px', height: '40px' }} // 인라인 스타일은 객체 형태로 작성
          />
          <div className="exp-bar"></div>
        </div>
        <div className="button-div">
          <div>
            <button className="mypage-btn">내 프로필</button>
          </div>
          <div>
            <button className="mypage-btn">내 활동</button>
          </div>
          <div>
            <button className="mypage-btn">나만의 상점</button>
          </div>
          <div>
            <button className="mypage-btn">기부내역</button>
          </div>
          <div>
            <button className="mypage-btn">알림</button>
          </div>
        </div>
      </div>
  );}
  export default MypageHeader;