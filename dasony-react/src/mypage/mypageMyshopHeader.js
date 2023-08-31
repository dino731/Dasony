import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
import MypageMyshopCoupon from './mypageMyshopCoupon';
import MypageMyshopLikes from './mypageMyshopLikes';
import MypageMyshopPoint from './mypageMyshopPoint';


const MyShopHeader = () => {
    return(
<div className="mys">
            <div> 무엇을 도와드릴까요? </div>
           <div><Link to='Likes'>찜한 목록</Link></div>
           <div><Link to='Point'>포인트 관리</Link></div>
           <div><Link to='Coupon'>쿠폰 관리</Link></div>

           
          </div>

    );
}
export default MyShopHeader;

