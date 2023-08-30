import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
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
            <button  className="mypage-btn"><Link to='/mypage/Info'>회원정보</Link></button>
          </div>
          <div>
            <button className="mypage-btn"><Link to='/mypage/Myact'>내 활동</Link></button>
          </div>
          <div>
            <button className="mypage-btn"><Link to='/mypage/Myshop'>내 상점</Link></button>
          </div>
          <div>
            <button className="mypage-btn"><Link to='/mypage/Mydonation'>내 기부</Link></button>
          </div>
          <div>
            <button className="mypage-btn"><Link to='/mypage/Alert'>알림 내역</Link></button>
          </div>
        </div>
      </div>
  );}
  export default MypageHeader;