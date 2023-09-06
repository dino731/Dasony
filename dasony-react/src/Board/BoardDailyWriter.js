import { useState,useEffect } from 'react';
import BoardHeader from './BoardHeader';
import BoardDailyList from './BoardDailyList';
import { useRecoilState } from 'recoil';
import { boardPostState } from '../atoms';
import { nextBoardNoState } from '../atoms';
import BoardWriterCategory from './BoardWriterCategory';
import { boardCateState } from '../atoms';
import { useNavigate,useLocation } from 'react-router-dom';
import OpenEditor from '../service/OpenEditor';
import './boardcssTest.css';

// import Editor from './Editor';

const BoardDailyWriter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  /* 현재 경로 비교연산 밑작업용 ain 0904 */
  const dailyPath = path.includes('daily') ? path : null;
  const interestPath = path.includes('interest')? path : null;
  const jmtPath = path.includes('jmt')? path : null;
  const fashionPath = path.includes('fashion')? path : null;


  const pathD = "\/general\/daily\/";
  const pathI = "\/general\/interest\/";
  const pathJ = "\/info\/jmt\/";
  const pathF = "\/info\/fashion\/";
  const pathL = "\/info\/local\/";

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

  /* 이미지 추가 시작 */
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const newImages = [...images];
  const newPreviews = [...previews];

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 이미지 파일 3개로 제한
        if (newImages.length < 3) {
          // 이벤트객체의 파일을 newImages에 담기
          newImages.push(file);
          // 파일리더 객체 생성
          const reader = new FileReader();
          // 파일 읽어온 후 실행되는 콜백함수
          reader.onload = (e) => {
            // 읽어온 값을 갱신하기
            if (e.target && typeof e.target.result === 'string') {
              newPreviews.push(e.target.result);
              setPreviews(newPreviews);
            }
          };
          // 파일 객체를 읽어 base64 형태의 문자열로 변환
          reader.readAsDataURL(file);
        }
      }
      setImages(newImages);
    }
  };

  const handleDeletePreview = (index) => {
    // 현재 상태를 복제합니다.
    const newImages = [...images];
    const newPreviews = [...previews];
  
    // 배열에서 해당 인덱스의 항목을 제거합니다.
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
  
    // 상태를 업데이트합니다.
    setImages(newImages);
    setPreviews(newPreviews);
  };
  /* 이미지 추가 끝 */
  return (
    <>
      <div className='BoardWriteForm-wrapper'>
        <div className="BoardWriteForm-head-title-wrapper">
          <BoardHeader/>
          <div className="BoardWriteForm-container">
            <form onSubmit={handleBoardWriterSubmit}>
              <div className="BoardWriteForm-search-title-wrapper">
                <div className="row justify-content-md-center boardDetail-title-container">
                  <div className='row'>
                    <BoardWriterCategory/>
                    <div className="col-md-9 BoardWriteForm-title-input">
                      <div className="BoardWriteForm-search-box-title">
                        <input 
                        type="text" 
                        name="boardTitle" 
                        value={newBoardPost.boardTitle} 
                        onChange={handleInputChange}
                        className="BoardWriteForm-search-input-title" 
                        placeholder="제목을 입력하세요."
                        />
                      </div>
                    </div>
                    <div className="col-md-2 BoardWriteForm-category-div"></div>
                      <div className="col-md-9 BoardWriteForm-search-input-tag-wrapper">
                        <div  className="BoardWriteForm-search-box-tag" >
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
                          <input type="text" className="BoardWriteForm-search-input-tag"  placeholder="태그를 입력해보세요."
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
              <div className='BoardWriteForm-img-input-wrapper'>
                <label htmlFor="inputFile">
                  <div className='boardWriter-img-select'>사진 선택</div>
                </label>
                <input
                  type="file"
                  id="inputFile"
                  accept="image/*" 
                  multiple
                  className='boardWriter-img-input'
                  onChange={handleImageChange}
                />
              </div>
              <div className='boardWriter-img-show-wrapper'>
                {previews?.map((preview, index) => (
                  <div className='boardWriter-img-show-box' key={index}>
                    <div>

                    </div>
                    <img
                      src={preview}
                      width={200}
                      height={200}
                      alt={`${preview}-${index}`}
                    />
                    <div 
                      className='boardWriter-img-show-iomdclos'
                      onClick={() => handleDeletePreview(index)}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
              <div className='boardWriter-btn board-btn-cntrol-box'>
                <div className='board-btn-wrapper'>
                  <button onClick={()=> navigate('/board'+listPath)} className='board-cancel-btn'>취소 버튼</button>
                </div>
                <div className='board-btn-wrapper'>
                  <button type="submit" className='board-submit-btn'>등록</button>  
                </div>
              </div>
            </form>
            <div style={{height:'10vh'}}>{/* 공백용 디브 */}</div>
          </div>{/* BoardWriteForm-container */}
        </div> {/* BoardWriteForm-head-title-wrapper */}
      </div>{/* BoardWriteForm-wrapper */}
    </>
  );
}


export default BoardDailyWriter;