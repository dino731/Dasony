import { useParams, useNavigate } from 'react-router-dom';
import './AdminDonaDetail.css';
import { useDonaList } from './AdminDonaListContext';

const AdminDonaDetail = () => {

    const navigate = useNavigate();
    const {adDonaList} = useDonaList();
    const {id} = useParams();

    const selectDona = adDonaList.find(donalist => donalist.id === parseInt(id));

    const handleUpdate = () => {
        navigate(`/admindonaupdate/${id}`);
    }

    return(
        <div id="addonadetailcontent">
            <div id="addona_tbl">
                <table className="addonation_detail">
                    <tr>
                        <th width="70">제목</th>
                        <td colSpan="3">{selectDona.title}</td>
                    </tr>
                    <tr>
                        <th width="70">모금단체</th>
                        <td width="250" style={{borderRight : '1px solid black'}}>{selectDona.dona}</td>
                        <th width="70">작성일</th>
                        <td width="250">{selectDona.createdate}</td>
                    </tr>
                    <tr>
                        <th width="70">내용</th>
                        <td colSpan="3"style={{height : '400px', textAlign : 'left'}}> 
                            <div id="adscrollable">{selectDona.content}</div>
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
                    <button type="button" class="btn btn-primary" onClick={handleUpdate}>수정</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-danger">삭제</button>
                </div>
            </div>
            <div>
                <div id="addb" style={{textAlign : 'center'}}>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <span id="addonatxt" style={{fontSize : '20px'}}>총 <b>57건</b>이<br/>
                        기부되었습니다<br/><br/>
                        {selectDona.createdate}~<br/>
                        {selectDona.enddate}
                        <br/><br/>
                        <div id="addday"><b>D - </b></div>
                        <br/>
                        모인 금액<br/>
                        <b style={{fontSize : '25px'}}></b><span style={{fontSize : '17px'}}>다손</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default AdminDonaDetail;