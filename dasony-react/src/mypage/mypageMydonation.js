import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const MypageMydonation = () =>{

    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion");

    const [donation, setDonation] = useState([]);

    useEffect(() => {
    axios.post("/dasony/api/getMyDonationList", {
      userNo: loginUserNo,
      userRegion : loginUserRegion
    }).then((response) => {
      setDonation(response.data.donationList);
    }).catch((error) => {
      console.error("오류남:", error);
    });
  }, []);

    return(
        <div className='donation-table'>
                <h2>내 기부</h2>

                <div className='jefftable'>
        <table> 
        <thead>
            <tr>
            <th className='nf-history-header2'>기부 글 번호</th>
            <th className='nf-history-header4'>기부 날짜</th>
            <th className='nf-history-header1'>모금단체</th>
            <th className='nf-history-header3'>금액</th>
            </tr>
        </thead>
        <tbody>
        {donation.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{item.donaExecuteNo}</td>
                <td className="nf-td3">{item.donaExecuteDate}</td>
                <td className="nf-td2">{item.donaName}</td>
                <td className="nf-td1">{item.donaAmount}</td>
              </tr>
            ))}
            </tbody>
    </table>
    </div>
        </div>
        
    );
}
export default MypageMydonation;