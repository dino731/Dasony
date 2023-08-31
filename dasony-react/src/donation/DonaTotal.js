// import { useState } from 'react';
import './DonaTotal.css';

const DonaTotal = () => {

    const donaId = localStorage.getItem('id');

    let donationAmount = 0;

    donaId.split(", ").forEach(function(element){
        const donationAmountId = parseInt(localStorage.getItem(`donationAmount_${element}`));
        donationAmount += donationAmountId;
    });

    const donaInfo = JSON.parse(localStorage.getItem('donaInfo'));

    const formatWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 기부 금액 ,설정
    };
    
    const dataFormat = (date) => { // 현재 날짜 가져와서 -로 변경
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return [year, month, day].join('-');
    }
    
    return(
        <div id="totalcontent">
            <div className="donation_total">
                <div id="totalamount">
                    <p>총 <b>{formatWithCommas(donationAmount)}</b>다손 기부</p>
                </div>
                <div id='totaltable'>
                    <table id='totalthead'>
                        <thead>
                            <tr>
                                <th width="100">글 번호</th>
                                <th width="500">제목</th>
                                <th width="250">모금단체</th>
                                <th width="150">기부 다손</th>
                                <th width="200">기부 일</th>
                            </tr>
                        </thead>
                    </table>
                    <div id='scrolltotal'>
                        <table id='totaltboty'>
                            <tbody style={{height: '100%'}}>
                                <tr>
                                    <td width="100">{donaInfo.id}</td>
                                    <td width="500">{donaInfo.title}</td>
                                    <td width="250">{donaInfo.dona}</td>
                                    <td width="150">{formatWithCommas(donationAmount)}다손</td>
                                    <td width="200">{dataFormat(new Date())}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DonaTotal;