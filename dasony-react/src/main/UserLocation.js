import './UserLocation.css';
import { Link } from 'react-router-dom';

const UserLocation = () => {
    return(
        <div className="userLocation-container">
            <h1>다소니님의 지역은 어디인가요?</h1>
            <h5>*지역은 마이페이지에서도 수정 가능합니다.*</h5>

            <table>
                <thead>
                <tr>
                    <th>시/도 선택</th>
                    <td>
                        <select>
                            <option>어쩌구시1</option>
                            <option>어쩌구시2</option>
                            <option>어쩌구시3</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>구 선택</th>
                    <td>
                        <select>
                            <option>어쩌구1</option>
                            <option>어쩌구2</option>
                            <option>어쩌구3</option>
                        </select>
                    </td>
                </tr>
                </thead>
            </table>
            <div><Link to='/'><button>확인</button></Link></div>
        </div>
    );
}

export default UserLocation;