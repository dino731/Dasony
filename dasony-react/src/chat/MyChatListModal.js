import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import './MyChatListModal.css';
import { useNavigate } from 'react-router';
import { useChatData } from './ChatDataContext';
import axios from "axios";

const chatlistmodal = {
  content: {
    top: '65%',
    left: '75.5%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '482px',
    padding: '0'
  }
};

const MyChstListModal = ({ isOpen, closeModal }) => {
    const navigate = useNavigate();
    const { chatData } = useChatData();
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const [MyChatList, setMyChatList] = useState([]);
    const [isFilled, setIsFilled] = useState([]);
    console.log("뭐있냐곻",isFilled); // chatRoomNo : true

    useEffect(() => {
        axios.post(`/dasony/selectUserChatList`, { userNo: loginUserNo })
            .then((response) => setMyChatList(response.data))
            .catch(error => console.log(error));
    }, []);

    const handelInchat = (chatRoomNo) => {
        const chatFi = MyChatList.find((chatItem) => chatItem.chatRoomNo === chatRoomNo);
        if (chatFi) {
            const { chatRoomNo, chatRoomTitle } = chatFi;
            navigate(`/chat/${chatRoomNo}/${chatRoomTitle}`);
        }
    };

    const handleStarClick = (chatRoomNo) => {
        const starData = {
            chatRoomNo: chatRoomNo,
            userNo: loginUserNo
        };

        axios.post(`/dasony/addStar`, starData)
            .then((response) => {
                console.log(response.data);

                const updateChatList = MyChatList.map((chat) => {
                    if (chat.chatRoomNo === chatRoomNo) {
                      chat.isFilled = !chat.isFilled;
                      setIsFilled((isFiiled) => ({
                        ...isFiiled, [chatRoomNo] : chat.isFiiled,
                      }));
                    }
                    return chat;
                  });
                setMyChatList(updateChatList);

                axios.post(`/dasony/getStar`, starData)
                    .then((response) => {
                        const serverStarData  = response.data;
                        console.log("데이터 가져와 : ", starData);
                        console.log("너는 뭐가있니", serverStarData);

                        const updateChatList = MyChatList.map((chat) => {
                            if (chat.chatRoomNo === chatRoomNo) {
                            //   chat.isFilled = serverStarData;
                            //   setIsFilled(serverStarData);
                                setIsFilled((isFiiled) => ({
                                    ...isFiiled, [chatRoomNo] : serverStarData,
                                  }));
                            }
                            return chat;
                          });
                        setMyChatList(updateChatList);
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={chatlistmodal}
      contentLabel="MyChatList Modal"
    >
      <div id="togglechat">
        <table id="toggle_head">
          <thead>
            <tr style={{ fontSize: '15px' }}>
              <th width="150">방 번호</th>
              <th width="300">채팅방 이름</th>
              <th width="200">개설자</th>
              <th width="80"></th>
            </tr>
          </thead>
        </table>
        <div id="toggle_body">
          <table id="ttable">
            <tbody style={{ textAlign: 'center', height: '100%' }}>
              {MyChatList.map((chat) => (
                <tr key={chat.chatRoomNo}>
                  <td width="150">{chat.chatRoomNo}</td>
                  <td width="300" onClick={() => handelInchat(chat.chatRoomNo)}>{chat.chatRoomTitle}</td>
                  <td width="200">{chat.userName}</td>
                  <td width="80">
                    <i
                      className={chat.isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                      onClick={() => handleStarClick(chat.chatRoomNo)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button id="closeBtn" onClick={closeModal}>✖</button>
      </div>
    </Modal>
  );
};

export default MyChstListModal;
