import React, {useState} from 'react';
import '../admin/user/adminUserDetail.css'



const MypageInfo = () => {
  const [isEditing, setIsEditing] = useState(false); // 상태 추가

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  

  return (

    <div className="admin-user-datail-container">
          
                <h2>회원 정보</h2>
            <div className="admin-user-datail-head">
                
            </div>
            <div className='admin-user-datail-table'>
                <table>
                    <tbody>
                        <tr>
                            <th>회원 번호</th>
                            <td>ㄴㅇ</td>
                        </tr>
                        <tr>
                            <th>회원 이름</th>
                            <td>cc</td>
                        </tr>
                        <tr>
                            <th>회원 아이디</th>
                            <td>cc</td>
                        </tr>
                        <tr>
                            <th>회원 비밀번호</th>
                            <td>멀라 가게</td>
                        </tr>
                        <tr>
                            <th>회원 별명</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>핸드폰 번호</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>상태</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>등급</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>수정 날짜</th>
                            <td>ㅇㅇ</td>
                        </tr>
                        <tr>
                            <th>가입 날짜</th>
                            <td>ㅇㅇ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            
        </div>
    
  );
};

export default MypageInfo;
