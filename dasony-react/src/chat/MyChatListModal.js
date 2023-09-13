import Modal from "react-modal";
import React, {useState, useEffect} from "react";
import './MyChatListModal.css';
// import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router';
import { useChatData } from "./ChatDataContext";



const chatlistmodal = {
    content: {
      top: '55%',
      left: '70%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '482px',
      padding : '0'
    }
  };

  const MyChstListModal = ({isOpen, closeModal}) => {

    const navigate = useNavigate();

    const {chatData, setChatDate} = useChatData();
    const [stars, setStars] = useState([]);

    const handelInchat = (chatname) => {
        navigate(`/chat/${chatname}`);
        // console.log(navigate);
    }


    useEffect(() => {
        setStars(chatData.map(data => (
            {...data, isFilled : false}
        )))
    }, [chatData]);


    const handleStarClick = (id) => {
        setStars((star) => {
            const clickStar = star.map((str) => 
                str.id === id ? {...str, isFilled : !str.isFilled} : str
            ); //각 항목의 id와 클릭한 별 아이콘의 id를 비교 만약 두 id가 일치한다면 해당 별의 isFilled 값을 토글하여 변경하고, 일치하지 않는 경우에는 원래의 상태를 그대로 유지
            // 나머지 속성들은 그대로 가져오되, isFilled 속성만 변경

            // 별을 누른 채팅방 데이터를 목록 상단으로 이동
            const starredChat = clickStar.find((str) => str.id === id); // 별을 누른 채팅방 찾음
            
            const otherChats = clickStar.filter((str) => str.id !== id); // 누르지 않은 나머지 채팅방을 배열에 저장

            return [starredChat, ...otherChats];
        });
    };

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
                                    {stars.map((star) => {
                                        //console.log(star.chatname);
                                        return <tr key={star.id}>
                                            <td width="150" onClick={() => handelInchat(star.chatname)}>{star.id}</td>
                                            <td width="300" onClick={() => handelInchat(star.chatname)}>{star.chatname}</td>
                                            <td width="200" onClick={() => handelInchat(star.chatname)}>{star.username}</td>
                                            <td width="80">
                                            <i className={star.isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                                onClick={() => handleStarClick(star.id)}></i>
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
