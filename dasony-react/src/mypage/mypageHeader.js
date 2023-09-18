import React, {useEffect, useState } from 'react';
import './mypagecss.css';
import {Link} from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';
import { NavItem } from 'react-bootstrap';
const MypageHeader = () => {

  const [level, setLevel] = useState([]);

  useEffect(() => {
    const newLevel = [{
        levelImage :  'image.jpg',
        levelName : '지역달인'
    }];
    setLevel(newLevel);

},[]);

  return (

    
 <div className="btn-line">
    
 
  {level.map((item,index)=>(
        <div className="user-levelimg" key={index}>
          <img
            src="{item.levelImage}"
            alt=""
            style={{ width: '40px', height: '40px' }} // 인라인 스타일은 객체 형태로 작성
          />
          <div>{item.levelName}</div>
          <div className="exp-bar" style={{display: 'flex', border: '1px solid black', margin : '5px', maxWidth:'100px'}}>
            <div style={{backgroundColor:'lightBlue'}}>
              EX
            </div>
    P
            <div>
              </div>
              </div>
        </div>
              ))}
        <div className="button-div">
          
        <Link className='mypage-link' to='/mypage/Info'><button className='mypage-btn'>회원정보</button></Link>

        <Link className='mypage-link' to='/mypage/Myshop'><button className='mypage-btn'>내 상점</button></Link>
        
        <Link className='mypage-link' to='/mypage/Mydonation'><button className='mypage-btn'>내 기부</button></Link>

        <Link className='mypage-link' to='/mypage/Alert'><button className='mypage-btn'>알림 내역</button></Link>
          
          
        </div>
      </div>
  );}
  export default MypageHeader;