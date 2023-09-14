
import React, { useRef,useEffect,useState } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import axios from 'axios';
const MypageMyshopCoupon = () => {

    const [coupon, setCoupon] = useState([]);
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");

    useEffect(() => {
        const newCoupon = [{
            number : 1 ,
            couponName :  '뉴진스콘서트',
            endDate : '2023.09.23',
            getDate : '2023.05.30',
            couponStatus : 'Y'
        },{
            number : 2 ,
            couponName :  '블랙핑크콘서트',
            endDate : '2023.05.13',
            getDate : '2023.02.10',
            couponStatus : 'Y'
        },{
            number : 3 ,
            couponName :  '르세라핌콘서트',
            endDate : '2023.09.27',
            getDate : '2023.05.01',
            couponStatus : 'Y'
        },{
            number : 4 ,
            couponName :  '아이브콘서트',
            endDate : '2023.09.23',
            getDate : '2023.08.30',
            couponStatus : 'Y'
        }];
        setCoupon(newCoupon);
    
    },[]);

    $('#rabitimg').css('display', 'none');

    return (
    
        <div className="myShopCoupon-table">

        <div className='jefftable'>
          <table>

            <thead>
                <tr>
                    <th className='nf-history-header2'>No</th>
                    <th className='nf-history-header1'>쿠폰 이름</th>
                    <th className='nf-history-header4'>기한</th>
                    <th className='nf-history-header4'>획득 날짜/사용날짜</th>
                    <th className='nf-history-header3'>사용 가능 여부</th>
                </tr>
            </thead>
            <tbody>
                {coupon.map((item,index)=>( 
                    <tr key={index}>
                    <td className="nf-td1">{item.number}</td>
                    <td className="nf-td2">{item.couponName}</td>
                    <td className="nf-td1">{item.endDate}</td>
                    <td className="nf-td3">{item.getDate}</td>
                    <td className="nf-td1">{item.couponStatus}</td>
                </tr>
                    ))}
                
            </tbody>

          </table>
                
        </div>
        </div>
        
     

    
    );}
export default MypageMyshopCoupon;









   
