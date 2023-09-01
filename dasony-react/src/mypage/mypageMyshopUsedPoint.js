
import React, { useRef,useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
// // 찜하기
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
const MypageMyshopUsedPoint = () => {

  $('#rabitimg').css('display', 'none');

    return (

        <div className="myUsedPointtable">

           <h2>현재 포인트 : 100 포인트</h2>

           <div className='jefftable'>

           <table>
          <thead>
            <tr>
              <th className='nf-history-header1'>번호</th>
              <th className='nf-history-header1'>사용 내용</th>
              <th className='nf-history-header2'>사용량</th>
              <th className='nf-history-header2'>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="nf-td1">1</td>
              <td className="nf-td2">초코볼</td>
              <td className="nf-td1">100포인트</td>
              <td className="nf-td3">2023-08-22</td>
            </tr>
            <tr>
              <td className="nf-td1">2</td>
              <td className="nf-td2">포카칩</td>
              <td className="nf-td1">500포인트</td>
              <td className="nf-td3">2023-08-24</td>
            </tr>
          </tbody>
        </table>
                
        </div>
        </div>

    );}
export default MypageMyshopUsedPoint;










   
