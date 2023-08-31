import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import './adminUserDetail.css';
import { useState, useEffect } from "react";
import { AdminUserModal } from "./adminUserModal";

export const AdminUserDetail = () => {


    const [show, setShow] = useState(false);
    const handleOn = ()=> setShow(true);
    const handleOff = () => setShow(false);

    
    const [modifyUser, setModifyUser] = useState({
        name : '',
        id : '',
        pwd : '',
        nick:'',
        phone:'',
        email:'',
        address:'',
        level:''
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
        <div className="admin-user-datail-container">
            <div className="admin-user-datail-head">
                <div>회원 목록</div>
                <div><input type="text"/><Button className="btn btn-primary">검색</Button></div>
            </div>
            <div className='admin-user-datail-table'>
                <table>
                    <tbody>
                        <tr>
                            <th>회원 번호</th>
                            <td>ㄴㅇ</td>
                        </tr>
                        <tr>
                            <th>회원 이름</th>
                            <td>{modifyUser.name}</td>
                        </tr>
                        <tr>
                            <th>회원 아이디</th>
                            <td>{modifyUser.id}</td>
                        </tr>
                        <tr>
                            <th>회원 비밀번호</th>
                            <td>멀라 가게</td>
                        </tr>
                        <tr>
                            <th>회원 별명</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>핸드폰 번호</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>상태</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>등급</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>수정 날짜</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>가입 날짜</th>
                            <td>ㅇㅇ</td>
                        </tr>
                    </tbody>
                </table>
                <AdminUserModal title={'회원 정보 수정'} btnTitle={'회원 정보 수정'}/>
            </div>
            
            
        </div>
    );
}