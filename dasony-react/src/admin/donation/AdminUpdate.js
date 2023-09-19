import './AdminDonaEnroll.css';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from 'axios';

const AdminUpdate = () => {

    const {donaNo} = useParams();
    const navigate = useNavigate();

    const [admindonadetail, setAdminDonaDetail] = useState({});
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        axios.get(`/dasony/admindonadetail/${donaNo}`)
        .then((response) => {
            setAdminDonaDetail(response.data);
            setUpdatedData(response.data);
        })
        .catch(error => console.log(error));
    }, [donaNo]);

    const handleUpdate = () => {
        axios.post(`/dasony/admindonaupdate/${donaNo}`, updatedData)
        .then(() => {
          setAdminDonaDetail(updatedData); 
          navigate(`/admindonadetail/${donaNo}`);
        })
        .catch(error => console.log(error));
        }


    return(
        <div className="adenrollcontent">
            <div id="enroll_form">
                <form>
                    <label>제목</label><br/> 
                    <input type="text" defaultValue={admindonadetail.donaTitle} onChange={(e) => setUpdatedData({...updatedData , donaTitle: e.target.value })}/>
                    <select name='areas' id='areas' value={admindonadetail.donaSelectArea}>
                        <option value="">지역 선택</option>
                        <option value="강남구">강남</option>
                        <option value="관악구">관악</option>
                        <option value="노원구">노원</option>
                        <option value="강동구">강동</option>
                    </select><br/> 
                    <label>모금단체</label><br/> 
                    <input type="text" defaultValue={admindonadetail.donaName} onChange={(e) => setUpdatedData({...updatedData ,donaName : e.target.value})}/><br/> 
                    <label>목표 다손</label><br/>
                    <input type="text" defaultValue={admindonadetail.donaTargetAmount} onChange={(e) => setUpdatedData({...updatedData ,donaTargetAmount : e.target.value})} style={{ textAlign: 'right'}}/>&nbsp;다손<br/>
                    <label>내용</label><br/> 
                    <textarea rows={20} cols={80} defaultValue={admindonadetail.donaContent} onChange={(e) => setUpdatedData({...updatedData ,donaContent : e.target.value})}></textarea><br/>
                    <button type="button" class="btn btn-warning" onClick={handleUpdate}>수정</button>
                </form>
            </div>
        </div>
    )
}
export default AdminUpdate;