import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {MainChecking} from './mainModal'
import './signUp.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import CryptoJS from 'crypto-js';


const SignUp = ()=>{
    /*암호화 키 지정 */
    let secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

    const navigate = useNavigate();
    

    /*data 전달 값 함수 만들기 */
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [chkPwd, setChkPwd] = useState('');
    const [encPwd, setEncPwd] = useState('');
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
        console.log(completeAddress, completeEmail, id, pwd, name);
        
        }
    /*유효성 검사 */

    /*버튼 비활성화 */
    const[disable, setDisable] = useState(true);
    const handleDisable = () => {
        setDisable(false);
    }
    
    /*별명, 아이디, 이름에 특수문자 못 쓰게 하기 - 자동 제거 */
    const handleValidTxt = (event)=>{
        let oriTxt = event.target.value;
        const filteredTxt = oriTxt.replace(/[^a-zA-Z0-9가-힣]/g, '');
        event.target.value = filteredTxt;
        switch(event.target.id){
            case'id' : setId(event.target.value); break;
            case'nick' :setNick(event.target.value); break;
            case'name' : setName(event.target.value); break;
        }
    }

    /*아이디 글자수 제한 */
    const handleIdLength = () => {
        if(id.length<5){
            alert("아이디는 5글자 이상이어야 합니다");
            setDisable(true);
        }
    }

    /*핸드폰 번호 문자 제한 */
    const handleValidPhone = (event)=>{
        let oriPhone = event.target.value;
        oriPhone = oriPhone.replace(/\D/g, '');
        
        if(oriPhone.length > 3){
            oriPhone = oriPhone.slice(0, 3) + '-' + oriPhone.slice(3);
        }

        if(oriPhone.length>8){
            oriPhone = oriPhone.slice(0, 8) + '-' + oriPhone.slice(8);
        }

        event.target.value = oriPhone;

        handlePhone(event);
    }
    /*비밀번호 암호화 */
        
        /*Encrypt */

        /*Decrypt */
        /*const decrypting = CryptoJS.AES.encrypt(encPwd, secretKey).toString();
        const decPwd = decrypting.toString(CryptoJS.enc.Utf8); */

        /*Encrypt */
        const handleEncPwd = () => {
            if(pwd&&chkPwd){
                console.log("secretKey : ", secretKey);
                setEncPwd(CryptoJS.AES.encrypt(pwd, secretKey).toString());
            }
        }

    /*비밀 번호 글씨 수 검사 */
    const handlePwdLength = () => {
        if(pwd&&pwd.length<10){
            alert("비밀 번호를 10자 이상 입력해주세요");
        }
    }
    
    /*비밀 번호 동일 검사 */
        /*비밀 번호 동일 검사 결과 txt 설정 */
    const [pwdTxt, setPwdTxt] = useState('');
        /*비밀 번호 동일 검사 결과 txt 설정 */
    const [pwdColor, setPwdColor] = useState('');
        /*비밀 번호 동일 검사 함수 */
    const handleValidatePwd = () => {
        if(pwd && chkPwd){
            if(pwd == chkPwd){
                setPwdColor("#7A7A7A");
                setPwdTxt("비밀 번호가 일치합니다.");
            } else {
                setPwdColor("red");
                setPwdTxt("비밀 번호가 일치하지 않습니다.");
            }
        } else {
            setPwdTxt("");
        }
    }


     /*핸드폰 인증 검사 */


    useEffect(()=>{
        handleValidatePwd();
        if(id&&pwd&&nick&&name&&phone&&completeAddress&&completeEmail){handleDisable();}
        user = {userId:id, userPwd:encPwd, userName:name,
            userRegion: '서울특별시 강남구', userLevel: 'A',
            userNick:nick, userAddress:completeAddress, userPhone:phone, userEmail:completeEmail};
    }, [id, pwd, chkPwd, nick, name, phone, completeEmail, completeAddress])


    /*회원 가입 버튼 */
    const handleSubmit = (event) => {
        event.preventDefault();
        if(id&&pwd&&nick&&name&&phone&&completeAddress&&completeEmail){
            /*비밀번호 암호화*/
        handleEncPwd();
        console.log(pwd);

        //axios이용해서 POST 요청 보내기
        axios.post("/dasony/api/test", user, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => {
                //요청 성공했을 때 실행할 코드
                console.log(response.data);//응답 데이터 출력
                alert(response.data.msg);
                navigate('/location', {state:user});
            })
            .catch(error => {
                //요청 실패했을 때 실행될 코드
                console.log(error);//오류 메시지 출력
            });
        } else {
            alert("입력칸을 모두 채워주세요.");
        }
        
        
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
                        <td><input id='id' type='text' onChange={handleValidTxt} onBlur={handleIdLength} value={id}/></td>
                        <th style={{textAlign:'left'}}><MainChecking txt='아이디 중복 확인' data={id} setId={setId}/></th>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input type='password' onChange={handlePwd} onBlur={handlePwdLength} value={pwd} maxLength={20}/></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td><input type='password' onChange={handleChkPwd} onBlur={handleEncPwd} value={chkPwd} maxLength={20}/></td>
                        <td style={{fontSize:'1vw', color:pwdColor, textAlign:'left'}}>{pwdTxt}</td>
                    </tr>
                    <tr>
                        <th>별명</th>
                        <td><input id='nick' type='text' onChange={handleValidTxt} value={nick}/></td>
                        <th style={{textAlign:'left'}}><MainChecking txt='별명 중복 확인' data={nick} setNick={setNick}/></th>
                    </tr>
                    <tr>
                        <th>이름(실명)</th>
                        <td><input id='name' type='text' onChange={handleValidTxt} value={name}/></td>
                    </tr>
                    <tr>
                        <th>핸드폰번호</th>
                        <td><input type='text' onChange={handleValidPhone} maxLength={13} value={phone}/></td>
                        <th style={{textAlign:'left'}}><MainChecking txt='인증하기'/></th>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input type='text' style={{width:'38%'}} onChange={handleEmailId} onBlur={handleCompleteEmail} value={emailId}/>
                            {" "}@{" "}
                            <input type='text' style={{width:'36%'}} value={email==''?userEmail:email} readOnly={readOnly} onChange={handleUserEmail}  onBlur={handleCompleteEmail}/>
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
                        <td><button onClick={handleSubmit} disabled={disable}>회원 가입</button></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>


        </div>
    
    );
    
}

export default SignUp;