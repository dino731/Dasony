import axios from 'axios';
import './event.css';
import { useRef, useEffect, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
    
/** 
    이벤트 등록 양식
    -이벤트 관리에서 사용 
*/
export default ({editStatus}) => {
    const {no} = useParams();
    const [data, setData] = useState({});
    const [eventInfo, setEventInfo] = useState({});
    const [rewardInfo, setRewardInfo] = useState({});
    // selectbox 리스트
    const clickList = useRef([]);
    const paramList = useRef([]);
    // 소개글 파트
    const content = useRef(null);
    const navigate = useNavigate();
    const [newItem, setNewItem] = useState([false, false]);

    // 새로운 상품 등록 폼 value 관리
    const [rewardForms, setRewardForms] = useState([{rank: '', category: '', rewardRange: '', brand: '', 
                                                        name: '', amount: ''}]);

    /** dropbox 선택 이벤트 */
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

    const handleSelect = (target, item) => {
        target.firstChild.innerHTML = item.textContent;
        target.classList.remove('active');
      
        // url=`manageReception?category=${category}&status=${status}`;
		// navigate(url);
    };

    /** 이벤트 등록폼에서 썸네일 선택시 발생하는 이벤트 */
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

        container.onload= () => {
            URL.revokeObjectURL(file); 
        };
    };

    /** 아코디언 아이콘 변화 이벤트 */ 
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

    /** 상품 등록 추가 이벤트 */
    const addRewardItem = (index) => {
        let statusCopy = [...newItem];
        statusCopy[index] = true;
        setNewItem([...statusCopy]);
    };

    const getInputIdData = (name) => {
        return document.querySelector(`#${name}`);
    };

    const getInputClassData = (name) => {
        let test = document.querySelectorAll(`.${name}`);
        return test;
    }

    /** 데이터 로딩 */
    const loadData = () => {
        if(no.length != 0){
            axios.get(`http://localhost:3000/dasony/event/selectEvent?no=${no}`)
                .then((res)=>{
                    console.log("data : ", res.data);
                    // setData(data);
                    setEventInfo(res.data.event);
                    setRewardInfo(res.data.reward);

                    setRewardForms(prevState => 
                            [...prevState, {rank: rewardInfo.rank, category: rewardInfo.category, 
                                rewardRange: rewardInfo.rewardRange, brand: rewardInfo.brand, 
                                name: rewardInfo.name, amount: rewardInfo.amount}]);
                });
        }
    }

    /** 폼 제출 */
    // 분류, 당첨 방식, 이벤트명, 소개글, 썸네일, 기간, 당첨자 발표일, 상품 순위, 상품 타입, 추천 범위, 
    // 상품명, 브랜드, 개수, 영상 링크, 상세 링크, 페이지 링크 => 넘길 항목
    const uploadForm = () => {
        // 데이터 선언
        const formData = {no, title : getInputIdData("event-title").value, content: getInputIdData("event-content").value, 
                        startDate: getInputIdData("start-date").value, endDate: getInputIdData("end-date").value, 
                        winnerDate: getInputIdData("win-date").value, 
                        thumbFile: getInputIdData("eventThumbnailFile").files[0], 
                        videoLink: getInputIdData("video-link").value, detailLink: getInputIdData("detail-link").value, 
                        pageLink: getInputIdData("page-link").value, 
                        eventCategory : paramList.current[0].innerText, 
                        winTime : paramList.current[1].innerText,
                        rank: Array.from(getInputClassData("rank")).map(ele => { return ele.innerText}),
                        rewardCategory: Array.from(getInputClassData("rewardCategory")).map(ele => { return ele.innerText}), 
                        rewardRange: Array.from(getInputClassData("rewardRange")).map(ele => { return ele.innerText}), 
                        rewardName: Array.from(getInputClassData("rewardName")).map(ele => { return ele.value}), 
                        brand: Array.from(getInputClassData("brand")).map(ele => {return ele.value}), 
                        amount: Array.from(getInputClassData("amount")).map(ele => {return ele.value}), 
                        rewardNo: rewardInfo.rewardNo?rewardInfo.rewardNo:null};

        const fillList = ["title", "startDate", "endDate", "winnerDate", "thumbFile", "eventCategory", 
                            "winTime", "rank", "rewardCategory", "rewardRange", "rewardName", "brand", "amount"];
        
        for(let fill of fillList){
            let target = formData[fill];
            if(target === null || target === undefined || target==="" || target.length==0 || target.innerText ==="선택"){
                alert("필수 항목을 다 채워 주세요.");
                return;
            }
        }

        // multi type으로 전송
        const form = new FormData();
        Object.entries(formData).forEach(item => {
            form.append(item[0], item[1]);
            console.log("key : ", item[0], "val : ", item[1]);
        });

        const url = editStatus==="등록" ? "uploadEvent" : `updateEvent/{no}`;
        axios.post("http://localhost:3000/dasony/event/" + url,
                    form)
            .then((res)=>{
                alert(res.data);
                navigate("/admin/event");
            });
    };

    

    const readImageFile = () => {
        const container = document.getElementById('event-image-show');
        container.innerHTML = "";

        const newImage = document.createElement("img");
        newImage.setAttribute("class", 'event-img');

        axios.get('https://www.business2community.com/wp-content/uploads/2014/04/Free.jpg')
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                newImage.src = URL.createObjectURL('/resources/event/login-002.png'); 
            });
    };

    useEffect(()=>{
        if(no) loadData();
    }, []);

    useEffect(() => {
        // selectBox 선택 이벤트 (js 파일로 분리 시도해볼 것)
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
            if(clickList.current!=null){
                clickList.current.forEach((el) => {
                    if(el!=null) el.removeEventListener('click', handleLabelClick);
                });
            }
            
            if(content.current!=null){
                content.current.removeEventListener('keydown', (e)=>{
                    const val = e.target.value;
                    const rows = val.split('\n').length;
                    const maxRows = 2;
                    if(rows>maxRows){
                        const modifiedText = val.split('\n').slice(0, maxRows);
                        e.target.value = modifiedText.join('\n');
                    }
                });
            }
            
        };
    }, [eventInfo, rewardInfo, newItem]);
    
    
    return(
        <div className="event-form dragging">
            <div className="mb-3 row">
                <div className="event-category-selectBoxList">
                    <div className="event-selectBox">
                        <span>분류 <span style={{color: "red"}}>*</span></span>
                        <div className="manager-select-btn">
                            <div ref={el => clickList.current[0] = el}>
                                <span className="manager-select-label" ref={el => paramList.current[0] = el}>
                                    {no!=null ? eventInfo.category : "선택"}
                                </span>
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
                        <span style={{width: "50%"}}>당첨 안내 방식 <span style={{color: "red"}}>*</span></span>
                        <div className="manager-select-btn">
                            <div ref={el => clickList.current[1] = el}>
                                <span className="manager-select-label"  ref={el => paramList.current[1] = el}>
                                    {no!=null ? eventInfo.winTime : "선택"}
                                </span>
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
                        <label htmlFor="event-title" className="col-form-label" >이벤트명 <span style={{color: "red"}}>*</span></label>
                        <input type="text" id="event-title" className="form-control" defaultValue={eventInfo.title}/>
                    </div>
                        
                    <div className="mb-4 event-content-part event-form-part">
                        <label htmlFor="event-content" className="col-form-label">소개글</label>
                        <textarea ref={content} id="event-content" className="form-control" defaultValue={eventInfo.content}
                             placeholder="간략하게 이벤트 문구를 작성해주세요."></textarea>
                    </div>
                </div>
                <div className="event-thumbnail-container">
                    <div className="event-image-show" id="event-image-show"></div>
            
                    <div className="event-image-upload" id="event-image-upload">
                        <div className="button">
                            <label htmlFor="eventThumbnailFile">
                                썸네일 추가하기 <span style={{color: "red"}}>*</span>
                            </label>
                        </div>
                        <input type="file" id="eventThumbnailFile" name="eventThumbnailFile" accept="image/*" 
                        onChange={loadEventImage}/>
                    </div>
                </div>
            </div>

            <div className="mb-4 event-title-part event-form-part event-date-wrapper">
              <label className="col-form-label">기간 <span style={{color: "red"}}>*</span></label>
              <div>
                  <input type="date" id="start-date" className="form-control event-date" defaultValue={eventInfo.startDate}/> <strong>&nbsp;-&nbsp;</strong>
                  <input type="date" id="end-date" className="form-control event-date" defaultValue={eventInfo.endDate}/>
              </div>
            </div>
            <div className="mb-4 event-title-part event-form-part event-date-wrapper">
               <label className="col-form-label">당첨자 발표일 <span style={{color: "red"}}>*</span></label>
               <input type="date" id="win-date" className="form-control event-date" defaultValue={eventInfo.winnerDate}/>
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
                        <div className='event-reward-item rewardNo' 
                            value={no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].rewardNo : 0}>
                            <div className="event-category-selectBoxList">
                                <div className="event-selectBox">
                                    <span>순위 <span style={{color: "red"}}>*</span></span>
                                    <div className="manager-select-btn">
                                        <div ref={el => clickList.current[2] = el}>
                                            <span className="manager-select-label rank" ref={el => paramList.current[2] = el}>
                                                {no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].rank :"선택"}
                                            </span>
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
                                    <span style={{width: "50%"}}>상품 타입 <span style={{color: "red"}}>*</span></span>
                                    <div className="manager-select-btn">
                                        <div ref={el => clickList.current[3] = el}>
                                            <span className="manager-select-label category" ref={el => paramList.current[3] = el}>
                                                {no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].category :"선택"}
                                            </span>
                                            <i className="bi bi-caret-down-fill"></i>
                                        </div>
                                        <ul className="manager-select-optionList">
                                            <li className="manager-select-optionItem">포인트</li>
                                            <li className="manager-select-optionItem">쿠폰</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="event-selectBox">
                                    <span style={{width: "50%"}}>추첨 범위 <span style={{color: "red"}}>*</span></span>
                                    <div className="manager-select-btn">
                                        <div ref={el => clickList.current[4] = el}>
                                            <span className="manager-select-label rewardRange" ref={el => paramList.current[4] = el}>
                                                {no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].rewardRange :"선택"}
                                            </span>
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
                                    <label className="col-form-label">브랜드 <span style={{color: "red"}}>*</span></label>
                                    <input 
                                        type="text" 
                                        className="form-control brand"
                                        defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].brand : ""}
                                    />
                                </div>
                                <div className="mb-4 event-form-part">
                                    <label className="col-form-label">상품명 <span style={{color: "red"}}>*</span></label>
                                    <input 
                                        type="text" 
                                        className="form-control rewardName"
                                        defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].name : ""} 
                                    />
                                </div>
                                <div className="mb-4 event-form-part">
                                    <label className="col-form-label">당첨자수 <span style={{color: "red"}}>*</span></label>
                                    <input 
                                        type="number"   onChange={()=>addRewardItem(0)}
                                        className="form-control amount"
                                        defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[0].amount : ""}
                                    />
                                </div>
                            </div>
                        </div>
                        {newItem[0] && <div className='event-reward-item'>
                                                <div className="event-category-selectBoxList">
                                                    <div className="event-selectBox">
                                                        <span>순위</span>
                                                        <div className="manager-select-btn">
                                                            <div ref={el => clickList.current[5] = el}>
                                                                <span className="manager-select-label rank" ref={el => paramList.current[5] = el}>
                                                                    {no!=null && Array.isArray(rewardInfo) ? rewardInfo[1].rank :"선택"}
                                                                </span>
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
                                                            <div ref={el => clickList.current[6] = el}>
                                                                <span className="manager-select-label category" ref={el => paramList.current[6] = el}>
                                                                    {no!=null && Array.isArray(rewardInfo) ? rewardInfo[1].category :"선택"}
                                                                </span>
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
                                                            <div ref={el => clickList.current[7] = el}>
                                                                <span className="manager-select-label rewardRange" ref={el => paramList.current[7] = el}>
                                                                    {no!=null && Array.isArray(rewardInfo) ? rewardInfo[1].rewardRange :"선택"}
                                                                </span>
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
                                                        <input 
                                                            type="text" 
                                                            className="form-control brand"
                                                            defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[1].brand : ""}
                                                        />
                                                    </div>
                                                    <div className="mb-4 event-form-part">
                                                        <label className="col-form-label">상품명</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control rewardName"
                                                            defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[1].name : ""} 
                                                        />
                                                    </div>
                                                    <div className="mb-4 event-form-part">
                                                        <label className="col-form-label" >당첨자수</label>
                                                        <input 
                                                            type="number" 
                                                            onChange={()=>addRewardItem(1)}
                                                            className="form-control amount"
                                                            defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[1].amount : ""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>}
                        {newItem[1] && <div className='event-reward-item'>
                                                <div className="event-category-selectBoxList">
                                                    <div className="event-selectBox">
                                                        <span>순위</span>
                                                        <div className="manager-select-btn">
                                                            <div ref={el => clickList.current[8] = el}>
                                                                <span className="manager-select-label rank" ref={el => paramList.current[8] = el}>
                                                                    {no!=null && Array.isArray(rewardInfo) ? rewardInfo[2].rank :"선택"}
                                                                </span>
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
                                                            <div ref={el => clickList.current[9] = el}>
                                                                <span className="manager-select-label category" ref={el => paramList.current[9] = el}>
                                                                    {no!=null && Array.isArray(rewardInfo) ? rewardInfo[2].category :"선택"}
                                                                </span>
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
                                                            <div ref={el => clickList.current[10] = el}>
                                                                <span className="manager-select-label rewardRange" ref={el => paramList.current[10] = el}>
                                                                    {no!=null && Array.isArray(rewardInfo) ? rewardInfo[2].rewardRange :"선택"}
                                                                </span>
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
                                                        <input 
                                                            type="text" 
                                                            className="form-control brand"
                                                            defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[2].brand : ""}
                                                        />
                                                    </div>
                                                    <div className="mb-4 event-form-part">
                                                        <label className="col-form-label">상품명</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control rewardName"
                                                            defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[2].name : ""} 
                                                        />
                                                    </div>
                                                    <div className="mb-4 event-form-part">
                                                        <label className="col-form-label">당첨자수</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control amount"
                                                            defaultValue={no!=null && Array.isArray(rewardInfo) ? rewardInfo[2].amount : ""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>}
                        
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
                            <input type="text" id="video-link" className="form-control" defaultValue={eventInfo.videoLink}/>
                        </div>
                        <div className="mb-4 event-form-part">
                            <label className="col-form-label">안내 링크</label>
                            <input type="text" id="detail-link" className="form-control" defaultValue={eventInfo.detailLink}/>
                        </div>
                        <div className="mb-4 event-form-part">
                            <label className="col-form-label">페이지 주소</label>
                            <input type="text" className="form-control" placeholder="해당 이벤트 페이지 경로를 입력"
                                defaultValue={eventInfo.pageLink} id="page-link"/>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            <button type="submit" className="btn" onClick={uploadForm}>{editStatus}</button>
            {1===1 && editStatus == '등록' ? <button type="submit" className="btn">초기화</button> : <button type="submit" className="btn">삭제</button>}
        </div>
    );
}