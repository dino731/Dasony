import {Link} from 'react-router-dom';
import { useState } from 'react';
import './Board.css';


const BoardDailyList = ()=>{
  const [keyword, setKeyword] = useState([]);
  const [inputContent, setInputContent] = useState('');

  const handleReset = () => {
    setKeyword([]);
  };

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
  }

  const deleteKeyWord = (index)=>{
    setKeyword(keyword.filter((item, i) => item !== keyword[index]));
    setInputContent('');
  }

  return(
    <>
      <div className="BoardList-head-title-wrapper">
        <div className="row justify-content-md-center BoardList-head-title">
          <div className="col-md-9 BoardList-head-title-text">일상 게시판</div>
            <div className="col-3 col-md-3">
              <Link to="/board/writer/dwriter" style={{textDecoration:'none'}}>
                <button className="board-li BoardList-head-title-btn" id="dwriter"                                       
                        // onClick={(event)=>{HandleOpacity(event.target.id);}}
                >글쓰기</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="boardList-container">
          <div className="row justify-content-md-center boardList-search-title-wrapper">
            <form action="" method="GET">
              <div className="row">
                <div className="col-md-9 boardList-search-input-title-wrapper">
                  <div className="boardList-search-box-title">
                    <input type="text" className="boardList-search-input-title" placeholder="제목, 내용을 검색해보세요"/>
                      <div className="boardList-search-input-title-img-div">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
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
                    <img src="/resources/common-img/boardImg/초기화아이콘.png" className="boardList-search-reset-btn-icon" />
                      <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="주기 아이콘">주기 아이콘  제작자: redempticon - Flaticon</a>
                  </button>
                </div>
              </div>
            </form>
          </div>
        <div className="boardList-list-wrapper">
          <ul className="boardList-list-ul-wrapper">
            <li className="boardList-list-li">
              <div className="boardList-list-wrapper">
                <div className="boardList-list-container">
                    <Link to='/board/general/daily/detail' style={{textDecoration:'none'}}>
                      <div className="boardList-list-content-container">
                          <div className="boardList-list-keyword">날씨</div>
                          <div className="boardList-list-content-title">유기동물 봉사자 찾아요</div>
                          <div className="boardList-list-content">반달이네 유기동물 센터에서 함께 봉사하실 용자를 찾아요. 파티원 모집합니다 지현, 유진, 미선, 정준, 아인 원하시면 당근을 흔들어주세요~ (원양어선 아님)</div>
                          <div className="boardList-list-content-info"><span>박지현</span><span>2023.08.22</span><span>11:50</span></div>
                          <div className="boardList-list-content-action">
                            <span><img src="/resources/common-img/boardImg/비밀번호표시아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/-" title="비밀번호 표시 아이콘">비밀번호 표시 아이콘  제작자: exomoon design studio - Flaticon</a></span>
                            <span><img src="/resources/common-img/boardImg/빈하트.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Noplubery - Flaticon</a></span>
                            <span><img src="/resources/common-img/boardImg/대화아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="대화 아이콘">대화 아이콘  제작자: exomoon design studio - Flaticon</a></span></div>
                      </div>
                    </Link>
                    <div className="boardList-list-img">
                      <img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg" alt="썸네일" className="board-img"/>
                    </div>
                </div>
              </div>
            </li>
            <li className="boardList-list-li">
              <div className="boardList-list-wrapper">
                <div className="boardList-list-container">
                    <div className="boardList-list-content-container">
                        <div className="boardList-list-keyword">날씨</div>
                        <div className="boardList-list-content-title">유기동물 봉사자 찾아요</div>
                        <div className="boardList-list-content">반달이네 유기동물 센터에서 함께 봉사하실 용자를 찾아요. 파티원 모집합니다 지현, 유진, 미선, 정준, 아인 원하시면 당근을 흔들어주세요~ (원양어선 아님)</div>
                        <div className="boardList-list-content-info"><span>박지현</span><span>2023.08.22</span><span>11:50</span></div>
                        <div className="boardList-list-content-action">
                          <span><img src="/resources/common-img/boardImg/비밀번호표시아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/-" title="비밀번호 표시 아이콘">비밀번호 표시 아이콘  제작자: exomoon design studio - Flaticon</a></span>
                          <span><img src="/resources/common-img/boardImg/빈하트.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Noplubery - Flaticon</a></span>
                          <span><img src="/resources/common-img/boardImg/대화아이콘.png"/>1 <a style={{ display: 'none' }} href="https://www.flaticon.com/kr/free-icons/" title="대화 아이콘">대화 아이콘  제작자: exomoon design studio - Flaticon</a></span></div>
                    </div>
                    <div className="boardList-list-img">
                      <img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg" alt="썸네일" className="board-img"/>
                    </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );

}

export default BoardDailyList;