import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
const MypageMydonation = () =>{
    return(
        <div className='donation-table'>
                <h2>내 기부</h2>

                <div className='jefftable'>
        <table>
        <thead>
            <tr>
            <th className='nf-history-header2'>기부 날짜</th>
            <th className='nf-history-header1'>모금단체</th>
            <th className='nf-history-header3'>금액</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="nf-td3">2023.06.01</td>
                <td className="nf-td2">행복한 지옥천사</td>
                <td className="nf-td1">500원</td>
            </tr>
            <tr>
                <td className="nf-td3">2023.07.01</td>
                <td className="nf-td2">불행 기부천사 </td>
                <td className="nf-td1"> 500원</td>
            </tr>
            <tr>
                <td className="nf-td3">2023.01.01</td>
                <td className="nf-td2">유니쉐프</td>
                <td className="nf-td1">백원</td>
            </tr>
            </tbody>
    </table>
    </div>
        </div>
        
    );
}
export default MypageMydonation;