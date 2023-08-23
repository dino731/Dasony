import './Header.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation  } from 'react-router-dom';


const Header = () => {
   
    /*사이드바 등장, 숨김 useState */
    const [isClick, setIsClick]=useState(0);
    /*사이드바 속성 저장 */
    const [sideId, setSideId] = useState('');



    return(
        
            /* 사이드바 - 보조 사이드 바 */
            
                <div id="container">
                    <div id="main-container">
                        <ul>
                            <li></li>
                            <li className="logo-li"><img src='/resources/common-img/dasony-logo2.png'/></li>
                            <li></li>
                            <li className="board-li">
                                <Link to='/'>
                                    <i className="bi bi-house-door"></i> 메인
                                </Link>
                            </li>
                            <li className="board-li" id="ff" onClick={(event)=>{setSideId(event.target.id); isClick==0?setIsClick(1):setIsClick(0)}}><i className="bi bi-clipboard"></i> 게시판</li>
                            <li className="board-li">
                                <Link to='/chat'>    
                                    <i className="bi bi-chat-quote"></i> 채팅
                                </Link>    
                            </li>
                            <li className="board-li" id="point" onClick={(event)=>{setSideId(event.target.id); isClick==0?setIsClick(1):setIsClick(0)}}><i className="bi bi-coin"></i> 포인트</li>
                            <li className="board-li" id="event" onClick={(event)=>{setSideId(event.target.id); isClick==0?setIsClick(1):setIsClick(0)}}><i className="bi bi-search-heart"></i> 이벤트</li>
                            <li className="board-li" id="myPage" onClick={(event)=>{setSideId(event.target.id); isClick==0?setIsClick(1):setIsClick(0)}}><i className="bi bi-person"></i> 내 정보</li>
                            <li className="logout-li">
                                <Link to='/'>
                                    <p><i className="bi bi-box-arrow-right"></i> 로그아웃</p>
                                </Link>    
                            </li>
                        </ul>
                        <br/><br/>
                        
                    </div>
                
                    {/* 사이드바 - 보조 사이드 바 */}
                    
                    <div id="side-container-board" style={{opacity:isClick==1?1:0 }}>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li>사담</li>
                            <li>정보공유</li>
                            <li>나눔</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                </div>
            

    );

}

export default Header;