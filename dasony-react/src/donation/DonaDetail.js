import { useEffect, useState } from 'react';
import './DonaDetail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useDonaTotal from './useDonaTotal';


const DonaDetail = () => {
    const {donaNo} = useParams();

    const [donadetail, setDonaDetail] = useState({});

    const {totalDonaAmount, donaHistory, donationCount} = useDonaTotal(donaNo);
    const [dayDiff, setDayDiff] = useState(0);

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

    const handlemogh = (donaNo) => {
        window.location.href = `/donadona/${donaNo}`;
    }

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

        const achievementPercentage = ((totalDonaAmount / donadetail.donaTargetAmount) * 100).toFixed(2); // 기부 달성률

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
                        {donaHistory.map((donation) => (
                            <div key={donation.donaNo}> 
                                <p>{donation.donaExecuteDate}</p>
                                <span>{donation.userName}</span>&nbsp;
                                <span>{donation.donaAmount}다손 기부</span>
                                <hr/>
                            </div>
                            ))}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <div id="db" style={{textAlign : 'center'}}>
                <br/><br/><br/><br/>
                <span id="donatxt" style={{fontSize : '20px'}}>총 <b>{donationCount}건</b>이<br/>
                    기부되었습니다<br/><br/>
                    {donadetail.donaWriteDate} ~ <br/>
                    {donadetail.donaEndDate}<br/><br/>
                    <div id="dday"><b>D - {dayDiff}</b></div>
                    <br/>
                    모인 금액<br/>
                    <b style={{fontSize : '25px'}}>{totalDonaAmount}</b><span style={{fontSize : '17px'}}>다손</span><br/><br/>
                    달성률<br/>
                    <b style={{fontSize : '25px'}}>{achievementPercentage}%</b>
                </span>
                <br/><br/>
                <button id="mogh" onClick={() => handlemogh(donaNo)}>모금함 기부하기</button>
            </div>
        </div>
    </div>
    )
}
export default DonaDetail;