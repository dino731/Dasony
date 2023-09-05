import './DonaList.css';
import { useDonaData } from './DonaDataContext';
import axios from 'axios';

const DonaList = () => {
    const {donalist, setDonalist} = useDonaData();

    axios.get("/dasony/donalist")
    .then((response) => setDonalist(response.data.donalist))
    .catch(error => console.log(error));

    const handlemydona = () => {
        window.location.href = '/mypage/Mydonation';
    }
    
    const handeldetail = (id) => {
        const donaInfo = donalist.find(dona => dona.id === id);
        localStorage.setItem("donaInfo", JSON.stringify(donaInfo));

        window.location.href = `/donadetail/${id}`;
    }

    return(
        <div id="donalistcontent">
            <div id='block-content'>
                <div id="dolistbtn">
                   <button type='button' id='dona_btn' onClick={handlemydona} style={{ fontFamily: 'HakgyoansimWoojuR' }}>나의 기부 내역</button>
                </div>
                <div className="donation_list">
                    <table id='donalistthead'>
                        <thead>
                            <tr>
                                <th width="100">글번호</th>
                                <th width="500">제목</th>
                                <th width="300">모금단체</th>
                                <th width="200">작성일</th>
                            </tr>
                        </thead>
                    </table>
                    <div id='scrolldona'>
                        <table id='donalisttbody'>
                            <tbody style={{height: '100%'}}>
                                {
                                    <div>
                                        {donalist.map((dona) => {
                                            return <tr key={dona.id} onClick={() => handeldetail(dona.id)}>
                                                <td width="100">{dona.id}</td>
                                                <td width="580">{dona.title}</td>
                                                <td width="330">{dona.dona}</td>
                                                <td width="240">{dona.createdate}</td>
                                                </tr>
                                        })}
                                    </div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DonaList