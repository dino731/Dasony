import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
const MypageMydonation = () =>{

    const [donation, setDonation] = useState([]);

    useEffect(() => {
        const newDonation = [{
            number :  '1',
            date : '2023.05.01',
            where : '유니세프',
            price : '300'
        },{
          number :  '2',
          date : '2023.07.01',
          where : '행복한 지옥천사',
          price : '200'
        }];
        setDonation(newDonation);
    
    },[]);

    return(
        <div className='donation-table'>
                <h2>내 기부</h2>

                <div className='jefftable'>
        <table>
        <thead>
            <tr>
            <th className='nf-history-header2'>기부 번호</th>
            <th className='nf-history-header4'>기부 날짜</th>
            <th className='nf-history-header1'>모금단체</th>
            <th className='nf-history-header3'>금액</th>
            </tr>
        </thead>
        <tbody>
        {donation.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{item.number}</td>
                <td className="nf-td3">{item.date}</td>
                <td className="nf-td2">{item.where}</td>
                <td className="nf-td1">{item.price}</td>
              </tr>
            ))}
            </tbody>
    </table>
    </div>
        </div>
        
    );
}
export default MypageMydonation;