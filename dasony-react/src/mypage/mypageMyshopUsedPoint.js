
import React, { useRef,useEffect, useState } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
// // 찜하기
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
const MypageMyshopUsedPoint = () => {

  const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
  const loginUserRegion = localStorage.getItem("loginUserRegion");
  const [ticket,setTicket] = useState();
  const [point, setPoint] = useState([]);
  const [pointList, setPointList] = useState([]);

  useEffect(() => {
      axios.post("/dasony/api/getMyPoint", loginUserNo
      ,{headers: {
          "Content-Type": "application/json", 
        },
      }).then((response) => {
          setPoint(response.data.point);
      }).catch((error) => {
        console.error("오류남:", error);
      });
    }, []);

    useEffect(() => {
      axios.post("/dasony/api/getMyTicket", {
        userNo : loginUserNo
      }).then((response) => {
        setTicket(response.data);
      }).catch((error) => {
        console.error("오류남:", error);
      });
    }, []);

    useEffect(() => {
      axios.post("/dasony/api/getMyPointList",loginUserNo, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setPointList(response.data.pList);
        console.log(response.data.pList);
      }).catch((error) => {
        console.error("오류남:", error);
      });
    }, []);

    

  

  $('#rabitimg').css('display', 'none');

    return (

        <div className="myUsedPointtable">

        {point.map((item,index)=>(
             <h2>현재 포인트 : {item.totalPoint} 다소니</h2>
        ))}


              <h2> 현재 보유한 응모권 갯수 : {ticket}개 </h2>
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
          {pointList.map((item,index)=>(
            <tr key={index}>
                <td className="nf-td1">{item.pointNo}</td>
                <td className="nf-td2">{item.pointContent}</td>
                <td className="nf-td1">{item.pointAmount} 다손</td>
                <td className="nf-td3">{item.pointEventDate}</td>
            </tr>
          ))}
          </tbody>
        </table>
                
        </div>
        </div>

    );}
export default MypageMyshopUsedPoint;