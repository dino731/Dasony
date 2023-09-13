import './Chat.css';
import React, { useState, useEffect} from 'react';
import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

const Chat = () =>{

    const {chatRoomTitle} = useParams();
    const {chatRoomNo} = useParams();
    const {createChatRoomNo} = useParams();

    const decodeChatname = decodeURIComponent(chatRoomTitle);

    const [stompClient, setStompClient] = useState(null);
    const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
    const [sendchat, setSendChat] = useState(''); // 입력되는 채팅
    const [userName, setUserName] = useState("");
    const [chatData, setChatDate] = useState([]);

    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);

    useEffect(() => {
        axios.post(`/dasony/api/userInfo`, {userNo : loginUserNo})
        .then((response) => {
            const userData = response.data;
            if(userData.user){
                const {userName} = userData.user;
                setUserName(userName);
            }else{
                console.log("사용자 정보를 찾을 수 없음");
            }
        })
        .catch((error)=> {
            console.log(error);
        })
    }, []);

    useEffect(() => {

        const socket = new SockJS('http://localhost:3000/dasony/chat');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {

            console.log("웹소켓 연결 완료");

            stompClient.subscribe(`/sub/chat/${chatRoomNo}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log("수신 메세지 : ", receivedMessage);
                setChatList((chatlist) => 
                [...chatlist, receivedMessage]);

            });


            setStompClient(stompClient);
        });

        return () => { // 컴포넌트 소멸되기 전 웹소켓 연결 종료
            if(stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

     const chatMsg = () => {
         if(stompClient) {

            const chatMsg = {
                message : sendchat,
            };

            const headers = {
                userNo : loginUserNo,
                userName : userName,
            }

            // JSON.stringify({chatMsg : JSON.stringify(chatMsg)})

            stompClient.send(`/app/chat/${chatRoomNo}`, headers, JSON.stringify({chatMsg : JSON.stringify(chatMsg)}));
        }
        setSendChat('');
        };

        const changeSendChat = (e) => {
            setSendChat(e.target.value);
    }

    const handleSendChat = (chat) => { // 보내기 버튼 눌렀을 때
        setSendChat('');
        chatMsg(chat);
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

    const openModal = (username) => {
        setUserName(username);
        setProfileOpen(true);
    };

    const closeModal = () => {
        setProfileOpen(false);
    };

    // ---------------------------채팅 입장----------------------------------

    // const [userName, setUserName] = useState(""); -> 모달창에서 선언함

    useEffect(() => {
        axios.get(`/dasony/chat/${chatRoomNo}/${chatRoomTitle}`, {
            headers : {
                userNo : loginUserNo
            }
        })
        .then((response) => {
            const chattingData = response.data;
            setChatDate(chattingData);

            // console.log("잘 받아와졌으련지;" + chattingData[1].chatMsg); 
            // console.log("userNo : ", loginUserNo);
            // console.log("chatData : ", chattingData);

            // chattingData.map((message, index) => {
            //     console.log(`채팅 메세지 ${index + 1} : `, message.chatMsg);
            // })
        })
        .catch(error => console.log(error));
    }, [chatData]);


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
                        {chatData.map((message, index) => (
                            <li key={index} className={message.userNo === loginUserNo ? "mytalk" : "othertalk"}>
                            {message.userNo === loginUserNo ? (
                                <>
                                <span id="chat_date">{message.chatDate}</span>
                                <p id="chat">{message.chatMsg}</p>
                                </>
                            ) : (
                                <>
                                <b onClick={() => openModal(message.userName)}>{message.userName}</b>
                                <UserProfile isOpen={profileOpen} closeModal={closeModal} username={userName} />
                                <p id="chat">{message.chatMsg}</p> 
                                <span id="chat_date">{message.chatDate}</span>
                                </>
                            )}
                            </li>
                        ))}

                        {/* <li id="mytalk">
                            <span id="chat_date">2023-08-21</span>
                            <p id="chat">안녕하세요!</p>
                        </li>
                        <li id="othortalk">
                        <b onClick={(event) => openModal(event.target.textContent)}>말미잘</b>
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
                        </li> */}
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
                        <button id="send" onClick={(chat) => handleSendChat(chat)}>보내기</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default Chat;