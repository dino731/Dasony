import React from 'react';
import './mypagecss.css';
const MypageMyshopCoupon = () => {
    return (
    <div class="main">

     

        <div class="my-shop">
          <div class="mys">
           <div> <button>찜한 목록</button></div>
           <div> <button>포인트 관리</button></div>
           <div><button>쿠폰 관리</button></div>
          </div>

          <table>

            <thead>
                <tr>
                    <th></th>
                    <th>쿠폰 이름</th>
                    <th>기한</th>
                    <th>획득 날짜/사용날짜</th>
                    <th>사용 가능 여부</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>뉴진스 콘서트</td>
                    <td>무제한</td>
                    <td>2023.05.05</td>
                    <td>Y</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>르세라핌 콘서트</td>
                    <td>무제한</td>
                    <td>2023.06.05</td>
                    <td>Y</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>아이브 콘서트</td>
                    <td>무제한</td>
                    <td>2023.07.05</td>
                    <td>N</td>
                </tr>
            </tbody>

          </table>
                
        </div>

        
     

    </div> 
    );}
export default MypageMyshopCoupon;









   
