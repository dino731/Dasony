
import React, { useRef,useEffect } from 'react';
import './mypagecss.css';
import $ from 'jquery';
const MypageMyshopCoupon = () => {

    $('#rabitimg').css('display', 'none');

    return (
    
        <div className="myShopCoupon-table">

        <div className='jefftable'>
          <table>

            <thead>
                <tr>
                    <th className='nf-history-header2'>No</th>
                    <th className='nf-history-header1'>쿠폰 이름</th>
                    <th className='nf-history-header2'>기한</th>
                    <th className='nf-history-header2'>획득 날짜/사용날짜</th>
                    <th className='nf-history-header2'>사용 가능 여부</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="nf-td1">1</td>
                    <td className="nf-td2">뉴진스 콘서트</td>
                    <td className="nf-td1">무제한</td>
                    <td className="nf-td3">2023.05.05</td>
                    <td className="nf-td1">Y</td>
                </tr>
                <tr>
                    <td className="nf-td1">2</td>
                    <td className="nf-td2">아이브 콘서트</td>
                    <td className="nf-td1">무제한</td>
                    <td className="nf-td3">2023.04.05</td>
                    <td className="nf-td1">Y</td>
                </tr>
                <tr>
                    <td className="nf-td1">3</td>
                    <td className="nf-td2">르세라핌 콘서트</td>
                    <td className="nf-td1">무제한</td>
                    <td className="nf-td3">2023.06.05</td>
                    <td className="nf-td1">Y</td>
                </tr>
            </tbody>

          </table>
                
        </div>
        </div>
        
     

    
    );}
export default MypageMyshopCoupon;









   
