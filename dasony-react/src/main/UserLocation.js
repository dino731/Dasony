import './UserLocation.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';
import axios from 'axios';

const UserLocation = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);

    console.log("리코일에서 받아온 유저 정보-사용자 지역 설정(사용자):",loginUserInfo);
    


    {/*지역 정보 */}
    const [city, setCity] = useState('서울시');
    const [ward, setWard] = useState('강남구');
    const [location, setLocation] = useState('서울시 강남구');
    const userNo = loginUserInfo.userNo;

    const handleCity = (event) => setCity(event.target.value);
    const handleWard = (event) => setWard(event.target.value);
    const handleLocation = () => {setLocation(city+" "+ward);console.log(location);}
    
    {/*지역 정보 전달 함수 */}
    const handleLocationSubmit = () =>{
        axios.post('/dasony/api/location', {location, userNo})
        .then(res=>{
            alert(res.data.msg);
            navigate('/main');
        });
    }

    return(
        <div className="userLocation-container">
            <h1>다소니님의 지역은 어디인가요?</h1>
            <h5>*지역은 마이페이지에서도 수정 가능합니다.*</h5>

            <table>
                <thead>
                <tr>
                    <th>시/도 선택</th>
                    <td>
                        <select onChange={handleCity} value={city}>
                            <option>서울시</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>구 선택</th>
                    <td>
                        <select onChange={handleWard} onBlur={handleLocation} value={ward}>
                            <option>강남구</option>
                            <option>강동구</option>
                            <option>관악구</option>
                            <option>노원구</option>
                        </select>
                    </td>
                </tr>
                </thead>
            </table>
            <div><button onClick={handleLocationSubmit}>확인</button></div>
        </div>
    );
}

export default UserLocation;