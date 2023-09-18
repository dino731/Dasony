
import { useEffect, useState, useTransition } from 'react';
import './mypagecss.css';
import $ from 'jquery';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
// // 찜하기
// import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
const MypageMyshopPoint = () => {

    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");
    const [ticket,setTicket] = useState();
    const [point, setPoint] = useState([]);

    useEffect(() => {
        axios.post("/dasony/api/getMyPoint", loginUserNo
        ,{headers: {
            "Content-Type": "application/json", 
          },
        }).then((response) => {
            console.log(response.data.point);
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

    return (

  
        <div className="my-shop">
          {point.map((item,index)=>(
             <h2>현재 포인트 : {item.totalPoint} 다소니</h2>
          ))}

           <h2> 현재 보유한 응모권 갯수 : {ticket}개 </h2>

          <button className='gotoUsedPoint'><Link to='/mypage/Myshop/MyUsedPoint'>포인트 내역 보기</Link></button>
                
        </div>

        
     

  

    );}
export default MypageMyshopPoint;










   
