import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {boardVsState} from '../atoms';
import './VoteWrite.css';
import axios from 'axios';


export const VoteWrite = ()=>{

{/*보드 VS 정보 설정 - atom */}
  const [boardVs, setBoardVs] = useRecoilState(boardVsState);
  console.log("쓰는데서",boardVs);

  /*boardVS 나머지 정보 설정 */

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  
  const handleBoardVs = (e) =>{
    
    let {id, value} = e.target;

    if(id == 'boardExpireDate'){
      value = new Date(value).toISOString().toString().slice(0, 16);
    }
      setBoardVs(prev=>({
        ...prev,
        [id]:value,
        boardWriteDate: getCurrentDateTime()
      }));
  }

  /**boardVs 정보 db 저장 - 서버 * */
  const handleBoardVsSub = () => {
    axios.post('/dasony/api/boardVsInsert', boardVs)
          .then(res=>{
            alert(res.data);
            setBoardVs(null);
            navigate('/board/general/daily');
          })
          .catch(err=>{
            console.log(err);
          })
  }

  /*boardVs 작성 취소 */
  const navigate = useNavigate();
  const handleBoardVsCancle = () => {
    setBoardVs({});
    alert('취소되었습니다.');
    navigate('/board/general/daily');
  }



{/*
  const handleVote = (index) => {
  const newOptions = [...options];
  newOptions[index].count += 1;
  setOptions(newOptions);
};
*/}

return (
  <>
      <div className="Vote">
      
        <div className='Vote-Content-container'>

          <div className='vote-content-box'>

              <div>
                <input id='boardOptionLeft' 
                      onChange={handleBoardVs} value={boardVs?.boardOptionLeft}
                      placeholder='옵션1 값을 입력하세요'/>
              </div>
              <div>vs</div>
              <div>
                <input id='boardOptionRight' 
                      onChange={handleBoardVs} value={boardVs?.boardOptionRight}
                      placeholder='옵션2 값을 입력하세요'/>
              </div>

          </div>
          <div>
              <textarea rows="4" cols="100"
                       id="boardContent" value={boardVs?.boardContent} onChange={handleBoardVs} />
          </div>
          <div className='vote-Content-Time' style={{margin:'5vh'}}>
              <span>종료 시간</span>
              <input id='boardExpireDate' onChange={handleBoardVs} 
                      type='datetime-local' value={boardVs?.boardExpireDate}/>
          </div>
          <div className='vote-button-box'>
            <button className='vote-button-box-cncl' onClick={handleBoardVsCancle}>취소</button>
            <button className='vote-button-box-sub' onClick={handleBoardVsSub}>등록</button>
          </div>

        </div>
        
      </div>
  </>
);
}