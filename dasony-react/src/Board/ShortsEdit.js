import React, { useEffect, useRef, useState } from 'react';
import './Board.css';
import Heart from '../heart';
import Reply from './Reply';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { boardShState } from '../atoms';
import { useNavigate, useParams } from 'react-router-dom';

export const ShortsEdit = () => {
  const {boardNo} = useParams();
  const boardno = parseInt(boardNo);
  /*헤더에서 정보 받아오기 -atom, recoil */
  const [boardSh, setBoardSh] = useRecoilState(boardShState);
  const navigate = useNavigate();

 
  /*사용자 정보 */
  const userNo = parseInt(localStorage.getItem('loginUserNo'));
  const [user, setUser] = useState();
  /*사용자 정보 - 서버 */
  const handleUserInfo = () => {
    axios.post('/dasony/api/userInfo', {userNo, userNo})
    .then(res=>{
      setUser(res.data.user);
    })
    .catch(err=>{
      alert(err.data.err);
    })
  }

  console.log(boardSh);




  /*boardSh 작성 취소 */
  const handleBoardShCancle = () => {
    alert('취소되었습니다.');
 
    setBoardSh({});
    navigate(-1);
  }

  /*날짜 설정 */
  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /*쇼츠 정보 설정하기 */
  const handleBoardSh = (e)=>{
    const {id, value} = e.target;
    setBoardSh(prev=>({
      ...prev,
      [id] : value,
      userNo : userNo,
      boardNo:boardno,
      boardWriteDate : getCurrentDateTime()
    }));
    console.log(boardSh);
  }
  {/*쇼츠 영상 정보 저장 */}
  const form = new FormData();
  const inputRef = useRef(null);
  const handleAddVideo = (e)=>{
    const fileInput = inputRef.current;
    if (fileInput) {
      const file = fileInput.files;
      if (file) {
        // 파일 크기 제한 (예: 10MB)
        const maxSize = 100 * 1024 * 1024; // 100MB
        
         
        for(let i = 0; i < file.length; i++) {
          console.log("파일 사이즈",file[i].size);
          if (file[i].size >=maxSize) {
            // 파일 크기가 제한을 초과하는 경우
            alert('파일 크기가 너무 큽니다. 100MB 이하의 파일을 선택해주세요.');
            // 파일 선택 초기화
            e.target.value = null;
            return;
          }
          form.append("file", file[i]);
          console.log("file[i]확인", file[i]);
        }
      }
    }
    console.log("파일 객체 확인", form.get("file"));
    console.log("form 확인", form);
  }
  {/*쇼츠 정보 전달 - 서버 */}
  const handleBoardShSub = (e) =>{
    handleAddVideo();
    form.append("boardSh", new Blob([JSON.stringify(boardSh)], {type: "application/json" }));
    console.log("form boardSh확인", form.get("boardSh"));
    axios.post('/dasony/api/shUpdateSub', form)
    .then(res=>{
      console.log("res.data", res.data);
      alert(res.data);
      navigate(-1);
      })
    .catch(err=>{
      console.log(err);
      alert("다시 시도해주세요.");
    })
    setBoardSh({});
}

  const [shortsFile, setShortsFile] = useState({});

  const imageUpload = e => {
    const imageTpye = e.target.files[0].type.includes('image');
    const videoTpye = e.target.files[0].type.includes('video');

    setShortsFile({
      url: URL.createObjectURL(e.target.files[0]),
      image: imageTpye,
      video: videoTpye,
    });
    console.log(imageTpye);
  };

  //input 값을 바뀌고 초기화해줌
  // let handleInputChange = (e) =>{
  //   let {name,value} = e.target;
  //   setNewBoardPost({...newBoardPost, [name] : value});
  // };

/*쇼츠 정보 불러오기 - 서버 */
useEffect(()=>{
  handleUserInfo();

  const fetchData = async() => {
    await axios.post('/dasony/api/shortsUpdate', {boardNo:boardNo})
    .then(res=>{
      setBoardSh(res.data);
    })
  }
  
  fetchData();
},[userNo])

  return (
    <>
      <div className='boardDetail-wrapper'>
        <div className="boardDetail-head-title-wrapper">
          <div className="boardDetail-container">
              <div className='Board-Shorts-Content-container'>
                <div className='boardSh-content'>
                  <span>{user&&user.userNick}님의 쇼츠를 소개해주세요! (200 자 이내)</span>
                  <br/><br/>
                  <textarea id='boardContent' cols={60} rows={6} maxLength={200} 
                            onChange={handleBoardSh} value={boardSh?.boardContent}/>
                  <br/><br/>
                </div>

                  <div className='videoWrap'>
                    <div className='videoplayer-wrapper'>
                      <div className='videoplayer-userinfo'>
                        <span className='videoplayer-userimg-wrapper'>
                        </span>
                         <span>{user&&user.userNick}</span>
                      </div>
                      <div className='videoplayer-userinfo-wrapper'>
                        <div className='videoplayer-userinfo-heart'>
                          <Heart/>
                        </div>
                        <div className='videoplayer-userinfo-reply'>
                          <Reply/>
                        </div>
                        
                      </div>
                      <div className='videoplayer'>
                        {
                          !shortsFile?.video && boardSh?.videoModName? 
                          <video controls className="board-video-thumb" muted autoPlay>
                              <source 
                              src={`http://localhost:8083/dasony/resources/images/board/video/${boardSh?.videoModName}`} 
                              type="video/mp4" />
                          </video>
                          :
                          <>
                          <span>{shortsFile.video && <video src={shortsFile.url} controls width="300px" height="500px"/>}</span>
                          <span >{shortsFile.image && <img src={shortsFile.url} />}</span>
                          </>
                        }
                      </div>
                    </div>
                    <div className='videoFileUploader'>
                      <input  type="file" onChange={imageUpload} ref={inputRef} multiple/>
                    </div>
                  </div>
              </div>{/* Vote-Content-container */}
              <div className='BoardShorts-btn board-btn-cntrol-box'>
                <div className='board-btn-wrapper'>
                  <button className='board-cancel-btn'
                        onClick={handleBoardShCancle}>취소 버튼</button>
                </div>
                <div className='board-btn-wrapper'>
                  <button className='board-submit-btn'
                          onClick={handleBoardShSub}>등록 버튼</button>
                </div>
              </div>
          </div>{/* boardDetail-container */}
        </div> {/* boardDetail-head-title-wrapper */}
      </div>{/* boardDetail-wrapper */}
    </>
  );
}
