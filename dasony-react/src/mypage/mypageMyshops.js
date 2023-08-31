import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MypageMyshopCoupon from './mypageMyshopCoupon';
import MypageMyshopLikes from './mypageMyshopLikes';
import MypageMyshopPoint from './mypageMyshopPoint';
import MyShopHeader from './mypageMyshopHeader';

const MypageMyshops =() => {
return(
    <div className='mypageMyshops'>
    <MyShopHeader/>
    <Outlet/>
   
    </div>
); 
}
export default MypageMyshops;