import './Board.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from "react";
import './BoardDetail.css';
import '../point/ShopProductDetail.css';
import BoardReComent from './BoardReComent';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BoardDetailReply = (props) =>{
  /* 답글 댓글 시작 */
  const {listPath,boardData} = props; // BoardDetail에서 가져온 경로, board Detail 데이터
  const { boardNo } = useParams();
  // const {replyText, setReplyText} = props;
  console.log('답글에 넘어온 boardData ===>',boardData)

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /* 답글 시작 */
  const [newReplyText, setNewReplyText] = useState({
    boardNo : boardNo,
    userNo : localStorage.loginUserNo,
    replyContent : '',
    replyWriteDate : getCurrentDateTime(),
});


  const handleMainReplyChange = (e) =>{
    const {name, value} = e.target;

    const ReplyChange = {
      boardNo : boardNo,
      userNo : localStorage.loginUserNo,
      replyWriteDate : getCurrentDateTime(),
          [name]: value
    };
    setNewReplyText(ReplyChange);
  };
  console.log('newReplyText',newReplyText);

  /* 답글 끝 */
  /* 답글 axios 전송 시작 */

  const handleSubmitReply =(e)=>{
    e.preventDefault(); 

    if(!newReplyText.boardNo || !newReplyText.userNo || !newReplyText.replyContent || !newReplyText.replyWriteDate ){
      alert("모든 값을 바르게 입력해주세요.");
      return;
    }

    const formData = new FormData();
    let replyData = {
      boardNo : newReplyText.boardNo,
      userNo : newReplyText.userNo,
      replyContent : newReplyText.replyContent,
      replyWriteDate : newReplyText.replyWriteDate,
    };

    Object.entries(replyData).forEach((item) => {
      formData.append(item[0], item[1]);
    });

    // FormData의 key 확인
    for (let key of formData.keys()) {
      console.log('FormData의 key 확인', key);
    }
    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(' FormData의 value 확인', value);
    }

    axios.post(`http://localhost:3000/dasony/board/reply`,formData,{
    }).then((response)=>{
      console.log('답글 등록 응답확인 ==>',response.data);
    }).catch((error)=>{
      console.error('업로드 실패', error);
      alert("업로드에 실패하였습니다.");
    });


  }
  /* 답글 axios 전송 끝 */


   /* 모달 시작 */
   const [show, setShow] = useState(false);
   const [modalText, setModalText] = useState(`답글을 삭제하시겠습니까?`);
   const [modalButton, setModalButton] = useState('inline-block');
   const [modalButtonText, setModalButtonText] = useState('취소');
 
   const handleClose = () => setShow(false);
   const handleShow = () => {
       handleModalOff();
       setShow(true);
   }
   const handleModalOn = ()=>{

    // axios.delete('/replyDelete')
        setModalText(`정상적으로 삭제되었습니다.`);
        setModalButton('none');
        setModalButtonText('확인');
    }
   const handleModalOff = ()=>{
        setModalText(<div textalign='center'>답글을 삭제하시겠습니까?<br/><br/></div>);
        setModalButton('inline-block');
        setModalButtonText('취소');
    }
   const handleModalOffAndClose = () => {
       if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
           handleModalOff();
       }
       handleClose();
   }
  /* 신고 모달 ain 0905 */
  const [accusedShow, setAccusedShow] = useState(false);
  const [acuusedText, setAccusedText] = useState(`답글을 삭제하시겠습니까?`);

  const handleAccusedClose = () => setAccusedShow(false);
  const handleAccusedShow = () => {
    handleAccusedModalOff();
      setAccusedShow(true);
  }
  const handleAccusedModalOn = ()=>{
                                  setAccusedText(`정상적으로 신고되었습니다.`);
                                  setModalButton('none');
                                  setModalButtonText('확인');
                              }
  const handleAccusedModalOff = ()=>{
                                  setAccusedText(<div textalign='center'>신고 하시겠습니까?<br/><br/></div>)
                                  setModalButton('inline-block');
                                  setModalButtonText('취소');
                              }
                                // <Button onClick={handleModalOffAndClose} style={{display:modalButton}}>삭제</Button>
  const handleAccusedModalOffAndClose = () => {
      if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
        handleAccusedModalOff();
      }
      handleAccusedClose(true);
  }
  /* 모달 끝 */
  
  const [isReplyContainerVisible, setIsReplyContainerVisible] = useState(false);
  const handleReplyShow = ()=>{
    // document.querySelector('.replycoment-form-container').style.display='block';
    setIsReplyContainerVisible(true);
  };
  
  const handleReplyClose = ()=>{
    // document.querySelector('.replycoment-form-container').style.display='none';
    setReplycontent('');
    setIsReplyContainerVisible(false);
  }

  /* 답글 댓글 끝 */

  /* 리댓 답답글 시작 */
  /* 답답글 input change 이벤트 */
  const [replycontent,setReplycontent] = useState('');
  const handleReplyChange = (e) => {
    setReplycontent(e.target.value);
  }

    /* 리댓 답답글 시작 */

  return(
    <>
        <div className='BoardDetail-boardlist-reply-wrapper'>

      {boardData[0]?.replyList && boardData[0]?.replyList?.map((reply, replyIndex) => (
        <ul key={replyIndex}>
        <li>
            <div className='BoardDetail-boardlist-reply'>
              <div className='BoardDetail-boardlist-reply-container'>
                  <div className='BoardDetail-boardlist-reply-userinfo-wrapper'>
                      <span className='BoardDetail-boardlist-title-userinfo-img'>
                        <img src="/resources/board/jh.jpg"/>
                      </span>
                    <span className='BoardDetail-boardlist-reply-userinfo-nikname'>{reply.ruserNick}</span>
                      <span className='BoardDetail-boardlist-reply-userinfo-date'>{reply.replyWriteDate}</span>
                  </div>
                  <div className='BoardDetail-boardlist-reply-control-wrapper'>
                      <span className='BoardDetail-boardlist-reply-btn'>
                        <button
                          type='button'
                          onClick={handleReplyShow}
                          ><i className="bi bi-chat-text"></i>
                          리댓달기
                          </button>
                      </span>
                      <span className='Board-reply-recoment-accused-span'>
                        <button className='Board-reply-recoment-accused-btn'
                        onClick={handleAccusedShow}
                        ><i className="bi bi-cone-striped"></i>
                        </button>
                        <Modal show={accusedShow} onHide={handleAccusedClose}>
                          <ModalHeader>
                              유저 신고
                          </ModalHeader>
                          <ModalBody>
                              <div style={{textAlign:'center'}}>
                              {acuusedText}
                              </div>
                          </ModalBody>
                          <ModalFooter>
                              <Button onClick={handleAccusedModalOffAndClose}>{modalButtonText}</Button>
                              <Button onClick={handleAccusedModalOn} style={{display:modalButton}}>신고</Button>
                          </ModalFooter>
                        </Modal>
                      </span>
                      <span>
                      <button
                            className='BoardDetail-boardlist-meetball-btn'
                            type='button'
                            onClick={handleShow}
                            ><i className="bi bi-three-dots-vertical"></i>
                        </button>
                          <Modal show={show} onHide={handleClose}>
                            <ModalHeader>
                                댓글 삭제
                            </ModalHeader>
                            <ModalBody>
                                <div style={{textAlign:'center'}}>
                                {modalText}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleModalOffAndClose}>{modalButtonText}</Button>
                                <Button onClick={handleModalOn} style={{display:modalButton}}>삭제</Button>
                            </ModalFooter>
                          </Modal>
                      </span>
                  </div>
                </div>
                <div className='BoardDetail-boardlist-reply-content-wrapper' >
                  <div className='BoardDetail-boardlist-reply-content'>
                    {reply.replyContent}
                  </div>
                  <div className='replycoment-form-container' style={{ display: isReplyContainerVisible ? 'block' : 'none' }}>
                    <span className='replycoment-form'>
                      <input
                        className='replycoment-input'
                        type='text'
                        onChange={handleReplyChange}
                        onBlur={handleReplyClose}
                        placeholder='답글에 답글을 등록해보세요'
                        value={replycontent}
                        />
                    </span>
                    <span>
                      <button
                      type='button'
                      className='BoardDetail-boardlist-reply-btn board-submit-btn'
                      onClick={() => {
                        handleReplyClose();
                      }}
                      >답글달기</button>
                    </span>
                  </div>

                  <div className='BoardDetail-boardList-reply-recoment-wrapper'>
                    <BoardReComent/>
                  </div>
                </div>
            </div> 
          </li>
        </ul>
      ))}
        <div className='BoardDetail-boardlist-reply-form-wrapper'>
          <div className='BoardDetail-boardlist-reply-form-container'>
            <div className='BoardDetail-boardlist-reply-form'>
              <input
                className='BoardDetail-boardlist-reply-form-input'
                type='text'
                name='replyContent'
                value={newReplyText.replyContent}
                onChange={handleMainReplyChange}
                placeholder='답글을 등록해보세요'
                />
            </div>
            <div>
              <button
              type='button'
              className='BoardDetail-boardlist-reply-btn board-submit-btn'
              onClick={handleSubmitReply}
              >답글달기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default BoardDetailReply;