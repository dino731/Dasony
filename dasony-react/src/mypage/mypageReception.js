import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './mypagecss.css';
import emailjs from '@emailjs/browser';
// import { useDispatch } from 'react-redux'

const MypageReception = () => {
  const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
  const form = useRef();

  
  const sendEmail = (e) => {
    e.preventDefault();

    console.log(form.current);
    emailjs.sendForm('Dasony', 'dasonyEmail', form.current, 'F-MU3Q5TmMwsJT8xo')
    
      .then((result) => {
        console.log("이메일 성공");
      }, (error) => {
        console.log("이메일 실패");
      });
  };

  const goback = () =>{
    window.history.back();
  }

  return (
    <div className="mypage-Reception">
      <h2>문의 하기</h2>
      <div className="receptionForm">
  <form ref={form} onSubmit={sendEmail}>
  <label className='ReceptionLabel'>Name</label>
  <input type="text" className='ReceptionText' name="userName" placeholder="이름을 입력해주세요." />
  <label className='ReceptionLabel'>Email</label>
  <input type="text" className='ReceptionText' name="userEmail" placeholder="답변 받으실 email을 입력해주세요" />
  <label className='ReceptionLabel'>제목</label>
  <input type="text" className='ReceptionText' name="emailTitle" placeholder="제목을 입력해주세요." />
  <label className='ReceptionLabel'>emailContent</label>
  <textarea name="emailContent" id="contentTextarea" className='ReceptionText' placeholder="내용을 입력해주세요."></textarea>
  </form>

        <div className="section1-2" align="center">
          <button className="btn btn-secondary" onClick={goback}>뒤로 가기</button>
          <button className="btn btn-primaryjeff" id="receptionButton" onClick={sendEmail}>문의 하기</button>
        </div>
      </div>
    </div>
  );
};

export default MypageReception;
