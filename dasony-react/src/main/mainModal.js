import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';





function MainChecking(props){
    {/*모달 창 유무 */}
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        getBodyTxt();
        setShow(true);
    }

    {/*바디 텍스트 설정 */}
    const [bodyTxt, setBodyTxt] = useState('');
    const getBodyTxt = () => {
        
        let ModalData = {id:"", nick:""};
        if(props.txt.includes("아이디")){
            ModalData.id = props.data;
        } else {
            ModalData.nick = props.data;
        }
        axios.post('/dasony/api/chkValidate', ModalData, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        . then(response => {
            console.log("성공:response.data:", response.data);
            if(props.txt.includes('아이디')){
                if(!response.data){
                    setBodyTxt('사용가능한 아이디입니다.');
                    props.setId(ModalData.id);
                    props.setCompleteDuplcateId(true);
                    return;
                } else {
                    setBodyTxt('이미 사용 중인 아이디입니다.');
                    props.setId('');
                    return;
                }
                
            } else {
                if(!response.data){
                    setBodyTxt('사용가능한 별명입니다.');
                    props.setNick(ModalData.nick);
                    props.setCompleteDuplcateNick(true);
                    return;
                } else {
                    setBodyTxt('이미 사용 중인 별명입니다.');
                    props.setNick('');
                    return;
                }
            }
        })
        .catch(error => {
            console.log("실패:error:", error);
        })
    }



    return(
        <>
        <button onClick={handleShow}>{props.txt}</button>
        <Modal show={show} onHide={handleClose}>
            <ModalHeader>{props.txt}</ModalHeader>
            <ModalBody>{bodyTxt}</ModalBody>
            <ModalFooter><Button onClick={handleClose}>닫기</Button></ModalFooter>
        </Modal>
        </>
    );
}
export {MainChecking};
