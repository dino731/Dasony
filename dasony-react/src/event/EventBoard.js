import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from '../common/Loading';
// import LoginCheck09 from '../../public/resources/event/login-003.png';

const EventBoard = () => {

    const item = useRef([]);
    // const hoverList = ["none", "none", "none", "none", "none"];
    let hoverList = [];
    const [hoverStatus, setHoverStatus] = useState(hoverList);
    const navigate = useNavigate();
    const [status, setStatus] = useState(true);
    // 화면에 출력할 data
    const [data, setData] = useState([]);
    const [eventStatus, setEventStatus] = useState("진행");

    // data loading
    const [loadStatus, setLoadStatus] = useState(false);

    const changeEventChoice = (e, target) => {
        const eventTarget = e.target;

        if(target==='li'){
            if(!eventTarget.classList.contains("selected-event-status")){
                eventTarget.classList.add("selected-event-status");
                eventTarget.querySelector(".bi").style.display = "inline-block";
                setEventStatus(eventTarget.querySelector("span").innerText);

                e.stopPropagation();

                const siblings = Array.from(eventTarget.parentNode.children).filter(sibling => sibling !== eventTarget);
                siblings.forEach(sibling => {
                    sibling.classList.remove("selected-event-status");
                    sibling.querySelector("i").style.display = "none";
                });
            }
        }else{
            let parent = eventTarget.parentNode.parentNode;
            // console.log(parent);
            e.stopPropagation(); // 이벤트 전파 방지
    
            if(!parent.classList.contains("selected-event-status")){
                parent.classList.add("selected-event-status");
                eventTarget.previousElementSibling.style.display = "inline-block";
                setEventStatus(parent.querySelector("span").innerText);

                const siblings = Array.from(parent.parentNode.children).filter(sibling => sibling != parent);
                siblings.forEach(sibling => {
                    sibling.classList.remove("selected-event-status");
                    sibling.querySelector("i").style.display = "none";
                });
            }
        }
    }

    /** 이벤트 아이템 클릭시 해당 페이지로 이동 */
    const moveToEventDetail = (no, page) => {
        // console.log("page : ", page);
        navigate(`/event/detail/${no}`, {state: page});
    };

    // data load
    const loadData = () => { 
        setLoadStatus(true);

        let eventStatus = document.querySelector(".selected-event-status span").innerText;
        
        const url = encodeURI(`http://localhost:3000/dasony/event/loadList?status=${eventStatus}`);

        // 비동기 요청
        axios.get(url).then((res)=>{
                console.log(res.data);
                // console.log(res.data[0].pageLink);
                setData(res.data);
                if(status) setStatus(false);
                
                hoverList = new Array(res.data.length).fill("none");
                setHoverStatus(hoverList);

                setLoadStatus(false);
            });
    }

    const dDayCount = (date) => {
        // 현재 날짜 - 종료일 날짜
        // console.log("date :: ", new Date(date) instanceof Date, new Date(date));
        const now = new Date().getTime();
        const end = new Date(date).getTime();
        if(now > end) return "종료";
        else{
            let diff = Math.abs(end - now);
            diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
            // console.log("날짜차이 : ", diff);
            return "D-"+diff;
        }
    }

    useEffect(()=>{
        loadData();
    }, [status, eventStatus]);
    
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

    },[status]);

    return(
        <>
            {loadStatus ? <div className="loadingContainer">
                            <Loading />
                        </div> : null}
            
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
                            <i className="bi bi-calendar-x" style={{"display": "none"}}></i>&nbsp;
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
                    {data!=null && data.length != 0 && data.map((ele, i) => {
                        return <div className="event-list-item" key={i}>
                                    <Link to={ele.pageLink? "/event/detail/"+ele.pageLink.slice(0, -3) : "/event/detail/" + ele.no}>
                                        <div className="event-item-wrapper event-load-page"
                                        style={{"backgroundImage": `url(${ele.thumbnail.includes('http') ? ele.thumbnail : 'http://localhost:3000/dasony/resources/images/event/' + ele.thumbnail})`}}>
                                            <div className="event-item-title-part">
                                                <div className="event-item-title">{ele.title}</div>
                                            </div>
                                            <div className="event-item-deadline">{dDayCount(ele.endDate)}</div>
                                        </div>
                                    </Link>
                                    {hoverStatus[i] === "hover"?<div className="event-item-effect" 
                                                        onClick={()=>moveToEventDetail(ele.no, ele.pageLink)}>
                                                                <div className="event-close">조회</div>
                                                                </div> : null}
                                </div>
                    })}

                </div>
            </div>
        </>
    );
};

export default EventBoard;