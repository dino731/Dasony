import { useState, useEffect } from 'react';
import './AdminDonaList.css';
import { useNavigate} from 'react-router-dom';
import { useDonaList } from './AdminDonaListContext';
import axios from 'axios';

const AdminDonaList = () => {

    const navigate = useNavigate();

    const [selectedArea, setSelectedArea] = useState('');
    const [adDonaList, setAdDonaList] = useState([]);

    const getAdDonaList = () => {
        axios.get("/dasony/admindonalist")
        .then((response) => setAdDonaList(response.data))
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getAdDonaList();
    },[])


    const handleCreateDona = () => {

        if(!selectedArea){
            alert("지역을 선택해주세요");
            return
        }
        navigate('/admindonaenroll?selectedArea='+selectedArea);
    }

    const handleAdDetail = (donaNo) => {
        const selectDona = adDonaList.find(number => number.donaNo === donaNo);

        if(selectDona){
            localStorage.setItem("selectDona", JSON.stringify(selectDona));

            navigate(`/admindonadetail/${donaNo}`);
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
                                adDonaList && adDonaList.length > 0 && adDonaList.map(list => (
                                    <tr key={list.donaNo} onClick={() => handleAdDetail(list.donaNo)}>
                                        <td width="150">{list.donaNo}</td>
                                        <td width="470">{list.donaTitle}</td>
                                        <td width="350">{list.donaName}</td>
                                        <td width="220">{list.donaWriteDate}</td>
                                        <td width="242">{list.donaEndDate}</td>
                                        <td width="250">{list.donaTotalAmount}다손</td>
                                        <td width="250">{list.donaTargetAmount}다손</td>
                                        <td width="250">{list.donaAchieve}%</td>
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

