import '../user/adminUser.css';
import './adminCalendar.css';
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import AdvancedExample from '../shop/Pagination';
import { useState, useEffect } from 'react';
import { AdminUserModal } from '../user/adminUserModal';

export const AdminCalendar = () => {

    {/*새로운 회원 추가 모달 열기 */}
    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const [newUser, setNewUser] = useState({
        oriKey: '',
        name : '',
        id : '',
        pwd : '',
        nick: ''
    });
    const [newUserArray, setNewUserArray] = useState([]);
{/*새로운 회원 추가 */}
    const handleNewUser = (event) => {
        const { id, value} = event.target;

        setNewUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    }
{/*새로운 회원 추가 -버튼 클릭(배열 만들기) */}
    const handleNewUserArray = ()=>{
        setNewUserArray(newUser);
        handleOff();
        setNewUser({oriKey: '',
                    name : '',
                    id : '',
                    pwd : '',
                    nick: ''});
        alert('수정되었습니다');
    }


    useEffect(()=>{
        
        console.log("newUser",newUser);
        console.log("newUserArray",newUserArray);
    }, [newUser, newUserArray]);

    return(
        <div className="admin-user-container">
            <div className="admin-user-head">
                <div>달력 신청 목록</div>
                <div><input type="text"/><Button className="btn btn-primary">검색</Button></div>
            </div>
            <div className='admin-calendar-table'>
            <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>날짜(기간)</th>
                            <th>신청 회원 아이디</th>
                            <th>일정 이름</th>
                            <th>장소</th>
                            <th>특이사항</th>
                            <th>종류</th>
                            <th>승인 상태</th>
                            <th>승인 검토</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>a</td>
                            <td>2023-10-09 ~ 2023-12-25</td>
                            <td>developerchoims</td>
                            <td>신나는 여름 물놀이 축제</td>
                            <td>광진구 여름 목장</td>
                            <td>물놀이 장비 챙기기</td>
                            <td>축제</td>
                            <td>P</td> 
                            <td>   
                                <Button className="btn btn-primary">Y</Button>
                                <Button className='btn btn-danger'>N</Button>
                            </td> 
                        </tr>
                        <tr>
                        <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='adminShop-pagination'>
                <AdvancedExample/>
            </div>
        </div>
    );
}