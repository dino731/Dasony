import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';





function MainChecking(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return(
        <>
        <button onClick={handleShow}>{props.txt}</button>
        <Modal show={show} onHide={handleClose}>
            <ModalHeader>{props.txt}</ModalHeader>
            <ModalBody>{props.bodyTxt}</ModalBody>
            <ModalFooter><Button onClick={handleClose}>닫기</Button></ModalFooter>
        </Modal>
        </>
    );
}
export {MainChecking};
