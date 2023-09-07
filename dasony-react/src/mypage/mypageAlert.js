import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const MypageAlert = () => {
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    axios.post("/dasony/api/getAlertList", {
      userNo: 23090754
    }).then((response) => {
      const alertData = response.data; 
  
      setAlert(alertData);
    }).catch((error) => {
      console.error("API 호출 오류:", error);
    });
  }, []);
  
  
  
  
  


  // const [alert, setAlert] = useState([]);


  
  // useEffect(() => {
  //     const newAlert = [{
  //         number :  '1',
  //         category : '포인트 사용',
  //         content : '상품 구매가 완료되었습니다. (홈런볼)',
  //         date : '2023.05.17'
  //     },{
  //       number :  '2',
  //       category : '게시글 등록',
  //       content : '게시글 등록 완료.',
  //       date : '2023.05.01',
  //     }];
  //     setAlert(newAlert);
  // },[]);
    
    return(
    <div className='Alert-table'>
        <h2>내 알림</h2>
        <div className="jefftable">
      <table>
        <thead>
          <tr>
            <th className='nf-history-header2'>알람 번호</th>
            <th className='nf-history-header4'>카테고리                                                                                                                                                                                                                                                                                                                                                               고리</th>
            <th className="nf-history-header1">알림 내용</th>
            <th className="nf-history-header3">알림 날짜</th>
          </tr>
        </thead>
        <tbody>
          {alert.map((item,index)=>(
            <tr key={index}>
                <td className="nf-td1">{item.number}</td>
                <td className="nf-td1">{item.category}<span className="mypage-product-title"> 상점 이용</span></td>
                <td className="nf-td2">{item.content}</td>
                <td className="nf-td3">{item.date}</td>
            </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
    


    );
}
export default MypageAlert;