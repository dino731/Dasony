import Modal from "react-modal";
import React, {useState} from "react";
import './MyChatListModal.css';
// import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router';


const chatlistmodal = {
    content: {
      top: '71%',
      left: '77%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '482px',
      padding : '0'
    }
  };

  const MyChstListModal = ({isOpen, closeModal}) => {

    const navigate = useNavigate();

    const handelInchat = () => {
        navigate('/chat');
    }

    const [stars, setStars] = useState([
        {id : 1, isFilled : false},
        {id : 2, isFilled : false},
        {id : 3, isFilled : false},
        {id : 4, isFilled : false}
    ]);

    const handleStarClick = (id) => {
        setStars((star) => {
            return star.map((stars) => 
                stars.id === id ? {...stars, isFilled : !stars.isFilled} : stars
                //각 항목의 id와 클릭한 별 아이콘의 id를 비교 만약 두 id가 일치한다면 해당 별의 isFilled 값을 토글하여 변경하고, 일치하지 않는 경우에는 원래의 상태를 그대로 유지
                // 나머지 속성들은 그대로 가져오되, isFilled 속성만 변경
            );
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
                        <tr style={{fontSize: '12px'}}>
                            <th width="150">방 번호</th>
                            <th width="300">채팅방 이름</th>
                            <th width="200">개설자</th>
                            <th width="80"></th>
                        </tr>
                    </thead>
                </table>
                <div id="toggle_body">
                    <table id="ttable">
                        <tbody style={{fontSize: '12px', textAlign: 'center', height: '100%'}}>
                           {stars.map((star) => (
                               <tr key={star.id}>
                                <td width="150" onClick={handelInchat}>{star.id}</td>
                                <td width="300" onClick={handelInchat}>안 고독한 박명수</td>
                                <td width="200" onClick={handelInchat}>말미잘</td>
                                <td width="80">
                                <i className={star.isFilled ? 'bi bi-star-fill' : 'bi bi-star'}
                                    onClick={() => handleStarClick(star.id)}></i>
                                </td>
                            </tr>
                           ))}
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
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <button id="closeBtn" onClick={closeModal}>✖</button>
            </div>
        </Modal>
    );
};
export default MyChstListModal;
