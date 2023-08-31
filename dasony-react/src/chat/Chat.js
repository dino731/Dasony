import './Chat.css';
import React, { useState } from 'react';
import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';

const Chat = () =>{

    const {chatname} = useParams();
    const decodeChatname = decodeURIComponent(chatname);

    // const navigate = useNavigate();

    // const handleExit = () => {
    //     navigate('/chatlist');
    // };

    const [sendchat, setSendChat] = useState('');

    const changeSendChat = (e) => {
        setSendChat(e.target.value);
    }

    const handleSendChat = () => {
        console.log(sendchat);
        setSendChat('');
    }

    const handleReport = (e) =>{ // 마우스 우클릭 이벤트(채팅 내용 신고 시) 
        e.preventDefault();
        alert("해당 채팅을 신고하시겠습니까?");
    }

    // -----------------------파일 업로드--------------------------------
    const [selectFile, setSelectFile] = useState(null);

    const handleIconClick = () => {
        const fileInput = document.getElementById('chooseFile');
        fileInput.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectFile(file);

        setSendChat(file ? file.name : ''); 
    };

    // ---------------------------모달창------------------------------------
    const [profileOpen, setProfileOpen] = useState(false);
    const [userName, setUserName] = useState('');

    const openModal = (username) => {
        setUserName(username);
        setProfileOpen(true);
    };

    const closeModal = () => {
        setProfileOpen(false);
    };

    return (
    <>
       <div id="chatcontent">
            <div id="mychat">
                <div id="chat_name">
                    <div id='chat_head'>
                        <span>{decodeChatname}</span>
                        <Link to="/chatlist"><button id='exitbtn'>나가기</button></Link> {/* onClick={handleExit} */}
                    </div>
                    <hr/>
                    <ul id="chat_cont">
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="othortalk">
                            <b onClick={(event) => openModal(event.target.textContent)}>똥구멍</b> {/*username클릭 시 해당 username가져옴 */}
                            <UserProfile
                               isOpen={profileOpen}
                               closeModal={closeModal} 
                               username={userName}
                            />
                            <p id="chat" onContextMenu={handleReport}>처음뵙겠습니다!</p> {/*해당 채팅 내용 신고 */}
                            <span id="chat_date">2023-08-21</span>
                        </li>
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="othortalk">
                        <b onClick={(event) => openModal(event.target.textContent)}>말미잘</b>
                        <p id="chat" onContextMenu={handleReport}>처음뵙겠습니다!</p>
                            <span id="chat_date">2023-08-21</span>
                        </li>
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                    </ul>
                    <hr/>
                    <div id="sendchat">
                        <form encType='multipart/form-data'>
                            <label>
                                <i className="bi bi-plus" style={{fontSize: '30px'}}
                                onClick={handleIconClick}></i>
                            </label>
                            <input type='file' id='chooseFile' name='chooseFile' accept='image/*'
                            onChange={handleFileChange}/>
                        </form>
                        <textarea 
                        id="inputchat" 
                        rows="3"
                        value={sendchat}
                        onChange={changeSendChat}
                        ></textarea>
                        <button id="send" onClick={handleSendChat}>보내기</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default Chat;