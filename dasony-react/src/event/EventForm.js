import './event.css';
import { useRef, useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
    
/** 
    이벤트 등록 양식
    -이벤트 관리에서 사용 
*/
export default ({editStatus}) => {
    const clickList = useRef([]);
    const paramList = useRef([]);
    const content = useRef(null);
    const navigate = useNavigate();

    let category;
    let status;
    let url;

    useEffect(() => {
        // selectBox 선택 이벤트 (js 파일로 분리 시도해볼 것)
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

        clickList.current.forEach((el, index) => {
            el.addEventListener('click', handleLabelClick);
        });

        // 소개글 row 제한
        content.current.addEventListener('keydown', (e)=>{
            const val = e.target.value;
            const rows = val.split('\n').length;
            const maxRows = 2;
            if(rows>maxRows){
                const modifiedText = val.split('\n').slice(0, maxRows);
                e.target.value = modifiedText.join('\n');
            }
        });

        return () => {
            clickList.current.forEach((el) => {
                el.removeEventListener('click', handleLabelClick);
            });
        };
    }, []);

    const handleSelect = (target, item) => {
        target.firstChild.innerHTML = item.textContent;
        target.classList.remove('active');
      
        category = paramList.current[0].innerText;
        status = paramList.current[1].innerText;

        // url=`manageReception?category=${category}&status=${status}`;
		// navigate(url);
    };

    // 페이징바
    function moveReceptPage(page){
        // category = $(".event-selectBox span").eq(0).text();
        // status = $(".event-selectBox span").eq(1).text();

        // url=`#`;
        // navigate(url);
    }

    /* 이벤트 등록폼에서 썸네일 선택시 발생하는 이벤트 */
    function loadEventImage(input) {
        const container = document.getElementById('event-image-show');
        container.innerHTML = "";

        const file = input.target.files[0];
        const newImage = document.createElement("img");
        newImage.setAttribute("class", 'event-img');

        newImage.src = URL.createObjectURL(file);   

        // newImage.style.width = "70%";
        // newImage.style.height = "70%";
        // newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지 숨기기
        newImage.style.objectFit = "contain";

        container.appendChild(newImage);
    };

    // 아코디언 아이콘 변화 이벤트
    let eventBtnDeg = [0, 0];
            
    function changeBtnDeg(num){
        const target = document.querySelector(`#eventAccordion${num} .bi`);
        if(eventBtnDeg[--num] === 0){
            eventBtnDeg[num]+=45;
            target.style.transform = `rotate(${eventBtnDeg[num]}deg)`;
        }else{
            eventBtnDeg[num]-=45;
            target.style.transform = `rotate(${eventBtnDeg[num]}deg)`;
        }
    }
    
    return(
        <div className="event-form dragging">
            <div className="mb-3 row">
                <div className="event-category-selectBoxList">
                    <div className="event-selectBox">
                        <span>분류</span>
                        <div className="manager-select-btn">
                            <div ref={el => clickList.current[0] = el}>
                                <span className="manager-select-label" ref={el => paramList.current[0] = el}>분류</span>
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
                        <span style={{width: "50%"}}>당첨 안내 방식</span>
                        <div className="manager-select-btn">
                            <div ref={el => clickList.current[1] = el}>
                                <span className="manager-select-label"  ref={el => paramList.current[1] = el}>선택</span>
                                <i className="bi bi-caret-down-fill"></i>
                            </div>
                            <ul className="manager-select-optionList">
                                <li className="manager-select-optionItem">추후</li>
                                <li className="manager-select-optionItem">즉시</li>
                                <li className="manager-select-optionItem">복합</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-2 event-info">
                <div className="event-title-content">
                    <div className="mb-4 event-title-part event-form-part">
                        <label htmlFor="event-title" className="col-form-label">이벤트명</label>
                        <input type="text" id="event-title" className="form-control"/>
                    </div>
                        
                    <div className="mb-4 event-content-part event-form-part">
                        <label htmlFor="event-content" className="col-form-label">소개글</label>
                        <textarea ref={content} id="event-content" className="form-control" placeholder="간략하게 이벤트 문구를 작성해주세요."></textarea>
                    </div>
                </div>
                <div className="event-thumbnail-container">
                    <div className="event-image-show" id="event-image-show"></div>
            
                    <div className="event-image-upload" id="event-image-upload">
                        <div className="button">
                            <label htmlFor="eventThumbnailFile">
                                썸네일 추가하기
                            </label>
                        </div>
                        <input type="file" id="eventThumbnailFile" name="eventThumbnailFile" accept="image/*" 
                        onChange={loadEventImage}/>
                    </div>
                </div>
            </div>

            <div className="mb-4 event-title-part event-form-part event-date-wrapper">
              <label className="col-form-label">기간</label>
              <div>
                  <input type="date" className="form-control event-date"/> <strong>&nbsp;-&nbsp;</strong>
                  <input type="date" className="form-control event-date"/>
              </div>
            </div>
            <div className="mb-4 event-title-part event-form-part event-date-wrapper">
               <label className="col-form-label">당첨자 발표일</label>
               <input type="date" className="form-control event-date"/>
            </div>
            
            <div className="accordion event-accordion" id="eventAccordion1">
                <div className="accordion-item event-form-part">
                  <h2 className="accordion-header" id="eventAccordionBtn1">
                    <div className="btn event-accordion-open" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                             aria-controls="collapseOne" onClick={()=>changeBtnDeg(1)}>
                            상품 등록
                            <i className="bi bi-plus-circle" style={{display: "inline-block"}}></i>
                    </div>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="eventAccordionBtn1" 
                  data-bs-parent="#eventAccordion1">
                    <div className="accordion-body">
                        <div className="event-category-selectBoxList">
                            <div className="event-selectBox">
                                <span>순위</span>
                                <div className="manager-select-btn">
                                    <div ref={el => clickList.current[2] = el}>
                                        <span className="manager-select-label" ref={el => paramList.current[2] = el}>선택</span>
                                        <i className="bi bi-caret-down-fill"></i>
                                    </div>
                                    <ul className="manager-select-optionList">
                                        <li className="manager-select-optionItem">0</li>
                                        <li className="manager-select-optionItem">1</li>
                                        <li className="manager-select-optionItem">2</li>
                                        <li className="manager-select-optionItem">3</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="event-selectBox">
                                <span style={{width: "50%"}}>상품 타입</span>
                                <div className="manager-select-btn">
                                    <div ref={el => clickList.current[3] = el}>
                                        <span className="manager-select-label" ref={el => paramList.current[3] = el}>선택</span>
                                        <i className="bi bi-caret-down-fill"></i>
                                    </div>
                                    <ul className="manager-select-optionList">
                                        <li className="manager-select-optionItem">포인트</li>
                                        <li className="manager-select-optionItem">쿠폰</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="event-selectBox">
                                <span style={{width: "50%"}}>추첨 범위</span>
                                <div className="manager-select-btn">
                                    <div ref={el => clickList.current[4] = el}>
                                        <span className="manager-select-label" ref={el => paramList.current[4] = el}>선택</span>
                                        <i className="bi bi-caret-down-fill"></i>
                                    </div>
                                    <ul className="manager-select-optionList">
                                        <li className="manager-select-optionItem">전체</li>
                                        <li className="manager-select-optionItem">일부</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="event-reward-detail">
                            <div className="mb-4 event-form-part">
                                <label className="col-form-label">브랜드</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="mb-4 event-form-part">
                                <label className="col-form-label">상품명</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="mb-4 event-form-part">
                                <label className="col-form-label">당첨자수</label>
                                <input type="number" className="form-control"/>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="accordion event-accordion" id="eventAccordion2">
                <div className="accordion-item event-form-part">
                  <h2 className="accordion-header" id="eventAccordionBtn2">
                    <div className="btn event-accordion-open" data-bs-toggle="collapse" data-bs-target="#collapseTwo" 
                        aria-expanded="false" aria-controls="collapseTwo" onClick={()=>changeBtnDeg(2)}>
                             링크 첨부
                        <i className="bi bi-plus-circle" style={{display: "inline-block"}}></i>
                    </div>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse " aria-labelledby="eventAccordionBtn2" 
                  data-bs-parent="#eventAccordion2">
                    <div className="accordion-body">
                        <div className="mb-4 event-form-part">
                            <label className="col-form-label">영상 링크</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-4 event-form-part">
                            <label className="col-form-label">안내 링크</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-4 event-form-part">
                            <label className="col-form-label">페이지 주소</label>
                            <input type="text" className="form-control" placeholder="해당 이벤트 페이지 경로를 입력"/>
                        </div>
                    </div>
                  </div>
                </div>
            </div>

            <button type="submit" className="btn">{editStatus}</button>
            {1===1 && editStatus == '등록' ? <button type="submit" className="btn">초기화</button> : <button type="submit" className="btn">삭제</button>}
            
        </div>
    );
}