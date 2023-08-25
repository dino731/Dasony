import './Chat.css';
import React, { useState } from 'react';
import { useParams} from 'react-router';
import { Link } from 'react-router-dom';

const Chat = () =>{

    const {chatname} = useParams();

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
    

    return (
    <>
       <div id="chatcontent">
            <br/><br/><br/><br/>
            <div id="mychat">
                <div id="chat_name">
                    <span>{chatname}</span>
                    <Link to="/chatlist"><button id='exitbtn'>나가기</button></Link> {/* onClick={handleExit} */}
                    <br/>
                    <hr/>
                    <ul id="chat_cont">
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="othortalk">
                            <b>말미잘</b>
                            <p id="chat">처음뵙겠습니다!</p>
                            <span id="chat_date">2023-08-21</span>
                        </li>
                        <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="othortalk">
                            <b>말미잘</b>
                            <p id="chat">처음뵙겠습니다!</p>
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
                        <i className="bi bi-plus" style={{fontSize: '30px'}}></i>
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