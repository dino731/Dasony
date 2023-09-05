import './adminUser.css';
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import AdvancedExample from '../shop/Pagination';
import { useState, useEffect } from 'react';
import { AdminUserModal } from './adminUserModal';
import axios from 'axios';

export const AdminUser = () => {
    {/*회원 보기 */}
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios.get("/dasony/api/admin/userList")
            .then(response => {
                setUsers(response.data);
            }).catch(console.log);

    }
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
        getUsers();
        console.log("newUser",newUser);
        console.log("newUserArray",newUserArray);
    }, [newUser, newUserArray]);

    return(
        <div className="admin-user-container">
            <div className="admin-user-head">
                <div>회원 목록</div>
                <div><input type="text"/><Button className="btn btn-primary">검색</Button></div>
            </div>
            <div className='admin-user-table'>
            <table>
                    <thead>
                        <tr>
                            <th>회원 번호</th>
                            <th>아이디</th>
                            <th>비밀번호</th>
                            <th>이름</th>
                            <th>별명</th>
                            <th>핸드폰 번호</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 && users.map((user)=>{
                            return (
                                <tr key={user.userNo}>
                                    <td>{user.userNo}</td>
                                    <td>{user.userId}</td>
                                    <td>{user.userPwd}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.userNick}</td>
                                    <td>{user.userPhone}</td>
                                    <td>{user.userStatus}</td>
                                </tr>
                            )
                        })}
                        <tr>
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
                <div><AdminUserModal title={'회원 정보 추가'} btnTitle={'회원 추가'}/></div>
            </div>
        </div>
    );
}