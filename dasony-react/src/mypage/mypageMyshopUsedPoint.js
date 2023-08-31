import React from 'react';
import './mypagecss.css';
import { Link, Outlet } from 'react-router-dom';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
// // 찜하기
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
const MypageMyshopUsedPoint = () => {
    return (

        <div className="myUsedPoint">

          
          
           현재 포인트 : 100포인트입니다.

           <table>
          <thead>
            <tr>
              <th></th>
              <th>사용 내용</th>
              <th>사용량</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>초코볼</td>
              <td>100포인트</td>
              <td>2023-08-22</td>
            </tr>
            <tr>
              <td>2</td>
              <td>포카칩</td>
              <td>300포인트</td>
              <td>2023-08-23</td>
            </tr>
          </tbody>
        </table>
                
        </div>

    );}
export default MypageMyshopUsedPoint;










   
