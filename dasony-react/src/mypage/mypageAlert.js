import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';


// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const MypageAlert = () => {

    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");


// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";

  const [alert, setAlert] = useState([]);

  useEffect(() => {
    axios.post("/dasony/api/getMyAlertList", {
      userNo: loginUserNo
    }).then((response) => {
      
      setAlert(response.data.alertList);
    }).catch((error) => {
      console.error("오류남:", error);
    });
  }, []);

  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   const infos = {
  //     user_name: 'wangfeng', // 이메일을 보낼 사용자의 이름
  //     user_email: 'wangfeng@ruc.edu.com' // 사용자의 이메일 주소
     
  //   };
    
  //   emailjs.send('Dasony', 'dasonyEmail', infos,'F-MU3Q5TmMwsJT8xo')
  //     .then((result) => {
  //         console.log(result.text);
  //     }, (error) => {
  //       console.log(error.text);
  //     });
    
  // };
    
    return(
    <div className='Alert-table'>
        <h2>내 알림</h2>

        {/* <button onClick={sendEmail}>테스트</button> */}
        <div className="jefftable">
      <table>
        <thead>
          <tr>
            <th className='nf-history-header2'>알람 번호</th>
            <th className='nf-history-header4'>카테고리</th>
            <th className="nf-history-header1">알림 제목</th>
            <th className="nf-history-header3">알림 날짜</th>
          </tr>
        </thead>
        <tbody>
          {alert.map((item,index)=>(
            <tr key={index} className={item.alertStatus === "A" ? "afterClick" : ""}>
                <td className="nf-td1">{item.alertNo}</td>
                <td className="nf-td1">{item.alertCate}<span className="mypage-product-title"> 상점 이용</span></td>
                <td className="nf-td2">{item.alertTitle}</td>
                <td className="nf-td3">{item.alertDate}</td>
            </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
    


    );
}
export default MypageAlert;