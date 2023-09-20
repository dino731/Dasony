import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Swal from "sweetalert2";
// import Img1 from '../../public/resources/event/login-001.png';
// import Img2 from '../../public/resources/event/login-002.png';

/**
    이벤트 상세조회 게시판
    -이벤트 내용 확인하는 페이지
    (정적 페이지 / 데이터 호출해 렌더링하는 페이지로 나뉨)
*/
const LoginEvent09 = ({no}) => {
    const checkBtn = useRef(null);
    const userNo = localStorage.getItem("loginUserNo");
    // 로그인한 회원 넘버
    // const userNo = 23090755;
    // 오늘 참여 여부
    const [tdyCheck, setTdyCheck] = useState(false);
    // 출석일
    const [count, setCount] = useState(1);
    // 종료일
    const [endDate, setEndDate] = useState(null);
    // 클릭한 상태
    const [checkStatus, setCheckStatus] = useState("none");
    const [userName, setUserName] = useState("");

    // 뒤로가기 버튼 
    const [hoverStatus, setHoverStatus] = useState("none");
    const navigate = useNavigate();

    // alert
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    // 정보 불러오기
    const loadData = () => {
        const data = {userNo : userNo, eventNo : no};
        // console.log("tdyCheck : ", tdyCheck, "eventNo : ", no);
        axios.post("http://localhost:3000/dasony/event/loadLogin", data)
            .then((res)=>{
                // console.log("data load : ", res.data);
                setUserName(res.data.userName);
                setCount(res.data.count);
                setEndDate(res.data.endDate);
                if(res.data.tdyCheck=='Y') setTdyCheck(true);
            });
    }

    // 로그인 참여
    const checkLogin = (e)=>{
        e. preventDefault();
        // const loginUserNo = (int)localStorage.getItem("loginUserNo");
        // console.log("tdyCheck : ", tdyCheck);
        // 로그인 했는지 유무 판단
        if(userNo === undefined || userNo.length == 0){
            Toast.fire({
                icon: "error",
                title: "로그인을 해주세요."
            });

            // alert("로그인을 해주세요.");
            return;
        }
        
        if(!tdyCheck){
            const data = {eventNo: no, loginUserNo: userNo};
            let url = "http://localhost:3000/dasony/event/loginCheck";
            axios.post(url, data)
            .then(res => {
                const result = res.data;

                if(result.num>0){
                    setEndDate(result.endDate);
                    setCount(count+1);
                    setCheckStatus("checked");
                    setTdyCheck(true);
                    // if(result.coin!=null) Toast.fire({icon: "success", title: `${result.coin} 다손을 얻었습니다!`});
                        // alert(`${result.coin} 다손을 얻었습니다!`);
                }
                Toast.fire({
                    icon: "success",
                    title: result.msg,
                    text: result.coin!=null? `${result.coin} 다손을 얻었습니다!` : null
                });
            });
        }        
    };

    const moreEndDate = (date1) => {
        date1 = new Date(date1);
        const date2 = new Date();
        return date1.getFullYear() >= date2.getFullYear()
           && date1.getMonth() >= date2.getMonth()
           && date1.getDate() >= date2.getDate();
    };

    useEffect(()=>{
        loadData()
    }, []);

    useEffect(()=>{
        const btn = checkBtn.current;
        // console.log(btn);

        if(btn != null){
            // 오늘자 출석 여부에 따라 커서 스타일 변경
            if(!tdyCheck) btn.style.cursor = "pointer";
            else {
                btn.style.cursor = "default";
                if(btn.querySelector("i")!=null) btn.querySelector("i").style.cursor = "default";
            }
        }
    }, [count, endDate, checkStatus, tdyCheck]);

    useEffect(() => {
        const btn = checkBtn.current;
        if(btn != null){
            // 출석 버튼 누를시 발생할 이벤트
            btn.addEventListener('click', checkLogin);

            return () => btn.removeEventListener('click', checkLogin);
        }
    }, [count, endDate, tdyCheck, checkStatus]);

    useEffect(()=>{
        // checkStatus가 "checked"로 변경될 때 타이머를 설정하여 다시 "none"으로 변경
        if (checkStatus === "checked" && checkBtn.current!=null) {
            const timer = setTimeout(() => {
                setCheckStatus("none");
            }, 3000);

            // 타이머가 설정된 useEffect가 다시 호출될 때 타이머를 해제
            return () => clearTimeout(timer);
        }
    }, [checkStatus]);


    return(
        <>
            <div className="back-to-event-list">
                <i className={`bi ${hoverStatus==="hover" ? "bi-arrow-left-circle-fill" : "bi-arrow-left-circle"}`}
                onMouseEnter={() => setHoverStatus("hover")} onMouseLeave={() => setHoverStatus("none")}
                onClick={()=>navigate(-1)}></i>
            </div>

            <div className="dasony-promotion dragging">
                <div className="promo-header">
                    <img src='/resources/event/login-001.png' alt="출석 이벤트"/>
                    <div className="login-check-promo-count">
                        <div className="login-check-promo-count-content" style={{bottom: "20%", border: "2px solid #cba597", color: "#d1afa2"}}>
                            <p>
                                <strong>{userName}님</strong> 반갑습니다<br/>
                                오늘도 출석체크하고 선물 받아볼까요?
                            </p>
                            <h4>현재까지 누적 출석일</h4>
                            <em><strong>{count}</strong>/<strong>31</strong></em>
                        </div>
                    </div>
                </div>
                {/* 출석하기 버튼 만들것 */}
                {endDate!=null && moreEndDate(endDate)? <div className="promo-body" style={{backgroundColor: "#401E12", width: "100%"}}>
                                                            <div className="login-check-btn-part">
                                                                <div className="login-check-btn" ref={checkBtn} style={{border: "2px solid #BF926B"}}>
                                                                    {checkStatus === "checked" ? <i className="bi bi-check-lg"></i> : <strong style={{ color: "cba597"}}>출석하기</strong>}
                                                                </div>
                                                            </div>
                                                            <img src='/resources/event/login-002.png' alt="출석 상품" style={{width: "100%"}}/>
                                                        </div> : null}
                <div className="promo-footer">
                    <div className="promo-notice" style={{padding: "10% 5%"}}>
                        <h3>알려드려요</h3>
                        <ul>
                            <li>- 이벤트 기간 : 8/1(화) ~ 8/31(목)</li>
                            <li>- 본 이벤트는 로그인한 유저만 참여 가능합니다.</li>
                            <li>- 본 이벤트는 마케팅 수신 동의자에 한해 참여 가능합니다.</li>
                            <li>- 출석 버튼을 눌러야 출석이 인정됩니다.</li>
                            <li>- 본 이벤트는 당사 사정에 따라 사전 예고 없이 변경되거나 취소될 수 있습니다.</li>
                            <li>- 출석은 하루에 최대 1번만 인정됩니다.</li>

                            <li>[출석 선물 안내]
                                <ul>
                                    <li>
                                        - 이벤트 기간 내 15일 이상 출석하면 추첨을 통해 15 명에게 ‘화이트스텐 텀블러’를 드립니다. (9/1~5일 중 당첨자 별도 안내)
                                    </li>
                                    <li>
                                        - 이벤트 기간 내 누적 출석일이 31일인 경우 추첨을 통해 50명에게 1만 다손을 드립니다.
                                        (1인 1회, 9/1 푸시로 지급)
                                    </li>
                                    <li>
                                        - 실제 경품은 상기 이미지와 다를 수 있으며 당사 사정에 따라 다른 품목으로 변경될 수 있습니다.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginEvent09;