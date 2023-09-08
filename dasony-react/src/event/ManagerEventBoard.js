import './event.css';
import { useRef, useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

/**
     이벤트 등록 양식
    -이벤트 관리에서 사용
 */
export default () => {

    const navigate = useNavigate();
    const modalBtn = useRef(null);
    let modalCate = "선택";

    // let category = "";
    // let status = "";
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    // 화면에 출력할 data
    const [data, setData] = useState([]);
    
    // function for loading data
    function loadData(){ // 매개변수로 page 번호 추가 필요
        let cate = $(".event-selectBox>div>div>span").eq(0).text();
        let stat = $(".event-selectBox>div>div>span").eq(1).text();
        setCategory(cate);
        setStatus(stat);
        const url = encodeURI(`http://localhost:3000/dasony/event/loadList?category=${cate}&status=${stat}`);

        // 비동기 요청
        axios.get(url).then((res)=>{
                console.log(res.data);
                setData(res.data);
            });
    }

    /** 이벤트 아이템 클릭시 해당 페이지로 이동 */
    const moveToEventDetail = (no) => {
        navigate(`/admin/event/detail/` + no);
    };

    // 회원에게 쪽지 보내기 이벤트
    const sendMessage = () => {
        const content = document.querySelector(".message-modal-text").value;

        if(modalCate === "선택") alert("카테고리를 선택해주세요.");
        else if(content.length == 0) alert("보낼 내용을 입력해주세요.");
        else{
            axios.post(`http://localhost:3000/dasony/event/sendMsg/${data.no}`, {modalCate, content})
                .then((res)=>{
                    // modal 닫기
                    $("#message-modal").hide();
                    $(".modal-backdrop").hide();

                    const msg = res>0? "쪽지를 보냈습니다." : "다시 시도해주세요.";
                    alert(`${modalCate}에게 ${msg}`);
                });
        }
    }; 

    // 드랍다운 선택 이벤트 
    const handleSelect = (target, item) => {
        target.firstChild.innerHTML = item.textContent;
        target.classList.remove('active');
      
        // category = $(".event-selectBox span").eq(0).text();
        // status = $(".event-selectBox span").eq(1).text();

        if(target.classList.contains("modal-select")) { // 모달인 경우
            console.log(target + " / " + item.textContent);
            modalCate = item.textContent;
        }

        loadData();
    };

    const handleLabelClick = (e) => {
        let optionList = e.target.parentNode.nextElementSibling ? e.target.parentNode.nextElementSibling 
                        : e.target.nextElementSibling;
        let optionItems = optionList.querySelectorAll('.manager-select-optionItem');
        clickLabel(e.target, optionItems);
    };

    const clickLabel = (lb, optionItems) => {
        const target = lb.parentNode.classList.contains('manager-select-btn') ? lb : lb.parentNode;
        if (target.classList.contains('active')) {
            target.classList.remove('active');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', handleSelect);
            });
        } else {
            target.classList.add('active');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleSelect(target, opt);
                });
            });
        }
    };

    const dDayCount = (date) => {
        // 현재 날짜 - 종료일 날짜
        // console.log("date :: ", new Date(date) instanceof Date, new Date(date));
        const now = new Date().getTime();
        const end = new Date(date).getTime();
        if(now > end) return "종료";
        else{
            let diff = Math.abs(end - now);
            diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
            console.log("날짜차이 : ", diff);
            return "D-"+diff;
        }
    }

    useEffect(()=>{
        loadData();
    }, []);
    
    useEffect(() => {
        document.querySelectorAll(".manager-select-btn>div").forEach((el)=>{
            el.addEventListener('click', handleLabelClick);
        });

        return () => {
            document.querySelectorAll(".manager-select-btn>div").forEach((el)=>{
                el.removeEventListener('click', handleLabelClick);
            });
        };
    }, [data]);

    return(
        <div className="event-manager-board dragging">
            <div className="mb-3 row">
                <div className="event-category-selectBoxList">
                    <div className="event-selectBox">
                        <span>분류</span>
                        <div className="manager-select-btn">
                            <div> 
                                <span className="manager-select-label">카테고리</span>
                                <i className="bi bi-caret-down-fill"></i>
                            </div>
                            <ul className="manager-select-optionList">
                                <li className="manager-select-optionItem">문화</li>
                                <li className="manager-select-optionItem">스토어</li>
                                <li className="manager-select-optionItem">포인트</li>
                                <li className="manager-select-optionItem">기타</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="event-selectBox">
                        <span style={{width: "50%"}}>진행상태</span>
                        <div className="manager-select-btn">
                            <div>
                                <span className="manager-select-label">선택</span>
                                <i className="bi bi-caret-down-fill"></i>
                            </div>
                            <ul className="manager-select-optionList">
                                <li className="manager-select-optionItem">진행</li>
                                <li className="manager-select-optionItem">종료</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* * 이벤트 리스트에 필요한 것 : 이벤트 번호, 분류, 제목, 등록일, 남은일, 쪽지 발송 */}
            <table className="table" style={{"tableLayout":"fixed"}}>
                <thead>
                    <tr>
                        <th scope="col" width="5%;">No</th>
                        <th scope="col" width="10%;">카테고리</th>
                        <th scope="col" width="25%;">제목</th>
                        <th scope="col" width="10%;">등록일</th>
                        <th scope="col" width="7%;">종료일</th>
                        <th scope="col" width="8%;">쪽지</th>
                    </tr>
                </thead>
                <tbody>
                    {data!=null && data.length != 0 ? data.map((element, index) => {
                        return  <tr className="notice-item" key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{element.category}</td>
                                    <td className="text-cut" onClick={()=>moveToEventDetail(element.no)}>
                                        {element.title}
                                    </td>
                                    <td scope="row">{element.uploadDate}</td>
                                    <td scope="row">{dDayCount(element.endDate)}</td>
                                    <td scope="row" className="event-pm-button">
                                        <span type="button" data-bs-toggle="modal" data-bs-target="#message-modal">작성</span>
                                    </td>
                                </tr>
                    }) : null}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            <button className="btn" onClick={()=>navigate("/admin/event/new")}>등록하기</button>

            {/* Modal */}
            <div className="modal fade" id="message-modal" data-bs-backdrop="static" data-bs-keyboard="false" 
                tabIndex="-1" aria-labelledby="messageBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="messageBackdropLabel">쪽지 작성</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="event-category-selectBoxList">
                                <div className="event-selectBox">
                                    <span>대상자</span>
                                    <div className="manager-select-btn">
                                        <div className='modal-select'> 
                                            <span className="manager-select-label">{modalCate}</span>
                                            <i className="bi bi-caret-down-fill"></i>
                                        </div>
                                        <ul className="manager-select-optionList">
                                            <li className="manager-select-optionItem">전체</li>
                                            <li className="manager-select-optionItem">당첨자</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <input type='text' className='message-modal-text' placeholder='보낼 내용을 입력해주세요.' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" ref={modalBtn} onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}