
import React, { useRef,useEffect, useState } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
// // 찜하기
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
const MypageMyshopUsedPoint = () => {

  const [point,setPoint] = useState([]);

  useEffect(()=>{
    const newPoint = [{
      number : 1,
      content : '크리스피 도넛',
      amount : 4000,
      date : '2023.05.01'
    },{
      number : 2,
      content : '포카칩',
      amount : 2000,
      date : '2023.08.30'
    }];
    setPoint(newPoint);

  },[]);

  $('#rabitimg').css('display', 'none');

    return (

        <div className="myUsedPointtable">

           <h2>현재 포인트 : 100 포인트</h2>

           <div className='jefftable'>

           <table>
          <thead>
            <tr>
              <th className='nf-history-header2'>번호</th>
              <th className='nf-history-header1'>사용 내용</th>
              <th className='nf-history-header4'>사용량</th>
              <th className='nf-history-header3'>날짜</th>
            </tr>
          </thead>
          <tbody>
              {point.map((item,index)=>(
            <tr key={index}>
                <td className="nf-td1">{item.number}</td>
                <td className="nf-td2">{item.content}</td>
                <td className="nf-td1">{item.amount}포인트</td>
                <td className="nf-td3">{item.date}</td>
            </tr>
              ))}
          </tbody>
        </table>
                
        </div>
        </div>

    );}
export default MypageMyshopUsedPoint;