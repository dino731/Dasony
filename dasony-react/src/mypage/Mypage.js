import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MypageHeader from './mypage-Header';
import MypageAct from './mypage-act';
import MypageInfo from './mypage-info';


const Mypage = ()=>{

    return(
        <div className='Mypage'>
        <MypageHeader/>
        <Outlet/>
        </div>
    );
}

export default Mypage;