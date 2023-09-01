import React from 'react';
import './mypagecss.css';

const MypageAct = () => {
  return (
    
    
      <div className="act-table">

        <h2>내 활동</h2>

        <div className="jefftable">
        <table>
          <thead>
            <tr>
              <th className='nf-history-header2'>게시글번호</th>
              <th className='nf-history-header4'>시간</th>
              <th className='nf-history-header1'>제목</th>
              <th className='nf-history-header4'>조회수</th>
              <th className='nf-history-header4'>종류</th>
              <th className='nf-history-header3'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="nf-td1"> 1 </td>
              <td className="nf-td3">2023-08-22</td>
              <td className="nf-td2">첫 번째 게시글</td>
              <td className="nf-td1">100</td>
              <td className="nf-td1">댓글</td>
              <td className="nf-td1">
                <button className="delete-button">삭제</button>
              </td>
            </tr>
            <tr>
            <td className="nf-td1"> 2 </td>
            <td className="nf-td3">2023-08-23</td>
            <td className="nf-td2">두 번째 게시글</td>
            <td className="nf-td1">75</td>
            <td className="nf-td1">게시글</td>
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
