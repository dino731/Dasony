import React, { useRef,useEffect, useState } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import HeartIcon from '../heart';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';

const MypageMyshopLikes = () => {

    useEffect(() => {
        const imageElement = $('#rabitimg'); 
        console.log("1");
       
          imageElement.css('display', 'none'); 
          console.log("2");
        
      });

  return (

        <div className="myShopLikes-table">

          <h3>내 찜 목록</h3>

          <div className="product-content">

    <table>
        <tr>
            <td className="product"><div><img src="" alt=""/></div>
            <div>
                
                    <div>상점이름 1</div>
                    <div style={{display:'flex',justifyContent:'center'}}>찜 이름 2 &nbsp;<HeartIcon/></div>    
            </div>
            </td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 2</div><div>찜 이름 2</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 3</div><div>찜 이름 3</div></td>
        </tr>
        <tr>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 4</div><div>찜 이름 4</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 5</div><div>찜 이름 5</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 6</div><div>찜 이름 6</div></td>
        </tr>
        <tr>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 7</div><div>찜 이름 7</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 8</div><div>찜 이름 8</div></td>
            <td className="product"><div><img src="" alt=""/><HeartIcon/></div><div>상점이름 9</div><div>찜 이름 9</div></td>
        </tr>
    </table>
    </div>

    <button className="gotoshop"><Link to='/Shop/main'>상점으로</Link></button>

        </div>
    
 );}
export default MypageMyshopLikes;
       

