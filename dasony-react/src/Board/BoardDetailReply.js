import './Board.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import React, { useState, useRef } from "react";
import './BoardDetail.css';
import '../point/ShopProductDetail.css';
import BoardReComent from './BoardReComent';
const BoardDetailReply = () =>{
  /* 답글 댓글 시작 */


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
  /* 모달 끝 */
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
  /* 신고 모달 끝 */
  
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
        <ul>
        <li>
            <div className='BoardDetail-boardlist-reply'>
              <div className='BoardDetail-boardlist-reply-container'>
                  <div className='BoardDetail-boardlist-reply-userinfo-wrapper'>
                      <span className='BoardDetail-boardlist-title-userinfo-img'>
                        <img src="/resources/board/jh.jpg"/>
                      </span>
                      <span className='BoardDetail-boardlist-reply-userinfo-nikname'>user2</span>
                      <span className='BoardDetail-boardlist-reply-userinfo-date'>2023.08.29</span>
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
                      <sapn>
                          <button>
                          <i class="bi bi-cone-striped"></i>
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
                        </sapn>
                      <span>
                      <button
                          className='BoardDetail-boardlist-meetball-btn'
                          type='button'
                          onClick={handleShow}
                          ><i className="bi bi-three-dots-vertical"></i>
                          </button>
                          <Modal show={show} onHide={handleClose}>
                            <ModalHeader>
                                답글 삭제
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
                        이것은 댓글 댓글이다 잘되고있니?
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
        <div className='BoardDetail-boardlist-reply-form-wrapper'>
          <div className='BoardDetail-boardlist-reply-form-container'>
            <div className='BoardDetail-boardlist-reply-form'>
              <input
                className='BoardDetail-boardlist-reply-form-input'
                type='text'
                placeholder='답글을 등록해보세요'
                />
            </div>
            <div>
              <button
              type='button'
              className='BoardDetail-boardlist-reply-btn board-submit-btn'
              >답글달기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default BoardDetailReply;