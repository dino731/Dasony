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

  return (
    <div className="admin-user-datail-container">
      <h2>문의 하기</h2>
      <div className="section_1_content">
      <form ref={form} onSubmit={sendEmail}>
      <button> X </button>
      <label>Name</label>
      <input type="text" name="userName" placeholder="이름을 입력해주세요." />
      <label>Email</label>
      <input type="email" name="userEmail" placeholder="메일 주소를 입력해주세요" />
      <label>제목</label>
      <input type="text" name="emailTitle" placeholder="제목을 입력해주세요." />
      <label>Message</label>
      <textarea name="emailContent" />
      <input type="submit" value="Send" />
    </form>
        <br />
        <div className="section1-2" align="center">
          <button className="btn btn-secondary"><Link to={'../service/notice/reception'}>취소</Link></button>
          <button className="btn btn-primary" id="receptionButton" onClick={sendEmail}>문의 하기</button>
        </div>
      </div>
    </div>
  );
};

export default MypageReception;
