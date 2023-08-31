import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import React, { useState, useRef } from "react";
import './BoardDetail.css';
import '../point/ShopProductDetail.css';
import Heart from '../heart';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { useParams } from 'react-router-dom';


const BoardDetail = () =>{
  const [boardPost, setBoardPost] = useRecoilState(boardPostState);

  const {boardNo} = useParams();

  let filteredBoard = boardPost.filter(board => board.boardNo == boardNo);
  

  const HandleListBtn=()=>{

  };
  const HandleLBackBtn=()=>{

  };
  const HandleNextBtn=()=>{

  };

  const element = useRef(null);

  const onMoveBox = ()=>{
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState(`상품 이름을 5000포인트로 구매하시겠습니까?


                                              *구매 이후 환불은 불가능합니다.*`);
  const [modalButton, setModalButton] = useState('inline-block');
  const [modalButtonText, setModalButtonText] = useState('취소');

  const handleClose = () => setShow(false);
  const handleShow = () => {
      handleModalOff();
      setShow(true);
  }
  const handleModalOn = ()=>{
                                  setModalText(`구매가 정상적으로 완료되었습니다.`);
                                  setModalButton('none');
                                  setModalButtonText('확인');
                              }
  const handleModalOff = ()=>{
                                  setModalText(<div textalign='center'>상품 이름을<br/>5000포인트로 구매하시겠습니까?<br/><br/>
                                                  *구매 이후 환불은 불가능합니다.*</div>);
                                  setModalButton('inline-block');
                                  setModalButtonText('취소');
                              }
  const handleModalOffAndClose = () => {
      if(modalButtonText == '확인' && modalButton == 'inline-block' && show){
          handleModalOff();
      }
      handleClose();
  }
  return (
      <>
        <div ref={element} className='BoardDetail-wrapper'>
          {
            filteredBoard.map((board)=>(
              <div className='BoardDetail-side-wrapper'>   
                <div className='BoardDetail-main-wrapper'>
                  <div className="BoardDetail-head-list">
                      <span className="BoardDetail-head-list-text">일반 게시판</span>
                      <span className='BoardDetail-head-btn-wrapper'>
                        <button
                          type="button" 
                          className="BoardDetail-boardlist-list-btn board-submit-btn"
                          onClick={HandleListBtn}
                        >목록</button>
                        <button
                          type="button" 
                          className="BoardDetail-boardlist-back-btn board-submit-btn"
                          onClick={HandleLBackBtn}
                        >이전글</button>
                        <button
                          type="button" 
                          className="BoardDetail-boardlist-next-btn board-submit-btn"
                          onClick={HandleNextBtn}
                        >다음글</button>
                      </span>
                  </div>
    
                  <div className='BoardDetail-boardlist-title-wrapper'>
                    <div className='BoardDetail-boardlist-title-container'>
                      <span className='BoardDetail-boardlist-title-keyword'>{board.boardCateNo}</span>
                      <span className='BoardDetail-boardlist-title'>{board.boardTitle}</span>
                    </div>
                    <div className='BoardDetail-boardlist-title-userinfo-container'>
                      <div className='BoardDetail-boardlist-title-userinfo'>
                        <span className='BoardDetail-boardlist-title-userinfo-img'><img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg"/></span>
                        <span className='BoardDetail-boardlist-title-userinfo-nikname'>{board.userName}</span>
                        <span className='BoardDetail-boardlist-title-userinfo-date'>{board.boardWriteDate}</span>
                      </div>
                      <div className='BoardDetail-boardlist-title-views-wrapper'>
                        <span className='BoardDetail-boardlist-title-views'>조회 102</span>
                        <span className='BoardDetail-boardlist-title-views'>추천 1</span>
                        <span className='BoardDetail-boardlist-title-views'>댓글 1</span>
                      </div>
                    </div>
                  </div>
                  <div className='BoardDetail-boardlist-content-wrapper'>
                    <div className='BoardDetail-boardlist-content'>
                    {board.boardContent}
                    </div>
                  </div>
                  <div className='BoardDetail-boardlist-reply-wrapper'>
                    <ul>
                    <li>
                        <div className='BoardDetail-boardlist-reply'>
                          <div className='BoardDetail-boardlist-reply-container'>
                              <div className='BoardDetail-boardlist-reply-userinfo-wrapper'>
                                  <span className='BoardDetail-boardlist-title-userinfo-img'>
                                    <img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg"/>
                                  </span>
                                  <span className='BoardDetail-boardlist-reply-userinfo-nikname'>user2</span>
                                  <span className='BoardDetail-boardlist-reply-userinfo-date'>2023.08.29</span>
                              </div>
                              <div className='BoardDetail-boardlist-reply-control-wrapper'>
                                  <span className='BoardDetail-boardlist-reply-btn'>
                                    <button
                                      type='button'
                                      ><i className="bi bi-chat-text"></i>
                                        리댓달기
                                      </button>
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
                                            상품 구매
                                        </ModalHeader>
                                        <ModalBody>
                                            <div style={{textAlign:'center'}}>
                                            {modalText}
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={handleModalOffAndClose}>{modalButtonText}</Button>
                                            <Button onClick={handleModalOn} style={{display:modalButton}}>구매</Button>
                                        </ModalFooter>
                                      </Modal>
                                  </span>
                              </div>
                            </div>
                            <div className='BoardDetail-boardlist-reply-content-wrapper' >
                              <div className='BoardDetail-boardlist-reply-content'>
                                  이것은 댓글 댓글이다 잘되고있니?
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
                </div>
                <div className='BoardDetail-side-container'>
                  <div className='BoardDetail-side-by-side'>
                    <div className='BoardDetail-side-haert'><Heart/></div>
                    <div className="">
                      <button
                      onClick={onMoveBox}
                      className='BoardDetail-side-up'
                    >
                      <i className="bi bi-arrow-up-square"></i></button></div>
                  </div>
                </div>
              </div> 
            ) )
          }
          
        </div>
      </>
  )
}
export default BoardDetail;