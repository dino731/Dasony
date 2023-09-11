import { useParams, useNavigate } from 'react-router-dom';
import './AdminDonaDetail.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminDonaDetail = () => {

    const navigate = useNavigate();
    const {donaNo} = useParams();

    const [admindonadetail, setAdminDonaDetail] = useState('');
    const [dayDiff, setDayDiff] = useState(0);

    const getAdDonaDetail = () => {
        axios.get(`/dasony/admindonadetail/${donaNo}`)
        .then((response) => {
            setAdminDonaDetail(response.data);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getAdDonaDetail();
    }, [donaNo]);

   useEffect(() => {

    const calculateDayDiff = () => {
        const endDate = new Date(admindonadetail.donaEndDate);
        const writeDate = new Date(admindonadetail.donaWriteDate);
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
    }, [admindonadetail]);

   
    const handleUpdate = () => {
        navigate(`/admindonaupdate/${donaNo}`);
    }

    const handleDelete = () => {
        axios.delete(`/dasony/admindonadelete/${donaNo}`)
        .then(() => {
            navigate("/admindonalist");
        })
        .catch(error => console.log(error));
    }

    return(
        <div id="addonadetailcontent">
            <div id="addona_tbl">
                <table className="addonation_detail">
                    <tr>
                        <th width="70">제목</th>
                        <td colSpan="3">{admindonadetail.donaTitle}</td>
                    </tr>
                    <tr>
                        <th width="70">모금단체</th>
                        <td width="250" style={{borderRight : '1px solid black'}}>{admindonadetail.donaName}</td>
                        <th width="70">작성일</th>
                        <td width="250">{admindonadetail.donaWriteDate}</td>
                    </tr>
                    <tr>
                        <th width="70">내용</th>
                        <td colSpan="3"style={{height : '400px', textAlign : 'left'}}> 
                            <div id="adscrollable">{admindonadetail.donaContent}</div>
                        </td>
                    </tr>
                    <tr>
                        <th width="70">참여내역</th>
                        <td colSpan="3" style={{height : '200px', textAlign : 'left'}}>
                            <div id="adscrollable-td">
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
                <br/>
                <div id='controlldona'>
                    <button type="button" class="btn btn-primary" onClick={handleUpdate}>수정</button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger" onClick={handleDelete}>삭제</button>
                </div>
            </div>
            <div>
                <div id="addb" style={{textAlign : 'center'}}>
                    <br/><br/><br/><br/><br/><br/>
                    <span id="addonatxt" style={{fontSize : '20px'}}>총 <b>57건</b>이<br/>
                        기부되었습니다<br/><br/>
                        {admindonadetail.donaWriteDate} ~<br/>
                        {admindonadetail.donaEndDate}
                        <br/><br/>
                        <div id="addday"><b>D - {dayDiff}</b></div>
                        <br/>
                        모인 금액<br/>
                        <b style={{fontSize : '25px'}}>{admindonadetail.donaTotalAmount}</b><span style={{fontSize : '17px'}}>다손</span><br/><br/>
                        달성률<br/>
                        <b style={{fontSize : '25px'}}>{admindonadetail.donaAchieve}%</b>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default AdminDonaDetail;