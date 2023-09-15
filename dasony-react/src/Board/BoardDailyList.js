import {Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Board.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { boardCateState, boardPostState } from '../atoms';
import BoardListHeader from './BoardListHeader';
import {BoardDetailcategoryState, BoardVotecategoryState, BoardShortscategoryState, BoardInterestCategoryState, 
  BoardJMTCategoryState, BoardFashionCategoryState, BoardLocalCategoryState } from '../atoms';
import axios from 'axios';

const BoardDailyList = ()=>{

  const[boardData,setBoardData]=useState([]);
  /* axios 시작 */
  useEffect(() => {
    // Axios를 사용하여 서버로 GET 요청을 보냅니다.
    axios.get(`http://localhost:3000/dasony${path}?userRegion=${localStorage.loginUserRegion}`) // 서버의 API 엔드포인트에 맞게 수정
      .then((response) => {
        console.log('BoardList 응답 데이터:', response.data);
        setBoardData(response.data);
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
      });
  }, []); // 빈 배열을 두번째 인자로 전달하면 컴포넌트가 마운트될 때 한 번만 실행
  console.log('게시판리스트 boardData ===>',boardData);
  /* axios 끝 */

  /* 보드 카테고리 atom관련 시작  ain 0904*/
  // const [boardPost, setBoardPost] = useRecoilState(boardPostState);
  const boardInterestCategory = useRecoilValue(BoardInterestCategoryState);
  const boardJMTCategory = useRecoilValue(BoardJMTCategoryState);
  const boardFashionCategory = useRecoilValue(BoardFashionCategoryState);
  const boardLocalCategory = useRecoilValue(BoardLocalCategoryState);
  /* 보드 카테고리 atom관련 끝  */

  /* 현재 경로와 비교하기 위함 ain 0904*/
  const location = useLocation();
  const path = location.pathname;
  // console.log('보드리스트 path :',path);
  localStorage.getItem("loginUserNo") // 유저 번호
  localStorage.getItem("loginUserRegion") // 유저 지역
  

  /* atom과 구조가 달라서 daily 카테고리 전용 따로 뽑음  ain 0904*/
  const [listDailyCategory, setListDailyCategory] = useState([
      { name: '일상', value: '1101' },
      { name: '날씨', value: '1104' },
      { name: '투표', value: '1103' },
      { name: '쇼츠', value: '1102' },
  ]);

  /* 현재 경로 비교연산 밑작업용 ain 0904 */
  const listDailyOptions = path.includes('daily') ? path : null;
  const listInterestOptions = path.includes('interest')? path : null;
  const listJmtOptions = path.includes('jmt')? path : null;
  const listFashionOptions = path.includes('fashion')? path : null;
  // console.log('보드리스트 listDailyOptions :',listDailyOptions);

  /* 경로 이동을 위한 ain 0904 */
  const [listPath, setListPath] = useState([]);
  const pathD = "/general/daily/";
  const pathI = "/general/interest/";
  const pathJ = "/info/jmt/";
  const pathF = "/info/fashion/";
  const pathL = "/info/local/";

  /* listBoardCate 현재 경로에 맞는 카테고리 들어감 ain 0904 */
 const [listBoardCate, setListBoardCate] = useState([]);
//  console.log('listBoardCate----->',listBoardCate);
 useEffect(() => {
  if (path == listDailyOptions) {
   setListBoardCate(listDailyCategory);
   setListPath(pathD);
  } else if (path == listInterestOptions) {
   setListBoardCate(boardInterestCategory);
   setListPath(pathI);
  } else if (path == listJmtOptions) {
   setListBoardCate(boardJMTCategory);
   setListPath(pathJ);
  } else if (path == listFashionOptions) {
   setListBoardCate(boardFashionCategory);
   setListPath(pathF);
  } else {
   setListBoardCate(boardLocalCategory);
   setListPath(pathL);
  }
}, []);
  // console.log('게시판리스트 listBoardCate ===>',listBoardCate);

  /* 키워드 검색시 사용하는 state. ain 0904 */
  const [keyword, setKeyword] = useState([]);
  const [inputContent, setInputContent] = useState('');

  /* 키워드 리셋 핸들러 ain 0904 */
  const handleReset = () => {
    setKeyword([]);
  };

  /* 키워드 enter사용시 키워드 생성 ain 0904 */
  const enter = (e) =>{
    if(e.key == 'Enter'){
      e.preventDefault();
      if(keyword.includes(inputContent) || inputContent.trim() === '' ){
        console.log('enter key 눌림 : ', inputContent );
        return;
      }
      setKeyword([...keyword, inputContent]);
      setInputContent('');
    }
  };

  /* 키워드 엑스 버튼 이벤트 삭제됨 ain 0904*/
  const deleteKeyWord = (index)=>{
    setKeyword(keyword.filter((item, i) => item !== keyword[index]));
    setInputContent('');
  }
  // console.log('BoardDailyList : 'boardPost.boardCateNo, boardCateStateValue.name);

  const handleLinkClick = (e) =>{
    const boardNo = e;
    console.log('조회수 구하기 위한 boardNo 확인 ===>',boardNo);

    axios.get(`http://localhost:3000/dasony/board/boardViewsCount?boardNo=${boardNo}`)
    .then((res)=>{
      console.log('Axios 요청 성공:', res.data);
    })
    .catch((error)=>{
      console.log('Axios 요청 오류',error);
    })
  };

  return(
    <>
      <div className="BoardList-head-title-wrapper">
        <BoardListHeader path={path}/>
        </div>

        <div className="boardList-container">
          <div className="row justify-content-md-center boardList-search-title-wrapper">
            <form action="" method="GET">
              <div className="row">
                <div className="col-md-9 boardList-search-input-title-wrapper">
                  <div className="boardList-search-box-title">
                    <input type="text" className="boardList-search-input-title" placeholder="제목, 내용을 검색해보세요"/>
                      <div className="boardList-search-input-title-img-div">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        {/* <i className="bi bi-search boardList-search-input-title-imgcon"></i> */}
                        {/* <img className="boardList-search-input-title-imgcon" src="/resources/img/돋보기아이콘.png"/> */}
                      </div>
                  </div>
                </div>
                <div className="col-3 col-md-3">
                  <button type="submit" className="boardList-search-btn">검색</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9 boardList-search-input-tag-wrapper">
                  <div  className="boardList-search-box-tag" >
                  <ul className="searchKeyword-ul">
                    {
                      keyword.map( (item, index) => (
                        <li className="sKeyword" key={index}>
                          {item}
                          <p
                          onClick={() => {deleteKeyWord(index)}} className="boardSearchClose">x</p>
                      
                        </li>
                      ))}
                  </ul>
                  <input 
                        type="text" 
                        className="boardList-search-input-tag" 
                        placeholder="태그로 검색해보세요"
                        value={inputContent}
                        onKeyDown={enter}
                        onChange={(e) => setInputContent(e.target.value)}
                        />
                      
                  </div>

                  <div className="boardList-search-input-tag-img-div">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                    {/* <i className="bi bi-tag-fill boardList-search-input-tag-icon"></i> */}
                    {/* <img className="boardList-search-input-tag-icon" src="/resources/img/태그아이콘.png"/>
                    <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="꼬리표 아이콘">꼬리표 아이콘  제작자: Dave Gandy - Flaticon</a> */}
                  </div >
                </div>
                <div className="col-1 col-md-1">
                  <button type="button" className="boardList-search-reset-btn" onClick={handleReset}>
                    <img src="/resources/board/ricon.png" className="boardList-search-reset-btn-icon" />
                      <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="주기 아이콘">주기 아이콘  제작자: redempticon - Flaticon</a>
                  </button>
                  
                </div>
              </div>
            </form>
          </div>
        <div className="boardList-list-wrapper">
          {
            //  {boardData.map((boardItem) => (
            //   <li key={boardItem.id}>
            //     <Link to={`/board/${boardItem.id}`}>{boardItem.title}</Link>
            //   </li>
            boardData.length > 0 && listBoardCate.length > 0 && boardData.filter((board) => {
              return listBoardCate.some((category) => category.name === board?.boardCate.boardSmallCate);})
            .map( (board, index)=>( 
            <ul key={index} className="boardList-list-ul-wrapper">        
              <li className="boardList-list-li">
                <div className="boardList-list-wrapper">
                  <div className="boardList-list-container">
                        <Link to={'/board'+listPath+'detail/'+board.boardNo} onClick={()=>handleLinkClick(board.boardNo)} style={{textDecoration:'none'}}>
                          <div className="boardList-list-content-container">
                              <div className="boardList-list-keyword">{board.boardCate.boardSmallCate}</div>
                              <div className="boardList-list-content-title">{board.boardTitle}</div>
                              <div className="boardList-list-content"dangerouslySetInnerHTML={{ __html: board.boardContent }}></div>
                              <div className="boardList-list-content-info"><span>{board.user.userNick}</span><span>{board.boardWriteDate}</span></div>          
                              <div className="boardList-list-content-action">
                                <span><img src="/resources/board/eicon.png"/>{board.boardViews} <span style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/-" title="비밀번호 표시 아이콘">비밀번호 표시 아이콘  제작자: exomoon design studio - Flaticon</span></span>
                                <span><img src="/resources/board/hicon.png"/>{board.userViewCount} <span style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Noplubery - Flaticon</span></span>
                                <span><img src="/resources/board/ticon.png"/>{board.replyCount} <span style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="대화 아이콘">대화 아이콘  제작자: exomoon design studio - Flaticon</span></span></div>
                          </div>
                        </Link>
                      <div className="boardList-list-img">
                        <img src={"http://localhost:8083/dasony"+board.boardImg.boardImgPath+board.boardImg.boardImgModName} alt="썸네일" className="board-img"/>
                      </div>
                  </div>
                </div>
              </li>
           </ul>
            ))
             
          }
          <ul>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </>
  );

}

export default BoardDailyList;
