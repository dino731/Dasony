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
import axios from 'axios';

// import Editor from './Editor';

const BoardDailyWriter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log('boardDailyWriter, path ===>', path);
  localStorage.getItem("loginUserNo") // 유저 번호
  localStorage.getItem("loginUserRegion") // 유저 지역

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
  console.log('목록이동  listPath ==>', listPath);

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
   // Recoil 상태 가져오기
   const [boardCateStateValue, setBoardCateState] = useRecoilState(boardCateState);

  //  console.log('보드작성 초기화 전 :',boardCateStateValue, boardCateStateValue.name);
  // console.log('보드작성boardCateState:====', boardCateState);
  // console.log('보드작성boardCateStateValue:====.name', boardCateStateValue.name);
  console.log('BoardDailyWriter boardPost ===>',boardPost);

  const [newBoardPost, setNewBoardPost] = useState({
    // userName : '이아인',
    userRegion : '',
    userNo : '',
    boardTitle : '',
    boardWriteDate : getCurrentDateTime(),
    boardContent : content,
    boardCateNo :  boardCateStateValue.value,
    boardTag : '',

  });

  /* 태그 입력 시작 */
  const [boardTagArr, setBoardTagArr] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const enter = (e) =>{
    if(e.key == 'Enter'){
      e.preventDefault();
      if(boardTagArr.includes(inputContent) || inputContent.trim() === '' ){
        console.log('enter key 눌림 : ', inputContent );
        return;
      }
      setBoardTagArr([...boardTagArr, inputContent]);
      setInputContent('');
    }
  }
  const deleteKeyWord = (index)=>{
    setBoardTagArr(boardTagArr.filter((item, i) => item !== boardTagArr[index]));
    setInputContent('');
  }
  console.log('BoardDailyWriter boardTag ===>',boardTagArr);
  /* 태그 입력 끝 */

  const handleInputChange  = (e) =>{
    const {name, value} = e.target;
    let upTagArr = [...boardTagArr, value];
    const updatedNewBoardPost = {
      ...newBoardPost,
      userRegion: localStorage.loginUserRegion,
      userNo: localStorage.loginUserNo,
      boardCateNo: boardCateStateValue.value,
      boardTag: upTagArr.join('_'),
      boardContent : content,
      [name]: value
    };
    setNewBoardPost(updatedNewBoardPost);
  }

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [showImages, setShowImages] = useState([]);
  // input 값을 바뀌고 초기화해줌
  const handleImgChange = (e) => {
    const { name, value } = e.target;
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setShowImages(imageUrlLists);
    

    // 이미지 파일을 담을 배열 초기화
    const newImages = [];
    const newPreviews = [];

    // 이미지 파일 선택된 경우
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 이미지 파일 3개로 제한
        if (newImages.length < 3) {
          // 이벤트 객체의 파일을 newImages에 담기
          newImages.push(file);
          // 파일 리더 객체 생성
          const reader = new FileReader();
          // 파일 읽어온 후 실행되는 콜백 함수
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
    }

    // 이미지 업로드가 완료되면 새로운 상태를 업데이트
    // 이미지 업로드 후에 setNewBoardPost를 호출하여 file 속성을 업데이트합니다.
    // 이렇게 하면 이미지 URL이 포함된 상태가 됩니다.
    // 상태를 업데이트
    setImages(newImages);
  };
  console.log('보드작성 이미지 ==>',images);
  console.log('보드작성 이미지 showImages ==>',showImages);
  /* 이미지 미리보기 삭제 */
   const handleDeletePreview = (index) => {
     const newImages = [...images];
     const newPreviews = [...previews];
     newImages.splice(index, 1);
     newPreviews.splice(index, 1);
     setImages(newImages);
     setPreviews(newPreviews);
   };
   /* 이미지 추가 끝 */
   console.log('확인해야될 값!!!newBoardPost ====>',newBoardPost);

  /* Axios 시작 */

  const handleBoardWriterSubmit = (e) => {
    e.preventDefault();
  
    if (!newBoardPost.boardTitle || !newBoardPost.boardContent || !newBoardPost.boardCateNo) {
      alert("모든 값을 바르게 입력해주세요.");
      return;
    }
  
    const formData = new FormData();
    const boardData = {
      boardTitle: newBoardPost.boardTitle,
      boardContent: newBoardPost.boardContent,
      boardWriteDate: newBoardPost.boardWriteDate,
      userRegion: newBoardPost.userRegion,
      userNo: newBoardPost.userNo,
    };
  
    // 이미지 파일을 formData에 추가
    // for (let i = 0; i < images.length; i++) {
    //   const image = images[i];
    //   formData.append(`boardImgFile${i}`, image.file); // 이미지 파일 추가
    //   formData.append(`boardImgOriName${i}`, image.boardImgOriName); // 이미지 원본 파일 이름 추가
    //   formData.append(`boardImgPath${i}`, '/resources/images/board/'); // 이미지 경로 추가
    //   formData.append(`boardImgUploadDate${i}`, getCurrentDateTime()); // 이미지 업로드 날짜 추가
    //   formData.append(`boardImgLevel${i}`, i + 1); // 이미지 레벨 추가
    // }
    // 파일 데이터 저장
    
    Object.values(images).forEach((file) => formData.append("file", file));

    Object.entries(boardData).forEach((item) => {
      formData.append(item[0], item[1]);
    });
  
    formData.append("boardTag", JSON.stringify(newBoardPost.boardTag));
    formData.append("boardCateNo", newBoardPost.boardCateNo);
  
    // FormData의 key 확인
    for (let key of formData.keys()) {
      console.log('FormData의 key 확인', key);
    }
  
    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(' FormData의 value 확인', value);
    }
  
    axios.post(`http://localhost:3000/dasony${path}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // 업로드 성공 시 서버에서의 응답을 처리할 수 있습니다.
        console.log('업로드 성공:', response.data);
        // 게시물 업로드가 성공한 후에 상태를 초기화합니다.
        setNewBoardPost({
          userRegion: '',
          userNo: '',
          boardTitle: '',
          boardWriteDate: '',
          boardContent: '',
          boardCateNo: '',
          boardTag: '',
        });
        setBoardTagArr([]);
        setInputContent('');
        setImages([]);
        setPreviews([]);
      })
      .catch((error) => {
        console.error('업로드 실패', error);
        alert("업로드에 실패하였습니다.");
      });
  }


  return (
    <>
      <div className='BoardWriteForm-wrapper'>
        <div className="BoardWriteForm-head-title-wrapper">
          <BoardHeader/>
          <div className="BoardWriteForm-container">
            <div className='form'>
              <div className="BoardWriteForm-search-title-wrapper">
                <div className="row justify-content-md-center boardDetail-title-container">
                  <div className='row'>
                    <BoardWriterCategory  onChange={handleInputChange}/>
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
                              boardTagArr.map( (item, index) => (
                                <li className="sKeyword" key={index}>
                                  {item}
                                  <p
                                  onClick={() => {deleteKeyWord(index)}} className="boardSearchClose">x</p>
                              
                                </li>
                              ))}
                          </ul>
                          <input type="text" className="BoardWriteForm-search-input-tag"  placeholder="태그를 입력해보세요."
                            value={inputContent} onKeyDown={enter}
                             onChange={(e) => {setInputContent(e.target.value)
                              handleInputChange(e);
                              }}/>
                        </div>{/* boardList-search-box-tag */}
                      </div>{/* boardList-search-input-tag-wrapper */}
                  </div>{/* row */}
                </div> {/* row justify-content-md-center boardDetail-title-container */}    
              </div>{/* boardList-search-title-wrapper */}
              <div>
                <OpenEditor className="ck-editor" editContent={{content, setContent}}
                value={newBoardPost.boardContent} 
                onClick={handleInputChange}/>
                {/* <textarea
                  name="boardContent" 
                  value={newBoardPost.boardContent} 
                  onChange={handleInputChange}
                    /> */}
              </div> 
              <div className='BoardWriteForm-img-input-wrapper'>
                <label htmlFor="file">
                  <div className='boardWriter-img-select'>사진 선택</div>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  // enctype="multipart/form-data"
                  multiple
                  className='boardWriter-img-input'
                  onChange={handleImgChange}
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
                  <button type="submit" className='board-submit-btn' onClick={handleBoardWriterSubmit}>등록</button>  
                </div>
              </div>
            </div>
            <div style={{height:'10vh'}}>{/* 공백용 디브 */}</div>
          </div>{/* BoardWriteForm-container */}
        </div> {/* BoardWriteForm-head-title-wrapper */}
      </div>{/* BoardWriteForm-wrapper */}
    </>
  );
}


export default BoardDailyWriter;
