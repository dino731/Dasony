import { useState } from 'react';
import './Board.css';
import BoardHeader from './BoardHeader';
import BoardDailyList from './BoardDailyList';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { nextBoardNoState } from '../atoms';
import BoardWriterCategory from './BoardWriterCategory';
import { boardCateState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import OpenEditor from '../service/OpenEditor';

// import Editor from './Editor';

const BoardDailyWriter = () => {

  // editor에서 값 가져오기
  const [content, setContent] = useState("");
  
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
   // Recoil 상태 가져오기
   const [boardCateStateValue, setBoardCateState] = useRecoilState(boardCateState);

  //  console.log('보드작성 초기화 전 :',boardCateStateValue, boardCateStateValue.name);
  // console.log('보드작성boardCateState:====', boardCateState);
  // console.log('보드작성boardCateStateValue:====.name', boardCateStateValue.name);

  const [newBoardPost, setNewBoardPost] = useState({
    boardNo : nextBoardNo,
    userName : '이아인',
    boardTitle : '',
    boardWriteDate : getCurrentDateTime(),
    boardContent : content,
    boardCateNo :  boardCateStateValue.name
  });

  //input 값을 바뀌고 초기화해줌
  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    let boardNo =newBoardPost.boardNo;
    let boardTitle =newBoardPost.boardTitle;
    let boardContent=newBoardPost.boardContent;
    switch(name){
      case 'boardNo' :   boardNo = value; break;
      case 'boardTitle' : boardTitle = value; break;
      case 'boardContent' : boardContent = value; break;
    }
    setNewBoardPost({[name]:value});
    let test = {
      boardNo : boardNo,
      userName : '이아인',
      boardTitle : boardTitle,
      boardWriteDate : getCurrentDateTime(),
      boardContent : content,
      boardCateNo :  boardCateStateValue.name
    }
    setNewBoardPost(test);
    // console.log('핸들인풋', name, value, '이게 확인할 값:newBoardPost.boardCateNo=======>>',test);
  };


  const handleBoardWriterSubmit = (e)=>{
    e.preventDefault();
    

    if(!newBoardPost.boardTitle||!newBoardPost.boardContent|| !newBoardPost.boardCateNo){
      alert("모든 값을 바르게 입력해주세요.");
      return;
    }
    setBoardPost([...boardPost, newBoardPost]);
    setnextBoardNo(nextBoardNo + 1);
    setNewBoardPost({boardTitle : '',boardContent : '', boardCateNo : '' });
    // setBoardCateState([]);
    // console.log('보드작성 :',boardCateStateValue);
    // console.log(newBoardPost.boardTitle);
    // console.log(newBoardPost.boardContent);
    // console.log(newBoardPost.userName);
    // console.log(newBoardPost.boardWriteDate);
    // console.log(newBoardPost.boardCateNo);
    // console.log('boardCate----->',boardCateStateValue.name);
  }

  /* 태그 입력 시작 */
  const [keyword, setKeyword] = useState([]);
  const [inputContent, setInputContent] = useState('');
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

  /* 태그 입력 끝 */
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
                        placeholder="제목을 입력하세요."
                        />
                      </div>
                    </div>
                    <div className="col-md-2 boardDetail-category-div"></div>
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
                          <input type="text" className="boardList-search-input-tag"  placeholder="태그를 입력해보세요."
                            value={inputContent} onKeyDown={enter} onChange={(e) => setInputContent(e.target.value)}/>
                        </div>{/* boardList-search-box-tag */}
                      </div>{/* boardList-search-input-tag-wrapper */}
                  </div>{/* row */}
                </div> {/* row justify-content-md-center boardDetail-title-container */}    
              </div>{/* boardList-search-title-wrapper */}
              <div>
                <OpenEditor className="ck-editor" editContent={{content, setContent}}/>
                {/* <textarea
                  name="boardContent" 
                  value={newBoardPost.boardContent} 
                  onChange={handleInputChange}
                    /> */}
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