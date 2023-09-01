import { useState } from 'react';
import './Board.css';
import BoardHeader from './BoardHeader';
import BoardDailyList from './BoardDailyList';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { nextBoardNoState } from '../atoms';
import BoardWriterCategory from './BoardWriterCategory';
import { boardCateState } from '../atoms';

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
  const [boardCateItem, setBoardCateItem] = useState('');
   // Recoil 상태 가져오기
   const [boardCateStateValue, setBoardCateState] = useRecoilState(boardCateState);

   console.log('보드작성 초기화 전 :',boardCateStateValue, boardCateStateValue.name);


  let [newBoardPost, setNewBoardPost] = useState({
    boardNo : nextBoardNo,
    userName : '이아인',
    boardTitle : '',
    boardWriteDate : getCurrentDateTime(),
    boardContent : '',
    boardCateNo :  boardCateState
  });

  //input 값을 바뀌고 초기화해줌
  let handleInputChange = (e) =>{
    let {name,value} = e.target;
    setNewBoardPost({...newBoardPost, [name] : value});
    console.log('핸들인풋', name, value, '이게 확인할 값:=======>>',boardCateStateValue);
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
    setBoardCateState(boardCateStateValue);
    console.log('보드작성 :',boardCateStateValue);
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
                    <BoardWriterCategory/>
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