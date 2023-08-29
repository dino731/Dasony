import './Header.css';
import { useEffect, useState, useTransition } from 'react';
import {Link} from 'react-router-dom';


const Header = () => {

    /*사이드바 속성 useState */
    const [sideId, setSideId] = useState('');
    /*사이드바 속성 Handle*/
    const HandleSideId = function(id){
        setSideId(id);
    }
    /*사이드바 텍스트 useState */
    const [sideListText, setSideListText] = useState('');
    /*사이드바 텍스트 Handle */
    const HandleSideList =  async function(id){
        let sideList = "";
        switch(id){
            case'board': sideList = (
                                        <ul>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/board/general/daily'>사담</Link></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/board/info/jmt'>정보공유</Link></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>나눔</li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                    ); break;
            case'point' : sideList = (
                                        <ul>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/shop/main'>상점</Link></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>기부</li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                    ); break;
            case'myPage': sideList = (
                                        <ul>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>회원정보 수정</li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>내 활동</li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>고객센터</li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>내 상점</li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>내 기부</li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}>알림 내역</li>
                                            <li></li>
                                        </ul>
                                    ); break;
            default : sideList = "";
        }
        await HandleSideId(id);
        setSideListText(sideList);
        
    }
       
    /*사이드바 등장, 숨김 useState */
    const [isClick, setIsClick]=useState(0);
    /*사이드바 등장, 숨김 Handle */
    const HandleOpacity = async function(id){
        await HandleSideList(id);
        if(id === ""){
            setIsClick(0);
        } else {
            setIsClick(1);
        }
    }

    

    return(
        
            /* 사이드바 - 메인 사이드 바 */
                <div id="head-container">
                    <div id="main-container">
                        <ul>
                            <li></li>
                            <li className="logo-li"><img src='/resources/common-img/dasony-logo.png'/></li>
                            <li></li>
                            <Link to='/' style={{textDecoration:'none'}}>
                                <li className="board-li" 
                                    onClick={(event)=>{HandleOpacity(event.target.id);}}
                                >
                                    <i className="bi bi-house-door"></i> 메인
                                </li>
                            </Link>

                            <li className="board-li" id="board" 
                                onClick={(event)=>{HandleOpacity(event.target.id);}}
                            >
                                <i className="bi bi-clipboard"></i> 게시판
                            </li>

                            <Link to='/chat' style={{textDecoration:'none'}}> 
                                <li className="board-li"  
                                    onClick={(event)=>{HandleOpacity(event.target.id);}}
                                >
                                    <i className="bi bi-chat-quote"></i> 채팅
                                </li>
                            </Link> 

                            <li className="board-li" id="point"
                                onClick={(event)=>{HandleOpacity(event.target.id);}}
                            >
                                <i className="bi bi-coin"></i> 포인트
                            </li>

                            <Link to='/event' style={{textDecoration:'none'}}>
                                <li className="board-li"
                                    onClick={(event)=>{HandleOpacity(event.target.id);}}
                                >
                                    <i className="bi bi-search-heart"></i> 이벤트
                                </li>
                            </Link>
                            <li className="board-li" id="myPage" 
                                
                                onClick={(event)=>{HandleOpacity(event.target.id);}}
                            >
                                <i className="bi bi-person"></i> 내 정보
                            </li>
                            <Link to='/plzLogin' style={{textDecoration:'none'}}>
                                <li className="logout-li" 
                                    onClick={(event)=>{HandleOpacity(event.target.id);}}
                                >
                                    <p><i className="bi bi-box-arrow-right"></i> 로그아웃</p>
                                </li>
                            </Link> 
                        </ul>
                        <br/><br/>
                        
                    </div>
                
                    {/* 사이드바 - 보조 사이드 바 */}
                    <div id="side-container-board" style={{ transitionDuration: 1, opacity:isClick==1?1:0}}>
                        {sideListText}
                    </div>

                </div>
            

    );

}

export default Header;