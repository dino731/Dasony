import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';

// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const MypageAlert = () => {

    

    return(
    
        <div className='Alert-table'>
        <h2>내 알림</h2>
        
        <div className="jefftable">

      <table>
        <thead>
          <tr>
            <th className='nf-history-header2'>알람 번호</th>
            <th className='nf-history-header2'>어디사용</th>
            <th className="nf-history-header1">알림내용</th>
            <th className="nf-history-header2">알림날짜</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
                <td className="nf-td1">1</td>
                <td className="nf-td1" >
                  
                  
                  <span className="mypage-product-title"> 상점 이용</span>
                  
               
                </td>
                <td className="nf-td2">홈런볼 구매 500원</td>
                <td className="nf-td3">2023-08-04</td>
            
              
            </tr>
         
        </tbody>
      </table>
      </div>
    </div>
    


    );
}
export default MypageAlert;