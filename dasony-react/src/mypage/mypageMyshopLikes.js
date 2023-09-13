import React, { useRef,useEffect, useState } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import HeartIcon from '../heart';
import axios from 'axios';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';

const MypageMyshopLikes = () => {

   
    const [shop, setShop] = useState([]);
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");
    useEffect(() => {
      axios.post("/dasony/api/getMyLikesList", {
        userNo: loginUserNo
      }).then((response) => {
        
        setShop(response.data.likesList);
      }).catch((error) => {
        console.error("오류남:", error);
      });
    }, []);

    const rows = [];
    for (let i = 0; i < shop.length; i += 3) {
    const row = shop.slice(i, i + 3);
    rows.push(row);
    }


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
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {shop.map((item, index) => (
                  <td className="product" key={index}>
                    <div><img src={item.image} alt=""/></div>
                    <div>
                      <div>{item.shopName}</div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {item.productName} &nbsp;<HeartIcon/>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    <button className="gotoshop">
      <Link to='/Shop/main'>상점으로</Link>
    </button>
  </div>

    //     <div className="myShopLikes-table">

    //       <h3>내 찜 목록</h3>

    //       <div className="product-content">

    // <table>
    

    //      <tr>
    //         <td className="product"><div><img src="" alt=""/></div>
    //         <div><div>상점이름1</div><div style={{display:'flex',justifyContent:'center'}}>찜 이름 1 &nbsp;<HeartIcon/></div></div></td>
    //         <td className="product"><div><img src="" alt=""/></div>
    //         <div><div>상점이름 1</div><div style={{display:'flex',justifyContent:'center'}}>찜 이름 2 &nbsp;<HeartIcon/></div></div></td>
    //         <td className="product"><div><img src="" alt=""/></div>
    //         <div><div>상점이름 1</div><div style={{display:'flex',justifyContent:'center'}}>찜 이름 3 &nbsp;<HeartIcon/></div></div></td>
    //     </tr>
    //     <tr>
    //     <td className="product"><div><img src="" alt=""/></div>
    //         <div><div>상점이름 1</div><div style={{display:'flex',justifyContent:'center'}}>찜 이름 4 &nbsp;<HeartIcon/></div></div></td>
    //         <td className="product"><div><img src="" alt=""/></div>
    //         <div><div>상점이름 1</div><div style={{display:'flex',justifyContent:'center'}}>찜 이름 5 &nbsp;<HeartIcon/></div></div></td>
    //         <td className="product"><div><img src="" alt=""/></div>
    //         <div><div>상점이름 1</div><div style={{display:'flex',justifyContent:'center'}}>찜 이름 6 &nbsp;<HeartIcon/></div></div></td>
    //     </tr> 
        
    // </table>
    // </div>

    // <button className="gotoshop"><Link to='/Shop/main'>상점으로</Link></button>

    //     </div>
    
 );}
export default MypageMyshopLikes;
