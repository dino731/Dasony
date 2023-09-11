import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from "react-bootstrap";
import './adminUserDetail.css';
import { useState, useEffect } from "react";

export const AdminUserModal = (props) => {

    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    const [modifyUser, setModifyUser] = useState({
        userNo : props.user.usreNo,
        userId : props.user.usreId,
        userName : "",
        userNick : "",
        userPwd : "",
        userPhone : "",
        userEmail : "",
        userAddress : "",
        userStatus : "",
        userLevel : "",
        userModDate : "",
        userJoinDate : ""
    });

    const handleModifyUser = (event)=>{
        const {id, value} = event.target;
        setModifyUser(preveUser=>({
            ...preveUser,
            [id]:value
        }));
    }

    useEffect(()=>{
        
        console.log("modifyUser",modifyUser);
    }, [modifyUser]);

    return(
        <>
        <Button className="btn btn-primary" onClick={handleOn}>{props.btnTitle}</Button>
        <Modal  show={show} fullscreen={true}>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    <table className="modalUserTable">
                        <tbody>
                            <tr>
                                <th>회원 번호</th>
                                <td>{props.user.userNo}</td>
                            </tr>
                            <tr>
                                <th>회원 이름</th>
                                <td>
                                    <input id='name' type='text' value={modifyUser.name} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>회원 아이디</th>
                                <td>
                                    {props.user.userNo}
                                    <input id='id' type='text' value={modifyUser.id} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>회원 비밀번호</th>
                                <td>
                                    <input id='pwd' type='text' value={modifyUser.pwd} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>회원 별명</th>
                                <td>
                                    <input id='nick' type='text' value={modifyUser.nick} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>핸드폰 번호</th>
                                <td>
                                    <input id='phone' type='text' value={modifyUser.phone} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <input id='email' type='text' value={modifyUser.email} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <input id='address' type='text' value={modifyUser.address} onChange={handleModifyUser}/>
                                </td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td>Y</td>
                            </tr>
                            <tr>
                                <th>등급</th>
                                <td>
                                    <select id='level' type='text' value={modifyUser.level} onChange={handleModifyUser}>
                                        <option>지역새싹</option>
                                        <option>지역루키</option>
                                        <option>지역프로</option>
                                        <option>지역달인</option>
                                        <option>지역장인</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>수정 날짜</th>
                                <td>date</td>
                            </tr>
                            <tr>
                                <th>가입 날짜</th>
                                <td>date</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-danger'  onClick={handleOff}>취소</Button>
                    <Button className="btn btn-primary"  onClick={handleOff}>확인</Button>
                </ModalFooter>
            </Modal>
            </>
    );
}