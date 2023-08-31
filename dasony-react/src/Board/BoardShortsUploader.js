import React, { useState } from 'react';
import './Board.css';
import BoardHeader from './BoardHeader';
import BoardWTitle from './BoardWTitle';
import styled from 'styled-components';
import Heart from '../heart';
import Reply from './Reply';

const BoardShorts = () => {

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


  return (
    <>
      <div className='boardDetail-wrapper'>
        <div className="boardDetail-head-title-wrapper">
          <BoardHeader/>
          <div className="boardDetail-container">
            <form action="" method="GET">
              <BoardWTitle/>
        
              <div className='Board-Shorts-Content-container'>
                  <div className='videoWrap'>
                    <div className='videoplayer-wrapper'>
                      <div className='videoplayer-userinfo'>
                        <span className='videoplayer-userimg-wrapper'>
                          <img src="/resources/common-img/boardImg/지현님슈퍼슈퍼지능.jpg" alt="썸네일" className='videoplayer-userimg'></img>
                        </span>
                         <span>UserName</span>
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
                        <span>{shortsFile.video && <video src={shortsFile.url} controls width="300px" height="500px"/>}</span>
                        <span >{shortsFile.image && <img src={shortsFile.url} />}</span>
                      </div>
                    </div>
                    <div className='videoFileUploader'>
                      <input  type="file" onChange={imageUpload} />
                    </div>
                  </div>
              </div>{/* Vote-Content-container */}
              <div className='BoardShorts-btn board-btn-cntrol-box'>
                <div className='board-btn-wrapper'>
                  <button className='board-cancel-btn'>취소 버튼</button>
                </div>
                <div className='board-btn-wrapper'>
                  <button className='board-submit-btn' type='submit'>등록 버튼</button>
                </div>
              </div>
            </form>
          </div>{/* boardDetail-container */}
        </div> {/* boardDetail-head-title-wrapper */}
      </div>{/* boardDetail-wrapper */}
    </>
  );
}


export default BoardShorts;