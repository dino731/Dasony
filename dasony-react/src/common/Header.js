import './Header.css';

import { useEffect, useState, useTransition } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../atoms';
import axios from 'axios';
import Swal from "sweetalert2";


const Header = () => {
    const loginUserNo = parseInt(localStorage.getItem("loginUserNo"), 10);
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const [mainList, setMainList] = useState('');
    
    /*경로 설정을 위한 사용자 정보 확인 */
    const [isLogin, setIsLogin] = useState(false);
    const[lastGameData,setLastGameData] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem("userNo")){
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    })
 
    const [gameStartYN, setGameStartYN] = useState('');
    useEffect(() => {
        
        if(loginUserNo){
            axios.post("/dasony/api/gameStartYN", { 
                userNo: loginUserNo 
            }).then((response) => {
                setGameStartYN(response.data);
              })
              .catch((error) => {
                console.error("오류남:", error);
              });
        } else {
            navigate('/');
        }
        
      }, [loginUserNo, gameStartYN,lastGameData]);
        
      useEffect(() => {
        axios.post("/dasony/api/gameSet",{
            userNo : loginUserNo
        }).then((response)=>{
            setLastGameData(response.data);
        }).catch((error)=>{
            console.log("오류",error);
        });

        const gameDiv = document.getElementById('game');
        if (gameStartYN == 'Y') {
          gameDiv.style.display = 'block';
        } 
      }, [lastGameData, gameStartYN]);

      useEffect(() => {
        // 10초마다 실행되는 코드
        const intervalId = setInterval(() => {
          // 여기에 실행하고자 하는 코드를 작성하세요
          let lastGameDate = new Date(lastGameData);
          let currentTime = new Date();

          console.log("확인옇",loginUserNo);
          if ((currentTime - lastGameDate) >= 60000) {
          if ((currentTime - lastGameDate) >= 10000) {
            axios.post("/dasony/api/letStartGame", {
              userNo: loginUserNo
            });
          }
        }

        }, 10000); // 10초마다 실행

      
        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => {
          clearInterval(intervalId);
        };
      }, [lastGameData, loginUserNo]);
      

    /*관리자 헤더, 사용자 헤더 설정 */
    const HandleMainList = async function(location){
        let mainListText = '';
        if(path.includes('admin')){
            mainListText = (
                <>
                <ul>
                    <li></li>
                    <Link to='/admin/chart' style={{textDecoration:'none'}}>
                    <li className="logo-li"><img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/></li>
                    </Link>

                    <li></li>
                    <Link to='/admin/chart' style={{textDecoration:'none'}}>
                        <li className="board-li" 
                            onClick={(event)=>{HandleOpacity(event.target.id);}}
                            style={{fontSize:'1.5vw'}}
                        >
                            <i className="bi bi-house-door"></i> 메인
                        </li>
                    </Link>

                    <Link to='/admin/board' style={{textDecoration:'none'}}>
                    <li className="board-li" id="board" 
                        onClick={(event)=>{HandleOpacity(event.target.id);}}
                        style={{fontSize:'1.5vw'}}
                    >
                        <i className="bi bi-clipboard"></i> 게시판 관리
                    </li>
                    </Link>

                    <Link to='/admin/user' style={{textDecoration:'none'}}> 
                        <li className="board-li"  
                            onClick={(event)=>{HandleOpacity(event.target.id);}}
                            style={{fontSize:'1.5vw'}}
                        >
                            <i className="bi bi-people-fill"></i> 회원 관리
                        </li>
                    </Link> 

                    <li className="board-li" id="point"
                        onClick={(event)=>{HandleOpacity(event.target.id);}}
                        style={{fontSize:'1.5vw'}}
                    >
                        <i className="bi bi-coin"></i> 포인트 관리
                    </li>

                    <Link to='/admin/event' style={{textDecoration:'none'}}>
                        <li className="board-li"
                            onClick={(event)=>{HandleOpacity(event.target.id);}}
                            style={{fontSize:'1.5vw'}}
                        >
                            <i className="bi bi-search-heart"></i> 이벤트 관리
                        </li>
                    </Link>


                    
                        <li className="board-li" id="service" 
                            onClick={(event)=>{HandleOpacity(event.target.id);}}
                            style={{fontSize:'1.5vw'}}
                        >
                            <i className="bi bi-exclamation-triangle-fill"></i> 고객센터
                        </li>
                    
                    
                        <li className="logout-li" 
                            onClick={(event)=>{
                                HandleOpacity(event.target.id);
                                localStorage.removeItem("loginUserNo"); 
                                localStorage.removeItem("loginUserLocation"); 
                                localStorage.removeItem("loginUserLevel"); 
                                localStorage.removeItem("loginUserRegion"); 
                                navigate('/');
                                window.location.reload();
                            }}>
                            <p>
                                <i className="bi bi-box-arrow-right"></i> 로그아웃
                            </p>

                        </li>
                </ul>
            </>
            );
        } else {
            mainListText = (
                <>
                    <ul>
                        <li></li>
                        <Link to='/main' style={{textDecoration:'none'}}>
                        <li className="logo-li"><img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/></li>
                        </Link>
                        <li></li>
                        <Link to='/main' style={{textDecoration:'none'}}>
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

                        <Link to='/chatlist' style={{textDecoration:'none'}}> 
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
                        <li className="logout-li" 
                            onClick={(event)=>{
                                HandleOpacity(event.target.id);
                                localStorage.removeItem("loginUserNo"); 
                                localStorage.removeItem("loginUserLocation"); 
                                localStorage.removeItem("loginUserLevel"); 
                                localStorage.removeItem("loginUserRegion"); 
                                navigate('/');
                                window.location.reload();
                            }}>
                            <p>
                                <i className="bi bi-box-arrow-right"></i> 로그아웃
                            </p>
                        </li>
                    </ul>
                </>
            );
        }
        setMainList(mainListText);
    }


    useEffect(()=>{
        HandleMainList();
        
    }, [location, loginUserNo]);

    

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

        if(path.includes('admin')){
            switch(id){
                case'board': sideList = (
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admin/board'>사담</Link></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admin/calendar'>달력</Link></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admin/board'>{/* 정보공유 */}</Link></li>
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
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admin/shop'>상점</Link></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admindonalist'>기부</Link></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        ); break;
                case 'service': sideList = (
                                                <ul>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admin/service/notice'>공지</Link></li>
                                                    <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/admin/alert'>알람</Link></li>
                                                    <li></li>
                                                </ul>
                                            ); break;
            }
        } else {
            switch(id){
                case'board': sideList = (
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/board/general/daily'>사담</Link></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/board/info/jmt'>정보공유</Link></li>
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/board/share/list'>나눔</Link></li>
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
                                                <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/donalist'>기부</Link></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        ); break;
                case'myPage': sideList = (
                                        <ul>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/mypage/Info'>마이페이지</Link></li>
                                            <li onClick={(event)=>{HandleOpacity(event.target.id);}}><Link to='/service/notice'>고객센터</Link></li>
                                            <li></li>
                                        </ul>
                                        ); break;
                default : sideList = "";
        }
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
                        {mainList}
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