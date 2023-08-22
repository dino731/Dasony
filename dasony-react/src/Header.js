import './Header.css';
import $ from 'jquery';
import { useEffect } from 'react';


const Header = () => {
    
   

    return(

       
            <div id="container">
                <div id="main-container">
                    <ul>
                        <li></li>
                        <li><span>다소니</span></li>
                        <li></li>
                        <li><i class="bi bi-house-door"></i> 메인</li>
                        <li className="board"><i class="bi bi-clipboard"></i> 게시판</li>
                        <li><i class="bi bi-chat-quote"></i> 채팅</li>
                        <li className="board"><i class="bi bi-coin"></i> 포인트</li>
                        <li className="board"><i class="bi bi-search-heart"></i> 이벤트</li>
                        <li className="board"><i class="bi bi-person"></i> 내 정보</li>
                        <li><p><i class="bi bi-box-arrow-right"></i> 로그아웃</p></li>
                    </ul>
                    <br/><br/>
                    
                </div>

            
            
            


                <div id="side-container-board">
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