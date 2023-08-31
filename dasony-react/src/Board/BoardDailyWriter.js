import { useState } from 'react';
import './Board.css';
import BoardHeader from './BoardHeader';
import BoardWTitle from './BoardWTitle';
import Editor from './Editor';


const BoardDailyWriter = () => {


  return (
    <>
      <div className='BoardWriteForm-wrapper'>
        <div className="BoardWriteForm-head-title-wrapper">
          <BoardHeader/>
          <div className="BoardWriteForm-container">
            <form action="" method="GET">
              <BoardWTitle/>
              <div><Editor/></div>       
            </form>
          </div>{/* BoardWriteForm-container */}
        </div> {/* BoardWriteForm-head-title-wrapper */}
      </div>{/* BoardWriteForm-wrapper */}
    </>
  );
}

export default BoardDailyWriter;