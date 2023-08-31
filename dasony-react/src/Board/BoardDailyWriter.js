import { useState } from 'react';
import './Board.css';
import BoardHeader from './BoardHeader';
import BoardDailyList from './BoardDailyList';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { nextBoardNoState } from '../atoms';

// import Editor from './Editor';

const BoardDailyWriter = () => {
  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const [boardPost, setBoardPost] = useRecoilState(boardPostState);
  const [nextBoardNo, setnextBoardNo] =useRecoilState(nextBoardNoState);

  // let [boardPost, setBoardPost] = useRecoilState([
  //   {userName : "박지현", boardTitle : "첫번째글", boardWriteDate : "2023-08-29 15:30", 
  //    boardContent : "1 집에 보내주세요...", boardCateNo : "A101"},
  //   {userName : "소유진", boardTitle : "두번째글", boardWriteDate : "2023-08-29 17:30", 
  //    boardContent : "2 집에 보내주세요...", boardCateNo : "A104"},
  //   {userName : "최미선", boardTitle : "세번째글", boardWriteDate : "2023-08-29 18:30", 
  //    boardContent : "3 집에 보내주세요...", boardCateNo : "A101"},
  //   {userName : "최정준", boardTitle : "네번째글", boardWriteDate : "2023-08-29 19:00", 
  //    boardContent : "4 집에 보내주세요...", boardCateNo : "A101"},
  // ]);

    // Category 토글에 사용됨
    let BoardDetailcategory = [
      { name: '일상', value: 'A101' },
      { name: '날씨', value: 'A104' },
    ];
    let [boardCateItem, setBoardCateItem] = useState('');
    let handleBoardDCate = (e) =>{
      console.log(e);
      setBoardCateItem(e.target.value);
      // 선택한 카테고리 객체를 저장한다
    };

  let [newBoardPost, setNewBoardPost] = useState({
    boardNo : nextBoardNo,
    userName : '이아인',
    boardTitle : '',
    boardWriteDate : getCurrentDateTime(),
    boardContent : '',
    boardCateNo : BoardDetailcategory[0].name,
  });

  //input 값을 바뀌고 초기화해줌
  let handleInputChange = (e) =>{
    let {name,value} = e.target;
    setNewBoardPost({...newBoardPost, [name] : value});
  };


  const handleBoardWriterSubmit = (e)=>{
    e.preventDefault();
    console.log(newBoardPost.boardTitle);
    console.log(newBoardPost.boardContent);
    console.log(newBoardPost.boardCateNo);
    console.log(newBoardPost.userName);
    console.log(newBoardPost.boardWriteDate);
    console.log(newBoardPost.boardNo);

    if(!newBoardPost.boardTitle||!newBoardPost.boardContent|| !newBoardPost.boardCateNo){
      alert("모든 값을 바르게 입력해주세요.");
      return;
    }
    setBoardPost([...boardPost, newBoardPost]);
    setnextBoardNo(nextBoardNo + 1);
    setNewBoardPost({boardTitle : '',boardContent : '', boardCateNo : '' });
  }

  return (
    <>
      <div className='BoardWriteForm-wrapper'>
        <div className="BoardWriteForm-head-title-wrapper">
          <BoardHeader/>
          <div className="BoardWriteForm-container">
            <form onSubmit={handleBoardWriterSubmit}>
              <div className="boardList-search-title-wrapper">
                <div className="row justify-content-md-center boardDetail-title-container">
                  <div className='row'>
                    <div className="col-md-2 boardDetail-category-div">
                      <select id="boardDetail-category" onChange={handleBoardDCate} value={boardCateItem}>
                        {BoardDetailcategory.map((boardCateNo) => (
                          <option onClick={(e)=>{setBoardCateItem(e.target.value);}} value={boardCateNo.value} key={boardCateNo.value}>
                            {boardCateNo.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-9 boardDetail-title-input">
                    <div className="boardList-search-box-title">
                      <input 
                      type="text" 
                      name="boardTitle" 
                      value={newBoardPost.boardTitle} 
                      onChange={handleInputChange}
                      className="boardList-search-input-title" 
                      placeholder="제목, 내용을 검색해주세요"
                      />
                    </div>
                    </div>
                  </div>{/* row */}
                </div> {/* row justify-content-md-center boardDetail-title-container */}    
              </div>{/* boardList-search-title-wrapper */}
              <div>
                <textarea
                  name="boardContent" 
                  value={newBoardPost.boardContent} 
                  onChange={handleInputChange}
                    />
              </div> 
              <button type="submit" className='board-submit-btn'>등록</button>  
            </form>
          </div>{/* BoardWriteForm-container */}
        </div> {/* BoardWriteForm-head-title-wrapper */}
      </div>{/* BoardWriteForm-wrapper */}
    </>
  );
}


export default BoardDailyWriter;