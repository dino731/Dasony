import React from 'react';
import './mypagecss.css';

const MypageAct = () => {
  return (
    <div className="main">
    
      <div className="act-table">
        <table>
          <thead>
            <tr>
              <th>게시글번호</th>
              <th>시간</th>
              <th>제목</th>
              <th>조회수</th>
              <th>종류</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2023-08-22</td>
              <td>첫 번째 게시글</td>
              <td>100</td>
              <td>댓글</td>
              <td>
                <button className="delete-button">삭제</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>2023-08-23</td>
              <td>두 번째 게시글</td>
              <td>75</td>
              <td>게시글</td>
              <td>
                <button className="delete-button">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MypageAct;
