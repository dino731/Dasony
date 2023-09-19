import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import './MyChatListModal.css';
import { useNavigate } from 'react-router';
import axios from "axios";

const chatlistmodal = {
  content: {
    top: '65%',
    left: '75.5%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '482px',
    padding: '0',
    borderRadius: '0.6vw',
    border : 'none'
  }
};

const MyChstListModal = ({ isOpen, closeModal }) => {
    const navigate = useNavigate();
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    // 전체 채팅
    const [MyChatList, setMyChatList] = useState([]);
    // 스크랩한 채팅
    const [starChatList, setStarChatList] = useState([]);
    // 일반 채팅
    const [normalChatList, setNormalList] = useState([]);
    const [isFilled, setIsFilled] = useState([]);


    // console.log("뭐있냐곻",isFilled); // chatRoomNo : true
    // console.log("chatList", MyChatList);

    const getStarts = (chatList) => {
        axios.post(`/dasony/getStar`, {userNo: loginUserNo})
        .then((response) => {
            const serverStarData  = response.data.list; // {chatRoomNo: 11, userNo: 23090757}, {chatRoomNo: 20, userNo: 23090757}

            //console.log("데이터 가져와 : ", {userNo: loginUserNo});
            //console.log("스크랩한 채팅 ", serverStarData);


            //console.log("chatList origin ::", chatList);

            const starStatusList = [];
            const favChatList = [];
            // 체크한 채팅 / 일반 채팅 분리용 리스트
            const starChat = [];
            const normalChat = [];
            chatList.map((chat, i) => { // {chatRoomNo: 34, userNo: 0, chatRoomTitle: '만들어줘'

                for(let index in serverStarData){
                    const roomNo = serverStarData[index].chatRoomNo; // 찜한 채팅 넘버

                    // console.log("index :: ", index);
                    // console.log(roomNo);


                    favChatList.push(roomNo);
                }

                if(!favChatList.includes(chat.chatRoomNo)){
                    starStatusList.push(false);
                    normalChat.push(chat);
                  }else{
                    starStatusList.push(true);
                    starChat.push(chat);
                }

                setIsFilled(starStatusList);

                // console.log("filled list :: ", starStatusList);
                // console.log("chat coll :: ", chat);


                return chat;
                });

          console.log("only star chat list ::", starChat);
          console.log("only normal chat list ::", normalChat);
          // 분리한 채팅 목록 set 저장
          setStarChatList(starChat);
          setNormalList(normalChat);
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        axios.post(`/dasony/selectUserChatList`, { userNo: loginUserNo })
            .then((response) => {
                setMyChatList(response.data); 
                
                console.log("======stars load======");
                getStarts(response.data); 
            })
            .catch(error => console.log(error));

    }, []);

    const handelInchat = (chatRoomNo) => {
        const chatFi = MyChatList.find((chatItem) => chatItem.chatRoomNo === chatRoomNo);
        if (chatFi) {
            const { chatRoomNo, chatRoomTitle } = chatFi;
            navigate(`/chat/${chatRoomNo}/${chatRoomTitle}`);
        }
    };

    const handleStarClick = (chat, index, status) => {
        const starData = {
            chatRoomNo: chat.chatRoomNo,
            userNo: loginUserNo
        };

        //console.log("is checked? :: ", isFilled[index]);

        if(status != "normal"){ // isFilled[index]

            axios.post(`/dasony/delStar`, starData)
            .then((response) => {
                console.log(response.data);
                const starStatusList = Object.assign([], isFilled);
                starStatusList[index] = false;
                setIsFilled(starStatusList);
                // 일반 채팅 리스트 추가
                setNormalList([...normalChatList, chat]);
                // 중요 채팅 리스트 삭제
                const starCopyList = Object.assign([], starChatList);
                starCopyList.splice(index, 1);
                setStarChatList(starCopyList);

            }).catch((error) => console.log(error));

        }else{
            axios.post(`/dasony/addStar`, starData)
            .then((response) => {
                console.log(response.data);
                const starStatusList = Object.assign([], isFilled); // 빈 배열에 isFilled의 값을 복사함
                starStatusList[index] = true;
                setIsFilled(starStatusList);   
                // 중요 채팅 리스트 추가
                setStarChatList([...starChatList, chat]);
                // 기존 일반 챝 리스트 삭제
                const normalCopyList = Object.assign([], normalChatList);
                normalCopyList.splice(index, 1);
                setNormalList(normalCopyList);

            }).catch((error) => console.log(error));
        }
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
              {starChatList.map((chat, index) => (
                <tr key={chat.chatRoomNo}>
                  <td width="150">{chat.chatRoomNo}</td>
                  <td width="300" onClick={() => handelInchat(chat.chatRoomNo)}>{chat.chatRoomTitle}</td>
                  <td width="200">{chat.userName}</td>
                  <td width="80">
                    <i
                        className='bi bi-star-fill'
                        onClick={() => handleStarClick(chat, index, "star")}
                    ></i>
                  </td>
                </tr>
              ))}

              {normalChatList.map((chat, index) => (
                <tr key={chat.chatRoomNo}>
                  <td width="150">{chat.chatRoomNo}</td>
                  <td width="300" onClick={() => handelInchat(chat.chatRoomNo)}>{chat.chatRoomTitle}</td>
                  <td width="200">{chat.userName}</td>
                  <td width="80">
                    <i
                        className='bi bi-star'
                        onClick={() => handleStarClick(chat, index, "normal")}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button id="closeBtn" onClick={closeModal}>x</button>
      </div>
    </Modal>
  );
};

export default MyChstListModal;
