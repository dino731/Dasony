import './AdminDonaEnroll.css';
import { useNavigate, useLocation} from 'react-router-dom';
import React, {useState} from 'react';
import { useDonaList } from './AdminDonaListContext';
import axios from 'axios';


const AdminDonaEnroll = () => {

    const navigate = useNavigate();
    
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search); // selectedArea url 정보 가져옴
    const selectedArea = searchParams.get('selectedArea');

         
    const {adDonaList, setAdDonaList} = useDonaList();
    const [title, setTitle] = useState('');
    const [crdona, setCrdona] = useState('');
    const [crcontent, setCrContent] = useState('');
    const [crgoalmony, setCrgoalmony] = useState('');

    const postDonaEnroll = (newDona) => {
        axios.post("/dasony/admindonaenroll", newDona)
        .then(() => navigate(`/admindonalist?selectedArea=?`))
        .catch(error => console.log(error));
    }
    
    const handleaddonalist = () => {

        if(!title || !crdona || !crcontent || !crgoalmony){

            alert("값을 모두 입력해주세요");
            return
        }
        
        const newDona = {
            donaTitle : title,
            donaName : crdona,
            donaContent : crcontent,
            donaTotalAmount : 0,
            donaTargetAmount : crgoalmony,
            donaAchieve : 0,
            donaSelectArea : selectedArea
        };

        const updateDonaList = [...adDonaList, newDona];

        setAdDonaList(updateDonaList);
        postDonaEnroll(newDona);
    }

    return(
        <div className="adenrollcontent">
            <div id="enroll_form">
                <form>
                    <label>제목</label><br/> 
                    <input type="text"  defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                    <select name='areas' id='areas'  defaultValue={selectedArea}>
                        <option value="">지역 선택</option>
                        <option value="강남">강남</option>
                        <option value="관악">관악</option>
                        <option value="노원">노원</option>
                        <option value="강동">강동</option>
                    </select><br/> 
                    <label>모금단체</label><br/> 
                    <input type="text"  defaultValue={crdona} onChange={e => setCrdona(e.target.value)}/><br/>
                    <label>목표 다손</label><br/>
                    <input type="text"  defaultValue={crgoalmony} onChange={e => setCrgoalmony(e.target.value)} style={{ textAlign: 'right' }}/>&nbsp;다손<br/>
                    <label>내용</label><br/> 
                    <textarea rows={20} cols={80}  defaultValue={crcontent} onChange={e => setCrContent(e.target.value)}></textarea><br/>
                    <button type="button" class="btn btn-warning" onClick={handleaddonalist}>등록</button>
                </form>
            </div>
        </div>
    )
}
export default AdminDonaEnroll;