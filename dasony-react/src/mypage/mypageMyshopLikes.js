import React, { useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import HeartIcon from '../heart';
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
                  <HeartIcon/>
                </td>
                   <td><img src="image2.jpg" alt="Image 2"/>
                   <HeartIcon/>
                   </td>
                  <td><img src="image3.jpg" alt="Image 3"/>
                  <HeartIcon/>
                    </td>
                </tr>
                <tr>
                  <td><img src="image4.jpg" alt="Image 4"/>
                  <HeartIcon/>
                    </td>
                  <td><img src="image5.jpg" alt="Image 5"/>
                  <HeartIcon/>
                   </td>
                  <td><img src="image6.jpg" alt="Image 6"/>
                  <HeartIcon/>
                   </td> 
                </tr>
                </tbody>
                </table>
                <button className="gotoshop"><Link to='/Shop'>상점으로</Link></button>
        </div>

        
     

    </div> 
 );}
export default MypageMyshopLikes;
       

