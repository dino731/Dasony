import Modal from "react-modal";
import React from "react";
import './NewChatModal.css';
import { useState } from "react";

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '200px',
      outline : 'none'
    }
  };

  const NewChatModal = ({isOpen, closeModal, onChatRoomCreate}) => {
    const [chatRoomName, setChatRoomName] = useState('');

    const handleCreateChatRoom = () => {
      onChatRoomCreate(chatRoomName);
      setChatRoomName('');
      closeModal();
    }

    return(
        <Modal
            isOpen = {isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="NewChatRoom Modal"
        >
            <p id="makechat">채팅방 만들기</p><br/>
            <p id="chatname">채팅방 이름</p>
            <input 
            id="inputtxt" 
            type="text"
            value={chatRoomName}
            onChange={e => setChatRoomName(e.target.value)}
            />
            <br/>
            <button id="createchat" onClick={handleCreateChatRoom}>생성하기</button>
            <button id="modalCloseBtn" onClick={closeModal}>✖</button>
        </Modal>
    )
  }
  export default NewChatModal;