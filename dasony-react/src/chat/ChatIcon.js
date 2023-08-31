import MyChstListModal from "./MyChatListModal";
import { useState } from 'react';
import './ChatIcon.css';

const ChatIcon = () => {
        const [modalListOpen, setModalIsOpen] = useState(false);
    
        const openModal = () => {
            setModalIsOpen(true);
        };
    
        const closeModal = () => {
            setModalIsOpen(false);
        };

    return(
        <div id="chatimg">
            <i className="bi bi-chat-quote" onClick={openModal} style={{fontSize: '43px'}}></i>
            <MyChstListModal isOpen={modalListOpen} closeModal={closeModal} />
        </div>
    )
}
export default ChatIcon;