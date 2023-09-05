import './AdminDonaEnroll.css';
import { useParams} from 'react-router-dom';
import { useDonaList } from './AdminDonaListContext';

const AdminUpdate = () => {

    const {adDonaList} = useDonaList();
    const {id} = useParams();

    const selectDona = adDonaList.find(donalist => donalist.id === parseInt(id));


    return(
        <div className="adenrollcontent">
            <div id="enroll_form">
                <form>
                    <label>제목</label><br/> 
                    <input type="text" value={selectDona.title}/>
                    <select name='areas' id='areas'>
                        <option value="">지역 선택</option>
                        <option value="강남">강남</option>
                        <option value="관악">관악</option>
                        <option value="노원">노원</option>
                        <option value="강동">강동</option>
                    </select><br/> 
                    <label>모금단체</label><br/> 
                    <input type="text" value={selectDona.dona}/><br/> 
                    <label>내용</label><br/> 
                    <textarea rows={20} cols={80}>{selectDona.content}</textarea><br/>
                    <button type="button" class="btn btn-warning">수정</button>
                </form>
            </div>
        </div>
    )
}
export default AdminUpdate;