import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from "react";
import './BoardDetail.css';
import '../point/ShopProductDetail.css';
import Heart from '../heart';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Vote from './Vote';
import Shorts from './Shorts'
import BoardDetailReply from './BoardDetailReply';
import axios from 'axios';
import BoardHeart from './BoardHeart';



const BoardDetail = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  // console.log('BoardDetail path ===>',path);
  const [replyText, setReplyText] = useState([]);
  localStorage.getItem("loginUserNo") // 유저 번호 

  /* 현재 경로 비교연산 밑작업용 ain 0904 */
  const dailyPath = path.includes('daily') ? path : null;
  const interestPath = path.includes('interest')? path : null;
  const jmtPath = path.includes('jmt')? path : null;
  const fashionPath = path.includes('fashion')? path : null;


  const pathD = "/general/daily/";
  const pathI = "/general/interest/";
  const pathJ = "/info/jmt/";
  const pathF = "/info/fashion/";
  const pathL = "/info/local/";

    /* 경로 이동을 위한 ain 0904 */
  const [listPath, setListPath] = useState([]);
  useEffect(() => {
    if (path == dailyPath) {
      setListPath(pathD);
    } else if (path == interestPath) {
      setListPath(pathI);
    } else if (path == jmtPath) {
      setListPath(pathJ);
    } else if (path == fashionPath) {
      setListPath(pathF);
    } else {
      setListPath(pathL);
    }
  }, []);
  // console.log('목록이동  listPath ==>', listPath);
  
