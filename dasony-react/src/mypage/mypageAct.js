import React, { useEffect, useState } from 'react';
import './mypagecss.css';
import axios from 'axios';

const MypageAct = () => {
  const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
  const [actList, setActList] = useState({ boardList: [], donationList: [] ,eventList:[] ,
     pointList:[] , gameList : []
    });

  useEffect(() => {
    axios.post("/dasony/api/getMyActList", loginUserNo, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      const sortedBoardList = response.data.boardList.sort((a, b) => {
        return new Date(b.boardWriteDate) - new Date(a.boardWriteDate);
      });

      const sortedDonationList = response.data.donationList.sort((a, b) => {
        return new Date(b.donaExecuteDate) - new Date(a.donaExecuteDate);
      });
      const sortedEventList = response.data.eventList.sort((a, b) => {
        return new Date(b.donaExecuteDate) - new Date(a.donaExecuteDate);
      });
      const sortedPointList = response.data.pointList.sort((a, b) => {
        return new Date(b.donaExecuteDate) - new Date(a.donaExecuteDate);
      });
      const sortedGameList = response.data.gameList.sort((a, b) => {
        return new Date(b.donaExecuteDate) - new Date(a.donaExecuteDate);
      });

      setActList({
        boardList: sortedBoardList,
        donationList: sortedDonationList,
        eventList : sortedEventList,
        pointList : sortedPointList,
        gameList : sortedGameList
      });
    }).catch((error) => {
      console.error("오류남:", error);
    });
  }, []);

  return (
    <div className="act-table">
      <h2>내 활동</h2>
      <div className="jefftable">
        <table>
          <thead>
            <tr>
              <th className="nf-history-header2">카테 번호</th>
              <th className="nf-history-header4">시간</th>
              <th className="nf-history-header1">제목</th>
              <th className="nf-history-header4">구분</th>
              <th className="nf-history-header3"></th>
            </tr>
          </thead>
          <tbody>
            {actList.boardList.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{index+1}</td>
                <td className="nf-td3">{item.boardWriteDate}</td>
                <td className="nf-td2">{item.boardTitle}</td>
                <td className="nf-td1">게시글</td>
                <td className="nf-td1">
                  <button className="delete-button">삭제</button>
                </td>
              </tr>
            ))}
            
            {actList.donationList.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{index+1}</td>
                <td className="nf-td3">{item.donaExecuteDate}</td>
                <td className="nf-td2">{item.donation.donaTitle}</td>
                <td className="nf-td1">기부</td>
                <td className="nf-td1">
                  <button className="delete-button">삭제</button>
                </td>
              </tr>
            ))}
            {actList.eventList.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{index+1}</td>
                <td className="nf-td3">{item.winnerDate}</td>
                <td className="nf-td2">{item.title}</td>
                <td className="nf-td1">이벤트</td>
                <td className="nf-td1">
                  <button className="delete-button">삭제</button>
                </td>
              </tr>
            ))}
            {actList.pointList.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{index+1}</td>
                <td className="nf-td3">{item.pointEventDate}</td>
                <td className="nf-td2">{item.pointContent}</td>
                <td className="nf-td1">포인트</td>
                <td className="nf-td1">
                  <button className="delete-button">삭제</button>
                </td>
              </tr>
            ))}
            {actList.gameList.map((item, index) => (
              <tr key={index}>
                <td className="nf-td1">{index+1}</td>
                <td className="nf-td3">{item.gameDate}</td>
                <td className="nf-td2">
                {item.gameStatus === 'Y' ? (
                    <div>
                  <b>보물찾기 성공!<br/></b>
                  {item.pointStatus === 'Y' ? (
                    <b>포인트 획득!</b>
                  ) : (
                    <b>응모권 획득!</b>
                  )}
                </div>
              ) : (
                <div>
                  <b>보물찾기 실패!</b>
                </div>
              )}
                
                  </td>
                <td className="nf-td1">게임</td>
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
