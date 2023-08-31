import './adminUser.css';
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import AdvancedExample from '../shop/Pagination';
import { useState, useEffect } from 'react';

export const AdminUser = () => {

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
                <div>회원 목록</div>
                <div><input type="text"/><Button className="btn btn-primary">검색</Button></div>
            </div>
            <div className='admin-user-table'>
            <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>회원 고유키</th>
                            <th>이름</th>
                            <th>아이디</th>
                            <th>비밀번호</th>
                            <th>별명</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                            <td>몰</td>
                        </tr>
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
                <div><Button className="btn btn-primary" onClick={handleOn}>회원 추가</Button></div>
            </div>
            <Modal show={show} onHide={handleOff}>
                    <ModalHeader>
                        상점 추가 
                        <Button className='btn btn-danger' onClick={handleOff}>x</Button>
                    </ModalHeader>
                    <ModalBody>
                        <table style={{width:'100%', textAlign:'center', marginTop:'5%'}}>
                            <tbody>
                                <tr style={{height:'7vh'}}>
                                    <th>회원 고유키</th>
                                    <td>
                                        <input id='oriKey' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewUser} value={newUser.oriKey}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>이름</th>
                                    <td>
                                        <input id='name' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewUser} value={newUser.name}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>아이디</th>
                                    <td>
                                        <input id='id' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewUser} value={newUser.id}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>비밀번호</th>
                                    <td>
                                        <input id='pwd' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewUser} value={newUser.pwd}/>
                                    </td>
                                </tr>
                                <tr style={{height:'7vh'}}>
                                    <th>별명</th>
                                    <td>
                                        <input id='nick' type='text' style={{width:'60%', height:'5vh'}}
                                                onChange={handleNewUser} value={newUser.nick}/>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td  colSpan={2} style={{textAlign:'right'}}>
                                        <Button className="btn btn-primary"
                                                onClick={handleNewUserArray}>확인</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>
        </div>
    );
}