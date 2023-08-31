import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';
const MypageMydonation = () =>{
    return(
        <div>
                <h2>내 기부</h2>

                <table>
        <thead>
            <th>기부 날짜</th>
            <th>모금단체</th>
            <th>금액</th>
        </thead>
        <tbody>
            <tr>
                <td>2023.06.01</td>
                <td>행복</td>
                <td>500원</td>
            </tr>
            <tr>
                <td>2023.07.01</td>
                <td>불행 기부천사 </td>
                <td> 500원</td>
            </tr>
            <tr>
                <td>2023.01.01</td>
                <td>아프리카</td>
                <td>백원</td>
            </tr>
        </tbody>
    </table>

        </div>
        
    );
}
export default MypageMydonation;