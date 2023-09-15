import React, { useRef,useEffect, useState } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import HeartIcon from '../heartjj';
import axios from 'axios';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';

const MypageMyshopLikes = () => {

   
    const [shop, setShop] = useState([]);
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");
    useEffect(() => {
      axios.post("/dasony/api/getMyLikesList", loginUserNo, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      })
        .then((response) => {
          setShop(response.data.likesList);
        })
        .catch((error) => {
          console.error("오류남:", error);
        });
    }, [shop]);

    const rows = [];
    for (let i = 0; i < shop.length; i += 3) {
    const row = shop.slice(i, i + 3);
    rows.push(row);
    }


    useEffect(() => {
        const imageElement = $('#rabitimg'); 

          imageElement.css('display', 'none'); 
      });

  return (
    <div className="myShopLikes-table">
      <h3>내 찜 목록</h3>
      <div className="product-content">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, index) => (
                  <td className="product" key={index}>
                     <div><img src={`http://localhost:8083/dasony/resources/images/product/${item.productImg.productImgModName}`} alt=""/></div>
                    <div>
                      <div>{item.shop.shopName}</div> 
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {item.product.productName} &nbsp;<HeartIcon productNo={item.product.productNo}/>
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
    
 );}
export default MypageMyshopLikes;
