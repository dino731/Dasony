import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MypageMyshopLikes from './mypageMyshopLikes';
import MypageMyshopPoint from './mypageMyshopPoint';
import MyShopHeader from './mypageMyshopHeader';

const MypageMyshops =() => {
return(
    <div className='mypageMyshops'>
    <MyShopHeader/>
    <Outlet/>
    <img id='rabitimg' src='/resources/common-img/mypageimg/rabbit.jpg'></img>
    </div>
); 
}
export default MypageMyshops;