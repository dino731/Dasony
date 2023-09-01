import './event.css';
import { useRef, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

/**
     이벤트 등록 양식
    -이벤트 관리에서 사용
 */
export default () => {

    const navigate = useNavigate();

    let category;
    let status;
    let url;

    useEffect(() => {
        const handleLabelClick = (e) => {
            let optionList = e.target.parentNode.nextElementSibling ? e.target.parentNode.nextElementSibling : e.target.nextElementSibling;
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

        document.querySelectorAll(".manager-select-btn>div").forEach((el)=>{
            console.log(el);
            el.removeEventListener('click', handleLabelClick);
        });

        return () => {
            document.querySelectorAll(".manager-select-btn>div").forEach((el)=>{
                console.log(el);
                el.removeEventListener('click', handleLabelClick);
            });
        };
    }, []);

    const handleSelect = (target, item) => {
        target.firstChild.innerHTML = item.textContent;
        target.classList.remove('active');
      
        category = $(".event-selectBox span").eq(0).text();
        status = $(".event-selectBox span").eq(1).text();

        // url=`manageReception?category=${category}&status=${status}`;
		// navigate(url);
    };

    // 페이징바
    function moveReceptPage(page){
        category = $(".event-selectBox span").eq(0).text();
        status = $(".event-selectBox span").eq(1).text();

        // url=`#`;
        // navigate(url);
    }

    /** 이벤트 아이템 클릭시 해당 페이지로 이동 */
    const moveToEventDetail = no => {
        navigate(`/admin/event/detail/${no}`);
    };

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
                    <tr className="notice-item">
                        <th scope="row">2</th>
                        <td>문화</td>
                        <td className="text-cut" onClick={()=>moveToEventDetail(1)}>오펜하이머 관람표 증정 이벤트</td>
                        <td scope="row">2023-08-17</td>
                        <td scope="row">D-1</td>
                        <td scope="row" className="event-pm-button" onClick="sendMessage()"><span>작성</span></td>
                    </tr>
                    <tr className="notice-item">
                        <th scope="row">1</th>
                        <td>기타</td>
                        <td className="text-cut" onClick={()=>moveToEventDetail(1)}>8월 출석이벤트</td>
                        <td scope="row">2023-08-01</td>
                        <td scope="row">D-3</td>
                        <td scope="row" className="event-pm-button" onClick="sendMessage()"><span>작성</span></td>
                    </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            <button className="btn" onClick={()=>navigate("/admin/event/new")}>등록하기</button>
        </div>
    );
}