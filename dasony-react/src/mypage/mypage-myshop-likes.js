import React, { useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';


const MypageMyshopLikes = () => {
  useEffect(() => {
    // jQuery 코드 실행
    $(".btnh1").click(function() {
      let col = $(this).children().attr("color");
      if (col === "rgba(255,0,0, .85)") {
        $(this).children().attr("color", "rgba(136, 137, 143, 0.4)");
      } else {
        $(this).children().attr("color", "rgba(255,0,0, .85)");
      }
      $(this).toggleclassName("active");
      $(".btnh1").toggleclassName("active");
    });
  }, []);

  return (


    <div className="main">

        <div className="my-shop">
          <div className="mys">
           <div> <button>찜한 목록</button></div>
           <div> <button>포인트 관리</button></div>
           <div><button>쿠폰 관리</button></div>
          </div>

            <table className="my-like-table">
                <tr>
                  <td><img src="image1.jpg" alt="Image 1"/>
                    <button className="btnh1" type="submit"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button>
                </td>
                  <td><img src="image2.jpg" alt="Image 2"/>
                    <button className="btnh1" type="submit"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                  <td><img src="image3.jpg" alt="Image 3"/>
                    <button className="btnh1" type="submit"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                </tr>
                <tr>
                  <td><img src="image4.jpg" alt="Image 4"/>
                    <button className="btnh1" type="submit"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                  <td><img src="image5.jpg" alt="Image 5"/>
                    <button className="btnh1" type="submit"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                  <td><img src="image6.jpg" alt="Image 6"/>
                    <button className="btnh1" type="submit"><svg   xmlns="http://www.w3.org/2000/svg" width="21" height="21" 
                        viewBox="0 0 16 16">
                       <path id="heartlogo"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                     </svg>
                   찜 하 기</button></td>
                </tr>
                </table>
                <button className="gotoshop">상점으로</button>
        </div>

        
     

    </div> 
 );}
export default MypageMyshopLikes;
       

