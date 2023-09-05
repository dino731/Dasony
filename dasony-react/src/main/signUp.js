import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {MainChecking} from './mainModal'
import './signUp.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';


const SignUp = ()=>{

    

    const navigate = useNavigate();
    

    /*data 전달 값 함수 만들기 */
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [chkPwd, setChkPwd] = useState('');
    const [nick, setNick] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailId, setEmailId] = useState('');
    const [email, setEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [readOnly, setReadOnly] = useState(true);
    const [completeEmail, setCompleteEmail] = useState('');
    const [show, setShow] = useState(false);
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [completeAddress, setCompleteAddress] = useState('');
    let user = {};


    const handleId = (event)=>setId(event.target.value);
    const handlePwd = (event)=>setPwd(event.target.value);
    const handleChkPwd = (event)=>setChkPwd(event.target.value);
    const handleNick = (event)=>setNick(event.target.value);
    const handleName = (event)=>setName(event.target.value);
    const handlePhone = (event)=>setPhone(event.target.value);
    const handleEmailId = (event)=>setEmailId(event.target.value);
    const handleEmail = (event)=>{
        const selectVal = event.target.value;
        if(selectVal=='naver.com'|| selectVal=='gmail.com'||selectVal=='kakao.com'||selectVal=='nate.com'){
            setEmail(selectVal);
            setReadOnly(true);
        } else {
            setReadOnly(false);
            setEmail('');
        }
    }
    const handleUserEmail = (event)=>setUserEmail(event.target.value);
    const handleCompleteEmail = ()=>setCompleteEmail(emailId+'@'+(email==''?userEmail:email));
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlePostcodeComplete = (data) => {
        // 주소 검색 완료 시 실행되는 함수
        handleClose();
        setPostcode(data.zonecode);
        setAddress(data.address);
    };
    const handleDetailAddress = (event)=> setDetailAddress(event.target.value);
    const handleCompleteAddress = ()=>setCompleteAddress(postcode+','+address+','+detailAddress);
    const handleCompleteChk = ()=>{
        handleCompleteAddress();
        handleCompleteEmail(); 
        console.log(completeAddress, completeEmail);
        user = {userId:id, userPwd:pwd, userName:name, userNo:20230904005,
                userRegion: '서울특별시 강남구', userLevel: 'A',
                userJoinDate:'2023-09-04',
                userModDate: '2023-09-04',
                userStatus: 'Y',
                userNick:nick, userAddress:completeAddress, userPhone:phone, userEmail:completeEmail};
        }
    /*유효성 검사 */

    const handleSubmit = (event, user) => {
        event.preventDefault();
        //Spring Boot 컨트롤러 url

        //axios이용해서 GET 요청 보내기
        axios.post("/dasony/api/test", JSON.stringify(user), {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => {
                //요청 성공했을 때 실행할 코드
                console.log(response.data);//응답 데이터 출력
            })
            .catch(error => {
                //요청 실패했을 때 실행될 코드
                console.log(error);//오류 메시지 출력
            });
    };

    return(
        <div className='sign-up-container' onClick={handleCompleteChk}>
            
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>회원가입<hr/></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td><input type='text' onBlur={handleId}/></td>
                        <th style={{textAlign:'left'}}><MainChecking txt='중복 확인' bodyTxt='이미 사용중인 아이디입니다.'/></th>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input type='text' onBlur={handlePwd}/></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td><input type='text' onBlur={handleChkPwd}/></td>
                    </tr>
                    <tr>
                        <th>별명</th>
                        <td><input type='text' onBlur={handleNick}/></td>
                        <th style={{textAlign:'left'}}><MainChecking txt='중복 확인' bodyTxt='이미 사용중인 별명입니다.'/></th>
                    </tr>
                    <tr>
                        <th>이름(실명)</th>
                        <td><input type='text' onBlur={handleName}/></td>
                    </tr>
                    <tr>
                        <th>핸드폰번호</th>
                        <td><input type='text' onBlur={handlePhone}/></td>
                        <th style={{textAlign:'left'}}><MainChecking txt='인증하기'/></th>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input type='text' style={{width:'39%'}} onChange={handleEmailId} onBlur={handleCompleteEmail}/>
                            {" "}@{" "}
                            <input type='text' style={{width:'34%'}} value={email==''?userEmail:email} readOnly={readOnly} onChange={handleUserEmail}  onBlur={handleCompleteEmail}/>
                        </td>
                        <th style={{textAlign:'left'}}>
                            <select onChange={handleEmail}>
                                <option>naver.com</option>
                                <option>kakao.com</option>
                                <option>gmail.com</option>
                                <option>nate.com</option>
                                <option>직접 입력</option>
                            </select>
                        </th>
                    </tr>
                           
                    <tr>
                        <th style={{verticalAlign:'top', paddingTop:'2vh'}}>주소</th>
                        <td style={{height:'20vh'}}>
                            <input style={{marginBottom:'1vh'}} className='postcode' type='text' defaultValue={postcode} readOnly/><br/>
                            <input style={{marginBottom:'1vh'}} className='main-address' type='text' defaultValue={address} readOnly/><br/>
                            <input className='detail-address' type='text' onChange={handleDetailAddress} onBlur={handleCompleteAddress} defaultValue={detailAddress}/></td>
                        <th style={{verticalAlign:'top', paddingTop:'1.5vh', textAlign:'left'}}><Button onClick={handleShow}>주소 찾기</Button></th>
                    </tr>
                    <Modal show={show} onHide={handleClose}>
                        <ModalHeader>주소 찾기</ModalHeader>
                        <ModalBody>{<DaumPostcode onComplete={handlePostcodeComplete}/>}</ModalBody>
                        <Button type='button' className='btn_close' variant='secondary' onClick={handleClose}>닫기</Button>
                        
                    </Modal>
      
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td><button onClick={handleSubmit}>회원 가입</button></td>
                        {/*()=>navigate('/location') */}
                        <td></td>
                    </tr>
                </tfoot>
            </table>


        </div>
    
    );
    
}

export default SignUp;