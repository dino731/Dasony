import React from 'react';
import './mypagecss.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';

// import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const MypageAlert = () => {
    return(
    <div className="main">

        
    <div className="alert-table">
     <table>
        <thead>
            <tr>
            <th>활동 번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>구매완료</td>
                <td>홈런볼 500원</td>
            </tr>
            <tr>
                <td>2</td>
                <td>구매완료</td>
                <td>초코송이 500원</td>
            </tr>
            <tr>
                <td>3</td>
                <td>신고대상 제재 완료</td>
                <td>미선님 강퇴</td>
            </tr>
        </tbody>
    </table>
</div>


</div> 
    )
}
export default MypageAlert;