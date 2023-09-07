import { useEffect, useState } from 'react';
import './Finding.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Finding = ()=>{

    const navigate = useNavigate();

    /*아이디 찾기 */
        /*아이디 정보 */
    const[subEmail, setSubEmail] = useState(''); 
        /*아이디 찾기 함수 */
    const handleFindingId = () => {
        axios.post('/dasony/api/findingId', {subEmail: subEmail})
        .then(res=>{
            if(res.data.msg != null){
                alert(res.data.msg);
            } else {
                alert(res.data.err);
            }
        })
        .catch((err)=>{
            console.error(err);
            alert("서버 요청 중 오류가 발생했습니다. 잠시 후 이용해주세요.");
        })
    }

    return(
        <div className="finding-container">
            <table>
                <thead>
                    <tr>
                        <th>아이디 찾기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>이메일</td>
                        <td><input type='text' onChange={(event)=> setSubEmail(event.target.value)} value={subEmail}/></td>
                    </tr>
                </tbody>
                <tfoot>
                <tr><td colSpan={2}><button onClick={handleFindingId}>아이디 찾기</button></td></tr>
                </tfoot>
            </table>
            
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>비밀번호 재설정</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><input type='text'/></td>
                    </tr>
                </tbody>
                <tfoot>
                <tr><td colSpan={2}><button>비밀번호 재설정</button></td></tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Finding;