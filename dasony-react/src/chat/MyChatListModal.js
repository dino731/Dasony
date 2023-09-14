import Modal from "react-modal";
import React, {useState, useEffect} from "react";
import './MyChatListModal.css';
// import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router';
import { useChatData } from './ChatDataContext';
import axios from "axios";
import { error } from "jquery";

const chatlistmodal = {
    content: {
      top: '65%',
      left: '75.5%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '482px',
      padding : '0'
    }
  };

  const MyChstListModal = ({isOpen, closeModal}) => {


      const navigate = useNavigate();

      const {chatData} = useChatData(); // 채팅방 리스트를 거치지 않으면 모달 창에 값이 들어오지 않음
      const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
      const [MyChatList, setMyChatList] = useState([]);
      const [stars, setStars] = useState([]);
      const [isFilled, setIsFilled] = useState(false);


      useEffect(() => {
        axios.post(`/dasony/selectUserChatList`, {userNo : loginUserNo})
        .then((response) => setMyChatList(response.data))
        .catch(error => console.log(error));
      },[]);

    const handelInchat = (chatRoomNo) => {
        const chatFi = MyChatList.find((chatItem) => chatItem.chatRoomNo === chatRoomNo);
        
        if (chatFi) {
        const { chatRoomNo, chatRoomTitle } = chatFi;
        navigate(`/chat/${chatRoomNo}/${chatRoomTitle}`);
        }
    }

    // useEffect(() => {
    //     setStars(MyChatList.map(data => (
    //         {...data, isFilled : false}
    //     )))
    // }, [MyChatList]);


    // const handleStarClick = (id) => {
    //     setStars((star) => {
    //         const clickStar = star.map((str) => 
    //             str.id === id ? {...str, isFilled : !str.isFilled} : str
    //         ); //각 항목의 id와 클릭한 별 아이콘의 id를 비교 만약 두 id가 일치한다면 해당 별의 isFilled 값을 토글하여 변경하고, 일치하지 않는 경우에는 원래의 상태를 그대로 유지
    //         // 나머지 속성들은 그대로 가져오되, isFilled 속성만 변경

    //         // 별을 누른 채팅방 데이터를 목록 상단으로 이동
    //         const starredChat = clickStar.find((str) => str.id === id); // 별을 누른 채팅방 찾음
            
    //         const otherChats = clickStar.filter((str) => str.id !== id); // 누르지 않은 나머지 채팅방을 배열에 저장

    //         return [starredChat, ...otherChats];
    //     });
    // };

    const handleStarClick = (chatRoomNo) => {
        const starData = {
            chatRoomNo : chatRoomNo,
            userNo : loginUserNo
        };
        
        axios.post(`/dasony/addStar`, starData)
            .then((response) => {
                console.log(response.data);
                axios.get('/dasony/getStar')
                .then((response) => {
                    const starData = response.data;
                    console.log("데이터 가져와 : ", starData);

                    const updateChatList = MyChatList.map((chat) => {
                        const starInfo = starData.find((star) => star.chatRoomNo === chat.chatRoomNo);
                        if(starInfo){
                            chat.isFilled = true;
                        }else{
                            chat.isFilled = false;
                        }
                        return chat;
                    });
                    setMyChatList(updateChatList);
                })

                .catch((error) => console.log(error));
                })

            .catch((error) => console.log(error));
        

        // axios.delete(`/dasony/deleteStar`)
    }

    

    return( 
        <Modal
        isOpen = {isOpen}
        onRequestClose={closeModal}
        style={chatlistmodal}
        contentLabel="MyChatList Modal"
        >
            <div id="togglechat">
                <table id="toggle_head">
                    <thead>
                        <tr style={{fontSize: '15px'}}>
                            <th width="150">방 번호</th>
                            <th width="300">채팅방 이름</th>
                            <th width="200">개설자</th>
                            <th width="80"></th>
                        </tr>
                    </thead>
                </table>
                <div id="toggle_body">
                    <table id="ttable">
                        <tbody style={{textAlign: 'center', height: '100%'}}>
                           {
                                <div>
                                    {MyChatList.map((chat) => { // 해당 제목을 눌러야만 채팅방으로 넘어가도록
                                        return <tr key={chat.chatRoomNo}>
                                            <td width="150">{chat.chatRoomNo}</td>
                                            <td width="300" onClick={() => handelInchat(chat.chatRoomNo)}>{chat.chatRoomTitle}</td> 
                                            <td width="200">{chat.userName}</td>
                                            <td width="80">
                                            <i className={chat.isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                                onClick={() => handleStarClick(chat.chatRoomNo)}></i>
                                            </td>
                                        </tr>
                                    })}
                                </div>
                            } 
                            
                            {/* <tr>
                                <td>1</td>
                                <td>안 고독한</td>
                                <td>말미잘</td>
                                <td>
                                    <i className={isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                    onClick={handleStarClick}></i>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>안 고독한</td>
                                <td>말미잘</td>
                                <td>
                                    <i className={isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                    onClick={handleStarClick}></i>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>안 고독한</td>
                                <td>말미잘</td>
                                <td>
                                    <i className={isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                    onClick={handleStarClick}></i>
                                </td>
                            </tr>
                            
                             stars.map((star) => (
                               return <tr key={star.id} onClick={() => handelInchat(star.chatname)}>
                                    <td width="150">{star.id}</td>
                                    <td width="300">{star.chatname}</td>
                                    <td width="200">{star.username}</td>
                                    <td width="80">
                                    <i className={star.isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                        onClick={() => handleStarClick(star.id)}></i>
                                    </td>
                            </tr>*/}
                        </tbody>
                    </table>
                </div>
                <button id="closeBtn" onClick={closeModal}>✖</button>
            </div>
        </Modal>
    );
};
export default MyChstListModal;
