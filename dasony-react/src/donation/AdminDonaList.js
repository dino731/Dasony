import { useState, useEffect } from 'react';
import './AdminDonaList.css';
import { useNavigate} from 'react-router-dom';
import { useDonaList } from './AdminDonaListContext';

const AdminDonaList = () => {

    const navigate = useNavigate();

    const {adDonaList} = useDonaList();
    const [selectedArea, setSelectedArea] = useState('');

    const handleCreateDona = () => {
        navigate('/admindonaenroll?selectedArea='+selectedArea);
    }

    const handleAdDetail = (id) => {
        const selectDona = adDonaList.find(number => number.id === id);

        if(selectDona){
            localStorage.setItem("selectDona", JSON.stringify(selectDona));
            navigate(`/admindonadetail/${id}`);
        }
    }

    return(
        <div id='adlistcontent'>
            <div id='addonalist'>
                <select name='areas' id='areas' value={selectedArea} onChange={e => setSelectedArea(e.target.value)}>
                    <option selected>지역 선택</option>
                    <option value="강남">강남</option>
                    <option value="관악">관악</option>
                    <option value="노원">노원</option>
                    <option value="강동">강동</option>
                </select><br/> 
                <div id='createdona'>
                    <button type="button" class="btn btn-warning" onClick={handleCreateDona}>글작성</button>
                </div>
                <br/>
                <table id='listhead'>
                    <thead>
                        <tr>
                            <th width="100">번호</th>
                            <th width="400">제목</th>
                            <th width="260">모금단체</th>
                            <th width="190">작성일</th>
                            <th width="210">마감일</th>
                            <th width="200">모금액</th>
                            <th width="200">목표금액</th>
                            <th width="200">달성률</th>
                        </tr>
                    </thead>
                </table>
                <div id='scrolladmin'>
                    <table id='listbody'>
                        <tbody style={{height: '100%'}}>
                            {
                                adDonaList.map(list => (
                                    <tr key={list.id} onClick={() => handleAdDetail(list.id)}>
                                        <td width="150">{list.id}</td>
                                        <td width="550">{list.title}</td>
                                        <td width="350">{list.dona}</td>
                                        <td width="220">{list.createdate}</td>
                                        <td width="242">{list.enddate}</td>
                                        <td width="250">{list.mony}</td>
                                        <td width="250">{list.goalmony}</td>
                                        <td width="250">{list.achieve}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AdminDonaList;