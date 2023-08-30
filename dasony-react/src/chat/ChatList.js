import { tab } from '@testing-library/user-event/dist/tab';
import './ChatList.css';
import NewChatModal from './NewChatModal';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChatData } from './ChatDataContext';

 const ChatList  = (props) => {

    const {chatData, setChatDate} = useChatData();

    const navigate = useNavigate();

// ----------------------------모달창------------------------------------
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

// -----------------------------검색창-----------------------------------
    const [search, setSearch] = useState('');

    const handleSearchEnter = (e) => {
        if(e.key === "Enter"){
            // handleSearch();
            console.log(e)
        }
    }

    const filterChatData = chatData.filter(chat =>
        chat.chatname.includes(search)
    );

// -----------------------------새 채팅방(채팅방 이름)-----------------------------------    
    // const [chatRoomNames, setChatRoomNames] = useState([]);

    const handleChatRoomCreate = (chatRoomName) => {
        const newChatRoom = {
            id : chatData.length + 1,
            chatname : chatRoomName,
            username : '똥꾸멍',
            people : 0
        };

        const updateChatDate = [...chatData, newChatRoom];
        setChatDate(updateChatDate);

        closeModal();

        const encodedChatname = encodeURIComponent(newChatRoom.chatname);

       navigate(`/chat/${encodedChatname}`);
        // setChatRoomNames([...chatRoomNames, newChatRoom]);
        // console.log(newChatRoom);

    }


    // const [chatlist, setChatList] = useState([
    // ]);

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
                                    {filterChatData.map(chat => (
                                    <tr key={chat.id}>
                                        <td width="110">{chat.id}</td>
                                        <td width="470">{chat.chatname}</td>
                                        <td width="235">{chat.username}</td>
                                        <td width="205">{chat.people}명</td>
                                        <td width="150">
                                        <Link to={`/chat/${chat.chatname}`}><button>참여하기</button></Link>
                                        </td>
                                    </tr>
                                    ))}
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