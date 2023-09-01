
import React, { useRef,useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
// // 찜하기
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
const MypageMyshopPoint = () => {

    $('#rabitimg').css('display', 'none');

    return (

  
        <div className="my-shop">
          
           <h2>현재 포인트 : 100포인트 </h2>

          <button><Link to='/mypage/Myshop/MyUsedPoint'>포인트 내역 보기</Link></button>
                
        </div>

        
     

  

    );}
export default MypageMyshopPoint;










   
