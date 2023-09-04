import React, { useRef,useEffect, useState } from 'react';
import './mypagecss.css';

const MypageAct = () => {
  
  const [act, setAct] = useState([]);

  useEffect(() => {
      const newAct = [{
          number :  '1',
          date : '2023.05.01',
          title : '이거봄??',
          count : '300',
          kind : '게시글'
      },{
        number :  '2',
        date : '2023.07.01',
        title : '맛집소개',
        count : '200',
        kind : '게시글'
      },{
        number :  '3',
        date : '2023.08.01',
        title : '이건좀',
        count : '30',
        kind : '댓글'
      }];
      setAct(newAct);
  
  },[]);

  return (
    
    
      <div className="act-table">

        <h2>내 활동</h2>

        <div className="jefftable">
        <table>
          <thead>
            <tr>
              <th className="nf-history-header2">게시글번호</th>
              <th className="nf-history-header4">시간</th>
              <th className="nf-history-header1">제목</th>
              <th className="nf-history-header4">조회수</th>
              <th className="nf-history-header4">종류</th>
              <th className="nf-history-header3"></th>
            </tr>
          </thead>
          <tbody>
            {act.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{item.number}</td>
                <td className="nf-td3">{item.date}</td>
                <td className="nf-td2">{item.title}</td>
                <td className="nf-td1">{item.count}</td>
                <td className="nf-td1">{item.kind}</td>
                <td className="nf-td1">
                  <button className="delete-button">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default MypageAct;
