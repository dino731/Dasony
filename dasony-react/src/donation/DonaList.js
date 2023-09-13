import './DonaList.css';
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const DonaList = () => {

    const navigate = useNavigate();

    const [donalist, setDonalist] = useState([]);

    const getDonaList = ()=> {
        axios.get("/dasony/donalist")
        .then((response) => setDonalist(response.data))
        .catch(error => console.log(error));
    }

    const handlemydona = () => {
        window.location.href = '/mypage/Mydonation';
    }
    
    const handeldetail = (donaNo) => {
        const donaInfo = donalist.find(dona => dona.donaNo === donaNo);
        console.log(donaInfo);
        localStorage.setItem("donaInfo", JSON.stringify(donaInfo));

        navigate(`/donadetail/${donaNo}`);
    }

    useEffect(()=>{
        getDonaList();
        console.log(donalist);
    }, [])

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
                                
                                        {donalist && donalist.length > 0 &&donalist.map((dona) => {
                                            return( <tr key={dona.donaNo} onClick={() => handeldetail(dona.donaNo)}>
                                                <td width="100">{dona.donaNo}</td>
                                                <td width="580">{dona.donaTitle}</td>
                                                <td width="330">{dona.donaName}</td>
                                                <td width="240">{dona.donaWriteDate}</td>
                                                </tr>)
                                        })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DonaList