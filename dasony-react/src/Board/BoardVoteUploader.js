import React, { useState } from 'react';
import './Board.css';
import BoardHeader from './BoardHeader';
import BoardWTitle from './BoardWTitle';

const BoardVoteUploader = (props) => {

  const { onAddVote } = props;
  const [newOptions, setNewOptions] = useState([
    { id: 1, text: '', count: 0 },
    { id: 2, text: '', count: 0 },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setNewOptions((prevOptions) => {
      const newOption = { ...prevOptions[index], [name]: value };
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = newOption;
      return updatedOptions;
    });
  };

  const handleAddVote = () => {
    const validOptions = newOptions.filter((option) => option.text !== '');
    if (validOptions.length !== 2) {
      alert('두 개의 투표 옵션을 입력해주세요.');
      return;
    }

    onAddVote(validOptions);
    setNewOptions([{ id: 1, text: '', count: 0 }, { id: 2, text: '', count: 0 }]);
  };


  return (
    <>
      <div className='boardDetail-wrapper'>
        <div className="boardDetail-head-title-wrapper">
          <BoardHeader/>
          <div className="boardDetail-container">
            <form action="" method="GET">
              <BoardWTitle/>
              <div className='Vote-Content-container'>
                  <div className='Vote-Content-btn-wrapper'>
                      {newOptions.map((option, index) => (
                        <div key={index} className="Vote-button-container">
                          <input
                            className='Vote-button-controll'
                            type='text'
                            name='text'
                            value={option.text}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder={`투표 옵션 ${index + 1} 입력`}
                          />
                        </div>
                      ))} 
                  </div>
                    <div className='Vote-Content-Time'>
                    <span>종료 시간</span>
                    <input type='datetime-local'></input>
                  </div>              
              </div>{/* Vote-Content-container */}
              <div className='BoardShorts-btn board-btn-cntrol-box'>
                <div className='board-btn-wrapper'>
                  <button onClick={handleAddVote} className='board-cancel-btn'>취소 버튼</button>
                </div>
                <div className='board-btn-wrapper'>
                  <button className='board-submit-btn' type='submit'onClick={handleAddVote}>등록 버튼</button>
                </div>
              </div>
            </form>
          </div>{/* boardDetail-container */}
        </div> {/* boardDetail-head-title-wrapper */}
      </div>{/* boardDetail-wrapper */}
    </>
  );
}

export default BoardVoteUploader;