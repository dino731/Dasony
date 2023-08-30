import React from 'react';
import './mypagecss.css';

const MypageInfo = () => {
  return (
    <div className="main">
      <div className="edit-info">
        <div className="user-infos">
          <ul>
            <li>
              id : <input type="text" placeholder="id" />
            </li>
            <li>
              비번 : <input type="text" placeholder="pwd" />
            </li>
            <li>
              이름 : <input type="text" placeholder="이름" />
            </li>
            <li>
              별명 : <input type="text" placeholder="닉네임" />
            </li>
            <li>
              이메일 : <input type="text" placeholder="이메일" />
            </li>
            <li>
              번호 : <input type="text" placeholder="번호" />
            </li>
            <li>
              지역 : <input type="text" placeholder="지역" />
            </li>
          </ul>
        </div>
        <button style={{ width: '400px', marginLeft: '280px' }}>
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default MypageInfo;
