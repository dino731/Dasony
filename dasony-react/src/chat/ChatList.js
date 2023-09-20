import './ChatList.css';
import NewChatModal from './NewChatModal';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChatData } from './ChatDataContext';
import axios from 'axios';
import { useEffect } from 'react';

 const ChatList  = (props) => {

    const {chatData, setChatDate} = useChatData();
    const [userName, setUserName] = useState("");

    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const loginUserRegion = localStorage.getItem("loginUserRegion"); // 사용자 지역 받아옴
    

    const navigate = useNavigate();

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
        getChatList();
    }, [])

// ----------------------------채팅 리스트-------------------------------
    const getChatList = () => {
        axios.get("/dasony/chatlist")
        .then((response) => {
            setChatDate(response.data)
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getChatList();
        
    }, [chatData])

// ----------------------------모달창-----------------------------------
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

// -----------------------------새 채팅방(채팅방 이름)-----------------------------------    

    const handleChatRoomCreate = (chatTitle) => {

        const titleCheck = chatData.some((chat) => chat.chatRoomTitle === chatTitle);
        

        if(titleCheck){
            alert("이미 존재하는 채팅방이 있습니다 다른 제목을 입력해주세요")
            return;
        }else{

            const postNewChat = (newChat) => {
                axios.post("/dasony/openChatRoom", {userNo : loginUserNo, userRegion : loginUserRegion, newChat : newChat})
                // {title: , content: }
                // {no : , chat: {tilte, content}}
                .then((response) => {
                    const chatData = response.data;
                    console.log("뭐있졍", chatData);
                    navigate(`/chat/${chatData.chatRoomNo}/${newChat.chatRoomTitle}`, {replace : true});
                })
                .catch(error => console.log(error));
            }
            
            const newChat = {
                chatRoomTitle : chatTitle,
                userName : userName
            };
    
            const updateChatList = [...chatData, newChat]
    
            setChatDate(updateChatList);
            postNewChat(newChat);

        }
    }

// -----------------------------검색창-----------------------------------
    const [search, setSearch] = useState('');

    const handleSearchEnter = (e) => {
        if(e.key === "Enter"){
            console.log(e)
        }
    }

    const filterChatData = chatData.filter(chat =>
        chat?.chatRoomTitle?.includes(search)
    );


    return(
            <div id="talklistcontent">
                <br/><br/><br/><br/>
                <div id="opentalk">
                    <div id="new_chat">
                        <span>우리동네 오픈채팅</span>
                        <button onClick={openModal}>새로운 오픈채팅</button>
                        <NewChatModal 
                            isOpen={modalIsOpen} 
                            closeModal={closeModal} 
                            onChatRoomCreate={handleChatRoomCreate}
                        />
                    </div>
                    <div className="search">
                        <form id="search_form">
                            <div id="search_key">
                            <input 
                            type="search" 
                            name="keyword" 
                            placeholder="채팅방 이름 키워드를 입력하세요"
                            defaultValue={props.search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyUp={(e) => handleSearchEnter(e)}
                            />
                            </div>
                        </form>
                    </div>
                    <br/>
                    <div id="chatlist">
                        <table id="openchat">
                            <thead>
                                <tr>
                                    <th width="110">방 번호</th>
                                    <th width="400">채팅방 이름 </th>
                                    <th width="250">개설자</th>
                                    <th width="160">참여원</th>
                                    <th width="150"></th>
                                </tr>
                            </thead>
                        </table>
                        <div id="scrollchat">
                            {filterChatData.length === 0 ? (
                                <table id='tchattable'>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} width={1200}>해당하는 채팅방이 없습니다</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                            <table id="tchattable">
                                <tbody style={{height: '100%'}}>
                                    {filterChatData.map((chat) => {
                                        if(chat.chatRoomRegion === loginUserRegion){
                                            return(
                                            <tr key={chat.chatRoomNo}>
                                                <td width="110">{chat.chatRoomNo}</td>
                                                <td width="470">{chat.chatRoomTitle}</td>
                                                <td width="235">{chat.userName}</td>
                                                <td width="215">{chat.cnt}명</td>
                                                <td width="150">
                                                <Link to={`/chat/${chat.chatRoomNo}/${chat.chatRoomTitle}`}><button>참여하기</button></Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    })}
                                </tbody>
                            </table> 
                            )}
                        </div>    
                    </div>
                </div>
            </div>                              
    );
}
export default ChatList;