import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import LoginCheck09 from '../../public/resources/event/login-003.png';

const EventBoard = () => {

    const item = useRef([]);
    const hoverList = ["none", "none", "none", "none", "none"];
    const [hoverStatus, setHoverStatus] = useState(hoverList);
    const navigate = useNavigate();

    const changeEventChoice = (e, target) => {
        const eventTarget = e.target;

        if(target==='li'){
            if(!eventTarget.classList.contains("selected-event-status")){
                eventTarget.classList.add("selected-event-status");
                eventTarget.querySelector(".bi").style.display = "inline-block";
                e.stopPropagation();

                const siblings = Array.from(eventTarget.parentNode.children).filter(sibling => sibling !== eventTarget);
                siblings.forEach(sibling => {
                    sibling.classList.remove("selected-event-status");
                    sibling.querySelector("i").style.display = "none";
                });
            }
        }else{
            let parent = eventTarget.parentNode.parentNode;
            console.log(parent);
            e.stopPropagation(); // 이벤트 전파 방지
    
            if(!parent.classList.contains("selected-event-status")){
                parent.classList.add("selected-event-status");
                eventTarget.previousElementSibling.style.display = "inline-block";

                const siblings = Array.from(parent.parentNode.children).filter(sibling => sibling != parent);
                siblings.forEach(sibling => {
                    sibling.classList.remove("selected-event-status");
                    sibling.querySelector("i").style.display = "none";
                });
            }
        }
    }

    /** 이벤트 아이템 클릭시 해당 페이지로 이동 */
    const moveToEventDetail = no => {
        navigate(`/event/detail/${no}`)
    };
    
    useEffect(()=>{
        /** 이벤트 유형 선택 효과 부여 및 제거 */
        item.current.forEach(element => {
            element.addEventListener('click', (e) => changeEventChoice(e, "li"));
            
            element.querySelector(".event-status span").addEventListener('click', (e) => {
                changeEventChoice(e, "span");
            });
        });
        
        /** 이벤트 아이템에  hover시 조회 유도 화면으로 전환 */
        document.querySelectorAll(".event-list-item").forEach((el, index)=>{
            el.addEventListener("mouseover", () => {
                hoverStatus[index] = "hover";
                setHoverStatus([...hoverStatus]);
            });
            el.addEventListener("mouseout", () => {
                hoverStatus[index] = "none";
                setHoverStatus([...hoverStatus]);
            });
        });

    },[]);

    return(
        <>
            <div className="event-status-part dragging">
                <ul className="event-status-list">
                    <li className="selected-event-status" ref={(el) => item.current[0] = el}> 
                        <div className="event-status">
                            <i className="bi bi-stars"></i>
                            <span>진행중인 이벤트</span>
                        </div>
                    </li>
                    <li  ref={(el) => item.current[1] = el}>
                        <div className="event-status">
                            <i className="bi bi-calendar-x" style={{"display": "none"}}></i>
                            <span>종료된 이벤트</span>
                        </div>
                    </li>
                </ul>
            </div>

                {/* 
                    event-load-page : 이벤트 페이지를 로드
                    (event-page : 이벤트 정보를 불러와 폼 양식에 맞춰 로드) 
                */}
            <div className="event-content-part">
                <div className="event-list">
                    <div className="event-list-item">
                        <Link to="/event/detail/1">
                            <div className="event-item-wrapper event-load-page"
                            style={{"backgroundImage" : "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0niU5_-nJcGruRTitqp6LWLeP5Av8LnPWcJ4eUz8avZ9zpXb)"}}>
                                <div className="event-item-title-part">
                                    <div className="event-item-title">오펜하이머 티켓 증정 이벤트!</div>
                                </div>
                                <div className="event-item-deadline">D-5</div>
                            </div>
                        </Link>
                        {hoverStatus[0] === "hover"?<div className="event-item-effect" onClick={()=>moveToEventDetail(1)}>
                                                      <div className="event-close">조회</div>
                                                    </div> : null}
                    </div>
                    <div className="event-list-item">
                        <Link to="https://page.kakao.com/event/6740582111a14fcf6b4c9913a4c22f73">
                            <div className="event-item-wrapper event-load-page">
                                <div className="event-item-title-part">
                                    <div className="event-item-title">출.석.이벤트입니다 많은 참여!!</div>
                                </div>
                                <div className="event-item-deadline">D-1</div>
                            </div>
                        </Link>
                        {hoverStatus[1] === "hover"?<div className="event-item-effect" onClick={()=>moveToEventDetail(1)}>
                                                      <div className="event-close">조회</div>
                                                    </div> : null}
                    </div>
                    <div className="event-list-item">
                        <Link to="/event/detail/1">
                            <div className="event-item-wrapper event-load-page"
                            style={{backgroundImage: "url('./resources/event/login-003.png')"}}>
                                <div className="event-item-title-part">
                                    <div className="event-item-title">9월 출석 이벤트 참여하고 선물받자</div>
                                </div>
                                <div className="event-item-deadline">D-1</div>
                            </div>
                        </Link>
                        {hoverStatus[2] === "hover"?<div className="event-item-effect" onClick={()=>moveToEventDetail(1)}>
                                                      <div className="event-close">조회</div>
                                                    </div> : null}
                    </div>
                    <div className="event-list-item event-close-list-item">
                        <Link to="/event/detail/1">
                            <div className="event-item-wrapper event-load-page">
                                <div className="event-item-title-part">
                                    <div className="event-item-title">출.석.이벤트입니다 많은 참여!!</div>
                                </div>
                            </div>
                        </Link>
                        {hoverStatus[3] === "hover"?<div className="event-item-effect" onClick={()=>moveToEventDetail(1)}>
                                                      <div className="event-close">조회</div>
                                                    </div> : null}
                    </div>
                    <div className="event-list-item">
                        <Link to="/event/detail/1">
                            <div className="event-item-wrapper event-load-page">
                                <div className="event-item-title-part">
                                    <div className="event-item-title">출.석.이벤트입니다 많은 참여!!</div>
                                </div>
                                <div className="event-item-deadline">D-1</div>
                            </div>
                        </Link>
                        {hoverStatus[4] === "hover"?<div className="event-item-effect" onClick={()=>moveToEventDetail(1)}>
                                                      <div className="event-close">조회</div>
                                                    </div> : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventBoard;