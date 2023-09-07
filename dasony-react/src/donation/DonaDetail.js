import { useEffect, useState } from 'react';
import './DonaDetail.css';
import { useParams } from 'react-router-dom';
import { useDonaData } from './DonaDataContext';
import axios from 'axios';


const DonaDetail = () => {
    const {donaNo} = useParams();

    const [donadetail, setDonaDetail] = useState('');

    const getDonaDetail = () => {
        axios.get(`/dasony/donadetail/${donaNo}`)
        .then((response) => {
            setDonaDetail(response.data);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getDonaDetail();
    },[donaNo])

    const donationAmount = localStorage.getItem(`donationAmount_${donaNo}`);
    // const countDona = localStorage.getItem(`countDona_${id}`);


    // const donaInfo = donalist.find(dona => dona.donaNo === parseInt(donaNo));

    const formatWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const [remainingDays, setRemainingDays] = useState('');

    // const donaInfo = localStorage.getItem('donaInfo');
    // const parseDonaInfo = JSON.parse(donaInfo);

    const handlemogh = (donaNo) => {
        window.location.href = `/donadona/${donaNo}`;
    }

    const [dayDiff, setDayDiff] = useState(0);

    useEffect(() => {
        const calculateDayDiff = () => {
          const endDate = new Date(donadetail.donaEndDate);
          const writeDate = new Date(donadetail.donaWriteDate);
          const today = new Date();
          endDate.setHours(0, 0, 0, 0); 
          writeDate.setHours(0, 0, 0, 0); 
    
          const timeDiff = endDate - today;
          const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
          const writeDateDiff = today - writeDate;
          const writeDateDays = Math.ceil(writeDateDiff / (1000 * 60 * 60 * 24));

          const dDay = days - writeDateDays;
    
          setDayDiff(dDay);
        };
    
        calculateDayDiff();
    
        const updateDayDiff = setInterval(() => {
          calculateDayDiff();
        }, 1000 * 60 * 60 * 24); 
    
        return () => clearInterval(updateDayDiff);
      }, [donadetail]);

    return(
        <div id="donadetailcontent">
        <div id="dona_tbl">
            <table className="donation_detail">
                <tr>
                    <th width="70">제목</th>
                    <td colSpan="3">{donadetail.donaTitle}</td>
                </tr>
                <tr>
                    <th width="70">모금단체</th>
                    <td width="250" style={{borderRight : '1px solid black'}}>{donadetail.donaName}</td>
                    <th width="70">작성일</th>
                    <td width="250">{donadetail.donaWriteDate}</td>
                </tr>
                <tr>
                    <th width="70">내용</th>
                    <td colSpan="3"style={{height : '400px', textAlign : 'left'}}> 
                        <div id="scrollable">{donadetail.donaContent}</div>
                    </td>
                </tr>
                <tr>
                    <th width="70">참여내역</th>
                    <td colSpan="3" style={{height : '200px', textAlign : 'left'}}>
                        <div id="scrollable-td">
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        <p>2023-03-20</p>
                        <span>날개 없는 천사</span>
                        <span>5,000다손 기부</span>
                        <hr/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <div id="db" style={{textAlign : 'center'}}>
                <br/><br/><br/><br/>
                <span id="donatxt" style={{fontSize : '20px'}}>총 <b>57건</b>이<br/>
                    기부되었습니다<br/><br/>
                    {donadetail.donaWriteDate} ~ <br/>
                    {donadetail.donaEndDate}<br/><br/>
                    <div id="dday"><b>D - {dayDiff}</b></div>
                    <br/>
                    모인 금액<br/>
                    <b style={{fontSize : '25px'}}>{donadetail.donaTotalAmount}</b><span style={{fontSize : '17px'}}>다손</span><br/><br/>
                    달성률<br/>
                    <b style={{fontSize : '25px'}}>{donadetail.donaAchieve}%</b>
                </span>
                <br/><br/>
                <button id="mogh" onClick={() => handlemogh(donaNo)}>모금함 기부하기</button>
            </div>
        </div>
    </div>
    )
}
export default DonaDetail;