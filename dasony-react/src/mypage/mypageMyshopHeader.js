import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
import MypageMyshopCoupon from './mypageMyshopCoupon';
import MypageMyshopLikes from './mypageMyshopLikes';
import MypageMyshopPoint from './mypageMyshopPoint';


const MyShopHeader = () => {
    return(
<div className="mys">
    <h2>내 상점</h2>
    
            <span style={{marginLeft:1}}> <br/> 무엇을 도와드릴까요? </span>
           <button className='Link-button'><Link to='Likes'>찜한 목록</Link></button>
           <button className='Link-button'><Link to='Point'>포인트 관리</Link></button>
           <button className='Link-button'><Link to='Coupon'>쿠폰 관리</Link></button>

           
          </div>

    );
}
export default MyShopHeader;

