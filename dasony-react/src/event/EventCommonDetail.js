import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import axios from "axios";

/** 이벤트 상세조회 게시판 */
const EventDetail = ({no}) => { // EventNo 넘어옴
    // console.log(no);
    // const [data, setData] = useState([]);
    const [eventInfo, setEventInfo] = useState({});
    const [rewardInfo, setRewardInfo] = useState([]);
    const checkBtn = useRef(null);

    const textarea = useRef(null);
    const ticket = useRef(null);
    const ticketText = useRef(null);
    // const [eventDate, setEventDate] = useState([]);
    // const [status, setStatus] = useState(true);

    // url 이동
    const navigate = useNavigate();

    const [hoverStatus, setHoverStatus] = useState("none");

    // 아이콘 위에 내용 위치시키기 
    const updateTicketTextPosition = () => {
        if (ticket.current && ticketText.current) {
            const ticketRect = ticket.current.getBoundingClientRect();
            const ticketTextWidth = ticketText.current.offsetWidth; // offsetWidth / offsetHeight
            const ticketTextHeight = ticketText.current.offsetHeight;
            
            const centerX = ticketRect.left / 2.3 + ticketTextWidth/13; // 원래 ticketRect.left/2 + ... 였음
            const centerY = - ticketTextHeight * 2.2;

            ticketText.current.style.position = "relative";
            ticketText.current.style.left = centerX + "px";
            ticketText.current.style.top = centerY + "px";
        }
    };

    // data load
    const loadData = () => { 
        // 비동기 요청
        axios.get(`http://localhost:3000/dasony/event/selectEvent?no=${no}`)
            .then((res)=>{
                // console.log(res.data);
                setEventInfo(res.data.event);
                setRewardInfo(res.data.reward);
                console.log(res.data.reward);

                // textarea <br> -> enter
                if(res.data.event.content) textarea.current.value = res.data.event.content.replaceAll("<br>", "\r\n");
            });
    }

    const dateFormat = date => {
        date = new Date(date);
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

        return month + '월 ' + day + '일';
    };

    const moreEndDate = (date1) => {
        date1 = new Date(date1);
        const date2 = new Date();
        return date1.getFullYear() >= date2.getFullYear()
           && date1.getMonth() >= date2.getMonth()
           && date1.getDate() >= date2.getDate();
    };
      

    const changeDateFormat = (sDate, eDate, type) => {
        sDate = new Date(sDate);
        eDate = new Date(eDate);

        switch(type){
            case "header" : 
                sDate = sDate.toLocaleDateString().substring(5).replace(/\s/,'');
                eDate = eDate.toLocaleDateString().substring(5).replace(/\s/,'');
                return `${sDate} ~ ${eDate}`;
            case "body" :
                return dateFormat(sDate) + " ~ " + dateFormat(eDate);
        }
        
    };

    // 이벤트 참여
    const joinEvent = () => {
        const loginUserNo = localStorage.getItem("loginUserNo");
        // const loginUserNo = 23090754;
        const data = {eventNo: no, userNo: loginUserNo};
        console.log("param : ", data);
        axios.post("http://localhost:3000/dasony/event/join", data)
            .then(res => {
                const result = res.data;
                console.log("res : ", result);
                if(result.coin != null) alert(`${result.coin} 다손을 얻었습니다!`);
                alert(result.msg);
            }); 
    };

    useLayoutEffect(() => {
        loadData();
    }, []);
    
    useEffect(()=>{
        // 컴포넌트가 렌더링된 후 ticketText 위치 업데이트
        updateTicketTextPosition();
        // const text = "시사회 이벤트!!!<br>으악 보고싶음";
        // textarea.current.value = text.replaceAll("<br>", "\r\n");
    }, [eventInfo, rewardInfo]);

    return(
        <>
            <div className="back-to-event-list">
                <i className={`bi ${hoverStatus==="hover" ? "bi-arrow-left-circle-fill" : "bi-arrow-left-circle"}`}
                onMouseEnter={() => setHoverStatus("hover")} onMouseLeave={() => setHoverStatus("none")}
                onClick={()=>navigate(-1)}></i>
            </div>
            <div className="dasony-promotion dragging">
                <div className="promo-form-header" style={{ "backgroundImage": eventInfo.thumbnail != null ? `url('http://localhost:3000/dasony/resources/images/event/${eventInfo.thumbnail}')` : null }}>
                {/* 'https://dn-img-page.kakao.com/download/resource?kid=bpAeKz/hAd4wW3xd8/k9x3hD2NoVju7YY2QpONE1&filename=th3' */}
                    <div className="promo-form-info">
                        <h3>{eventInfo.title!=null ? eventInfo.title : null}</h3>
                        {/* <span>{data.constructor === Object && Object.keys(data).length !=0 && changeDateFormat(data.startDate, data.endDate)}</span> */}
                        <span>{eventInfo.startDate!=null ? changeDateFormat(eventInfo.startDate, eventInfo.endDate, "header") : null}</span>
                        <textarea ref={textarea} rows="3" readOnly></textarea>
                    </div>
                </div>
                <div className="promo-form-body">
                    {eventInfo.videoLink!=null? <div className="promo-media-part">
                                                    <iframe width="100%" height="315" src={eventInfo.videoLink} 
                                                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                                                    encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </div> : null}
                    

                    <div className="promo-reward-info">
                        {rewardInfo!=null && rewardInfo.length > 0 ? rewardInfo.map((reward, i) => {
                            return <div className="promo-reward-item" key={i}>
                                        <div className="promo-reward-name">
                                            <span>지금 응모하시면</span><br/>
                                            {reward.rewardName} ({reward.amount}명)
                                        </div>
                                        <i className="bi bi-ticket-fill" ref={ticket}></i>
                                        <div className="promo-icon-content" ref={ticketText}>
                                            <span>{reward.brand}</span><br/>
                                            ({reward.amount}명)
                                        </div>
                                    </div>
                        }) : null}
                        
                    </div>
                </div>
                <div className="promo-form-footer">
                    <div className="promo-form-notice">
                        <h3>이벤트 기간</h3>
                        <p>{eventInfo.startDate!=null ? changeDateFormat(eventInfo.startDate, eventInfo.endDate, "body") : null}</p>

                        <h3>당첨자 발표 및 상품 지급</h3>
                        <p>{eventInfo.winnerDate!=null ? dateFormat(eventInfo.winnerDate) : null} 개별 고지</p>
                    </div>
                    {eventInfo.detailLink!=null ? <div className="promo-more-detail">
                                                    <p>
                                                        자세한 내용을 알고 싶다면? <br/>
                                                        <i className="bi bi-hand-index"></i>
                                                    </p>
                                                    
                                                    {/* <button onClick={()=>{navigate(eventInfo.detailLink)}}>click!</button> */}
                                                    <Link to={eventInfo.detailLink}><button>click!</button></Link>
                                                </div> : null}
                    
                </div>
                {eventInfo.endDate != null && moreEndDate(eventInfo.endDate)? <div className="event-join-btn-part">
                                                                                    <div className="event-join-btn" ref={checkBtn} onClick={joinEvent}>
                                                                                        <strong>응모</strong>
                                                                                    </div>
                                                                               </div> : null}
                
            </div>
            
        </>
    );
};

export default EventDetail;