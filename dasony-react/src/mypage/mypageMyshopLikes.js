import React, { useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';

const MypageMyshopLikes = () => {
  useEffect(() => {
    $(".btnh1").off("click"); // 이전에 등록된 클릭 이벤트 핸들러 제거
    $(".btnh1").on("click", function() {
      let $btn = $(this);
      let col = $btn.children().css("color");
      
      if (col === "rgba(255, 0, 0, 0.85)") {
        $btn.children().css("color", "rgba(136, 137, 143, 0.4)");
        $btn.find("path").attr("fill", "rgba(136, 137, 143, 0.4)"); // SVG path의 fill 속성 변경
        console.log("확인");
      } else {
        $btn.children().css("color", "rgba(255, 0, 0, 0.85)");
        $btn.find("path").attr("fill", "rgba(255, 0, 0, 0.85)"); // SVG path의 fill 속성 변경
        console.log("확인2");
      }
      
      $btn.toggleClass("active");
      $(".btnh1").toggleClass("active");
    });
  }, []);

  return (


    <div className="main">

        <div className="my-shop">
          

            <table className="my-like-table">
              <tbody>
                <tr>
                  <td><img src="image1.jpg" alt="Image 1"/>
                    <button className="btnh1" type="button"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button>
                </td>
                   <td><img src="image2.jpg" alt="Image 2"/>
                    <button className="btnh1" type="button"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                  <td><img src="image3.jpg" alt="Image 3"/>
                    <button className="btnh1" type="button"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                </tr>
                <tr>
                  <td><img src="image4.jpg" alt="Image 4"/>
                    <button className="btnh1" type="button"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                  <td><img src="image5.jpg" alt="Image 5"/>
                    <button className="btnh1" type="button"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                  <td><img src="image6.jpg" alt="Image 6"/>
                    <button className="btnh1" type="button"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td> 
                </tr>
                </tbody>
                </table>
                <button className="gotoshop"><Link to='/Shop'>상점으로</Link></button>
        </div>

        
     

    </div> 
 );}
export default MypageMyshopLikes;
       