/* 게시글 이동 이전글, 다음글 */
  const [boardPost, setBoardPost] = useRecoilState(boardPostState);
  const { boardNo } = useParams();

  let filteredBoard = boardPost.filter((board) => board.boardNo == boardNo);
  const currentIndex = boardPost.findIndex((board) => board.boardNo === boardNo);
  const prevIndex = (currentIndex - 1 + boardPost.length) % boardPost.length;
  const nextIndex = (currentIndex + 1) % boardPost.length;


  const HandleLBackBtn = (e) => {
    const newPrevPost = boardPost[prevIndex];
    if (newPrevPost) {
      navigate("/board" + listPath + "detail/" + newPrevPost.boardNo);
      console.log('newPrevPost ===>',newPrevPost);
    };
  }
  
  const HandleNextBtn = (e) => {
    const newNextPost = boardPost[nextIndex];
    if (newNextPost) {
      navigate("/board" + listPath + "detail/" + newNextPost.boardNo);
      console.log('newPrevPost ===>',newNextPost);
    }
  };


  const element = useRef(null);

  const onMoveBox = ()=>{
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  /* 모달 관련 시작 */
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
  /* 모달 관련 끝 */
  const[boardData,setBoardData]=useState([]);
  const [newReplyText, setNewReplyText] = useState([]);
  const [isFilled, setIsFilled] = useState(null);
  // console.log('boardDetail listPath ==>',listPath);
   /* axios 시작 */
   useEffect(() => {
    if (listPath.length === 0) {
      // listPath가 비어있을 때는 호출하지 않도록 예외 처리
      return;
    }
    console.log('boardDetail listPath ==>',listPath);

    // Axios를 사용하여 서버로 GET 요청을 보냅니다.
    axios.get(`http://localhost:3000/dasony/board${listPath}detail/${boardNo}`) // 서버의 API 엔드포인트에 맞게 수정
      .then((response) => {
        console.log('요청 주소:', response.config.url); // 요청 주소 확인
        console.log('BoardList 응답 데이터:', response.data);
        setBoardData(response.data);
        // setReplyText(response.data.replyList);
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
      });

     axios.get(`http://localhost:3000/dasony/board/serchHeart?boardNo=${boardNo}&userNo=${localStorage.loginUserNo}`)
    .then(response => {
      const result = response.data;
      console.log('result',result);
      setIsFilled(result);

    })
    .catch(error => {
      console.error('좋아요 정보를 가져오는 중 오류 발생:', error);
    });


  }, [listPath, boardNo,isFilled]); // 빈 배열을 두번째 인자로 전달하면 컴포넌트가 마운트될 때 한 번만 실행
  // console.log('게시판리스트 boardData ===>',boardData);
  // console.log('게시판 디테일 받아온 replyText ====>',replyText);
  /* axios 끝 */
  
  return (
      <>
        <div ref={element} className='BoardDetail-wrapper'>
          {
            boardData.map((board)=>(
              <div key={board.boardNo} className='BoardDetail-side-wrapper'>   
                <div className='BoardDetail-main-wrapper'>
                  <div className="BoardDetail-head-list">
                      <span className="BoardDetail-head-list-text">일반 게시판</span>
                      <span className='BoardDetail-head-btn-wrapper'>
                        <button
                          type="button" 
                          className="BoardDetail-boardlist-list-btn board-submit-btn"
                          onClick={()=>navigate("/board"+listPath)}
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
                    <div className='BoardDetail-boardlist-title-flexdiv'>
                      <div className='BoardDetail-boardlist-title-container'>
                        <span className='BoardDetail-boardlist-title-keyword'>{board.boardCateNo}</span>
                        <span className='BoardDetail-boardlist-title'>{board.boardTitle}</span>
                      </div>
                      <div className='BoardDetail-boardlist-userInterface'>
                        <span>
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
                        <span>
                          <button
                          className='Board-reply-recoment-accused-btn'
                          onClick={()=>navigate('/board'+listPath+'edit/'+board.boardNo+'/'+board?.boardCate.boardCateNo)}
                          >
                            수정
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className='BoardDetail-boardlist-title-userinfo-container'>
                      <div className='BoardDetail-boardlist-title-userinfo'>
                        <span className='BoardDetail-boardlist-title-userinfo-img'><img src="/resources/board/jh.jpg"/></span>
                        <span className='BoardDetail-boardlist-title-userinfo-nikname'>{board?.user.userNick}</span>
                        <span className='BoardDetail-boardlist-title-userinfo-date'>{board.boardWriteDate}</span>
                      </div>
                      <div className='BoardDetail-boardlist-title-views-wrapper'>
                        <span className='BoardDetail-boardlist-title-views'>조회{board.boardViews}</span>
                        <span className='BoardDetail-boardlist-title-views'>추천{board.userViewCount}</span>
                        <span className='BoardDetail-boardlist-title-views'>답글{board.replyCount}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                  {board.bimgList.map(image => (
                    <div className='BoardDetail-userImg-views-container'>
                   
                        <div className='BoardDetail-userImg-views-li' key={image.boardImgLevel}>
                          {image.boardImgModName
                            ?(<img
                            src={`http://localhost:8083/dasony${image.boardImgPath}${image.boardImgModName}`}
                            alt={`썸네일 ${image.boardImgLevel}`}
                            className="board-img"/>) 
                            : ('')}
                        </div>
                     
                    </div>
                     ))}
                  </div>
                  <div className='BoardDetail-boardlist-content-wrapper'>
                    {(board.boardCate.boardCateNo!=1103?
                    (<div className='BoardDetail-boardlist-content'
                    dangerouslySetInnerHTML={{ __html: board.boardContent }}
                    >
                    </div>)
                    :(
                      <>
                      <br/>
                      <div className='vote-content-box'>
                        <div>{board.boardVs.boardOptionLeft}</div>
                        <div style={{textAlign:'center'}}>vs</div>
                        <div>{board.boardVs.boardOptionRight}</div>
                      </div>
                      <div className='vote-content-txt'>{board.boardVs.boardContent}</div>
                      <br/>
                      </>))}

                  </div>
                <BoardDetailReply editContent={{newReplyText, setNewReplyText}} boardData={boardData} listPath={listPath}/>
                </div>
                <div className='BoardDetail-side-container'>
                  <div className='BoardDetail-side-by-side'>
                    <div className='BoardDetail-side-haert'><BoardHeart boardNo={boardNo} isFilled={isFilled} setIsFilled={setIsFilled}/></div>
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