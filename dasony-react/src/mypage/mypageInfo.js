import React, {useState} from 'react';
import './mypagecss.css';



const MypageInfo = () => {
  const [isEditing, setIsEditing] = useState(false); // 상태 추가

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (

      <div className="edit-info">
        <div className="user-infos">
          <ul>
            <li>
              id : {isEditing? <input type="text" placeholder="id" ></input> : <input type="text" placeholder="id" readOnly></input>}
            </li>
            <li>
              비번 : {isEditing?<input type="text" placeholder="pwd"></input>:<input type="text" placeholder="pwd"readOnly></input>}
            </li>
            <li>
              이름 : {isEditing?<input type="text" placeholder="이름" ></input>:<input type="text" placeholder="이름" readOnly></input>}
            </li>
            <li>
              별명 : {isEditing?<input type="text" placeholder="닉네임"></input>:<input type="text" placeholder="닉네임"readOnly></input>}
            </li>
            <li>
              이메일 : {isEditing?<input type="text" placeholder="이메일"></input>:<input type="text" placeholder="이메일"readOnly></input>}
            </li>
            <li>
              번호 : {isEditing?<input type="text" placeholder="번호"></input>:<input type="text" placeholder="번호"readOnly></input>}
            </li>
            <li>
              지역 : {isEditing?<input type="text" placeholder="지역"></input>:<input type="text" placeholder="지역"readOnly></input>}
            </li>
          </ul>
        </div>

        <button onClick={handleEditClick} style={{ width: '400px', marginLeft: '280px' }}>
          {isEditing? <p>수정완료</p> : <p>수정하기</p>}
        </button>
      </div>
    
  );
};

export default MypageInfo;
