import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';

/** 이벤트 상세조회 게시판 */
const EventDetail = ({data}) => {
    // console.log(data);

    const textarea = useRef(null);
    const ticket = useRef(null);
    const ticketText = useRef(null);

    const [hoverStatus, setHoverStatus] = useState("none");

    // 아이콘 위에 내용 위치시키기 
    const updateTicketTextPosition = () => {
        if (ticket.current && ticketText.current) {
            const ticketRect = ticket.current.getBoundingClientRect();
            const ticketTextWidth = ticketText.current.offsetWidth; // offsetWidth / offsetHeight
            const ticketTextHeight = ticketText.current.offsetHeight;
            
            const centerX = ticketRect.left / 2 + ticketTextWidth/20;
            const centerY = - ticketTextHeight * 2;

            ticketText.current.style.position = "relative";
            ticketText.current.style.left = centerX + "px";
            ticketText.current.style.top = centerY + "px";
        }
    };

    // url 이동
    const navigate = useNavigate();

    useLayoutEffect(() => {
        // textarea <br> -> enter
        const text = "시사회 이벤트!!!<br>으악 보고싶음";
        textarea.current.value = text.replaceAll("<br>", "\r\n");
    }, []);
    
    useEffect(()=>{
        // 컴포넌트가 렌더링된 후 ticketText 위치 업데이트
        updateTicketTextPosition();
    });

    return(
        <>
            <div className="back-to-event-list">
                <i className={`bi ${hoverStatus==="hover" ? "bi-arrow-left-circle-fill" : "bi-arrow-left-circle"}`}
                onMouseEnter={() => setHoverStatus("hover")} onMouseLeave={() => setHoverStatus("none")}
                onClick={()=>navigate(-1)}></i>
            </div>

            <div className="dasony-promotion dragging">
                <div className="promo-form-header" style={{"backgroundImage": "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0niU5_-nJcGruRTitqp6LWLeP5Av8LnPWcJ4eUz8avZ9zpXb')"}}>
                    <div className="promo-form-info">
                        <h3>오펜하이머</h3>
                        <span>8. 26 ~ 9. 9</span>
                        <textarea ref={textarea} rows="3" readOnly></textarea>
                    </div>
                </div>
                <div className="promo-form-body">
                    <div className="promo-media-part">
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/oSqK_v6zPoM?si=gyhXH4W7Fs0HKcCY?autoplay=1&mute=1" 
                        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>

                    <div className="promo-reward-info">
                        <div className="promo-reward-item">
                            <div className="promo-reward-name">
                                <span>지금 응모하시면</span><br/>
                                오펜하이머 관람 티켓 (5명)
                            </div>
                            <i className="bi bi-ticket-fill" ref={ticket}></i>
                            <div className="promo-icon-content" ref={ticketText}>
                                <span>오펜하이머</span><br/>
                                (5명)
                            </div>
                        </div>
                    </div>
                </div>
                <div className="promo-form-footer">
                    <div className="promo-form-notice">
                        <h3>이벤트 기간</h3>
                        <p>8월 26일 ~ 9월 9일</p>

                        <h3>당첨자 발표 및 상품 지급</h3>
                        <p>9월 10일 개별 고지</p>
                    </div>

                    <div className="promo-more-detail">
                        <p>
                            자세한 내용을 알고 싶다면? <br/>
                            <i className="bi bi-hand-index"></i>
                        </p>
                        
                        <button onClick={()=>{navigate("#")}}>click!</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetail;