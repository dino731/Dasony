import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './HomeSide.css';
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

const HomeSide = () => {
    {/*달력 보이기 설정 */}
    const [date, setDate] = useState(new Date());

    const [show, setShow] = useState('none');
    const handleClose = ()=> {setShow('none'); }
    const handleOpen = () => {setShow('block'); handleMyEvent(); clickDateStart();}
    const handleStyle = ()=>{
        if(show == 'none'){
            handleOpen();
            return;
        } else {
            handleClose();
        }
    }

    {/*달력 일정 추가 모달 보이기 설정 */}
    const [modalShow, setModalShow] = useState(false);
    const handleModalClose = ()=> {
        if(localEvent.cate!=''&& localEvent.dateEnd!='' &&localEvent.etc!=''
        && localEvent.dateStart!='' && localEvent.name!= '' && localEvent.location){
            setModalShow(false); 
            setLocalEventArray([...localEventArray, localEvent]);
            setLocalEvent({
                dateStart: "",
                dateEnd: "",
                name: "",
                location: "",
                etc: "",
                cate: ""
            });
        } else {
            alert('입력창을 모두 채워주세요.');
        }
    }
    const handleModalOpen = () => {setModalShow(true); }
    const handleModaloff = ()=>{
        setModalShow(false);
        setLocalEvent({
            dateStart: "",
            dateEnd: "",
            name: "",
            location: "",
            etc: "",
            cate: ""
        });
    }

    {/*달력 일정 추가 데이터 추가 */}
    const [localEvent, setLocalEvent]=useState({
                                                    dateStart: "",
                                                    dateEnd: "",
                                                    name: "",
                                                    location: "",
                                                    etc: "",
                                                    cate: ""
                                                });
    const [localEventArray, setLocalEventArray] = useState([]);
    const handleLocalEvent = (e) => {
        const { id, value } = e.target;
    
        
        let newDateStart = localEvent.dateStart;
        let newDateEnd = localEvent.dateEnd;
        let newName = localEvent.name;
        let newLocation = localEvent.location;
        let newEtc = localEvent.etc;
        let newCate = localEvent.cate;
    
        switch (id) {
            case 'event-date-start':
                newDateStart = value;
                break;
            case 'event-date-end':
                newDateEnd = value;
                break;
            case 'event-name':
                newName = value;
                break;
            case 'event-location':
                newLocation = value;
                break;
            case 'event-etc':
                newEtc = value;
                break;
            case 'event-cate':
                newCate = value;
                break;
            default:
                break;
        }
    
        const newEvent = {
            dateStart: newDateStart,
            dateEnd: newDateEnd,
            name: newName,
            location: newLocation,
            etc: newEtc,
            cate: newCate
        };
    
        setLocalEvent(newEvent);
    }

    {/*우리 지역 달력 창에 내가 신청한 내역 보이게 하기 */}
    const [myLocalEventDisplay, setMyLocalEventDisplay] = useState('');
    const handleMyEvent = ()=>{
        if(localEventArray.length!==0){
            setMyLocalEventDisplay('');
        } else {
            setMyLocalEventDisplay('none');
        }
    }
    useEffect(()=>{
        handleMyEvent();
    }, [localEventArray]);


    {/*달력 창 기간 인식 */}
    let clickStart = '';
    let clickEnd = '';
    const clickDateStart = () => {
        if(document.querySelector(".react-calendar__tile--rangeStart") != null &&
        document.querySelector(".react-calendar__tile--rangeEnd") != null){
            clickStart = document.querySelector(".react-calendar__tile--rangeStart")
                            .querySelector('abbr').ariaLabel
                            .replace(/년\s/gi,"-")
                            .replace(/월\s/gi, '-')
                            .replace(/일/gi, '');
            clickEnd = document.querySelector(".react-calendar__tile--rangeEnd")
                        .querySelector('abbr').ariaLabel
                        .replace(/년\s/gi,"-")
                        .replace(/월\s/gi, '-')
                        .replace(/일/gi, '');
            console.log(clickStart, clickEnd);
        }
        
    }
    return(
        <div className="calendar-container"  style={{textAlign:'right'}}>
            <Calendar 
                        onChange={setDate}
                        selectRange={true} />
            <Button className='calendar-detail-btn' onClick={handleOpen}>일정 확인</Button>

            <div className="calendar-detail-container" style={{display:show}} >
                <div><button onClick={handleStyle}>x</button></div>
                <div className="calendar-detail-box">
                    우리 지역 달력
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>날짜(기간)</th>
                                    <th>일정 이름</th>
                                    <th>장소</th>
                                    <th>특이 사항</th>
                                    <th>종류</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2023-10-20 ~ 2023-10-28</td>
                                    <td>화산 단풍축제</td>
                                    <td>화산</td>
                                    <td>등산화 필수</td>
                                    <td>축제</td>
                                </tr>
                            </tbody>
                            <tfoot style={{display:myLocalEventDisplay, width:'100%'}}>
                                <tr>
                                    <td colSpan={5} style={{height:'10vh'}}></td>
                                </tr>
                                <tr>
                                    <th colSpan={5}>
                                        내가 신청한 내역
                                    </th>
                                </tr>
                                <tr>
                                    <th>날짜(기간)</th>
                                    <th>일정 이름</th>
                                    <th>장소</th>
                                    <th>특이 사항</th>
                                    <th>종류</th>
                                </tr>
                                {
                                
                                localEventArray.map((le, index)=>{
                                    
                                            
                                        return (
                                            <tr key={index}>
                                                <td>{le.dateStart} ~ {le.dateEnd}</td>
                                                <td>{le.name}</td>
                                                <td>{le.location}</td>
                                                <td>{le.etc}</td>
                                                <td>{le.cate}</td>
                                            </tr>
                                        );
                                    
                                })}
                            </tfoot>
                        </table>
                        <div>
                            <button onClick={handleModalOpen}>일정 추가</button>
                            <Modal show={modalShow} onHide={handleModalClose}>
                                <ModalHeader>우리 지역 이벤트 추가</ModalHeader>
                                <ModalBody>
                                    <table className="modalTable">
                                        <thead>
                                            <tr>
                                                <th>날짜(기간)</th>
                                                <td>
                                                    <input id="event-date-start" onChange={handleLocalEvent} value={localEvent.dateStart} type="date"/>
                                                    {" "}~{" "}
                                                    <input id="event-date-end" onChange={handleLocalEvent} value={localEvent.dateEnd} type="date"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>일정 이름</th>
                                                <td>
                                                    <input id="event-name" onChange={handleLocalEvent} value={localEvent.name} type="text"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>장소</th>
                                                <td>
                                                    <input id="event-location" onChange={handleLocalEvent} value={localEvent.location} type="text"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>특이 사항</th>
                                                <td>
                                                    <input id="event-etc" onChange={handleLocalEvent} value={localEvent.etc} type="text"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>종류</th>
                                                <td>
                                                    <select id="event-cate" onChange={handleLocalEvent} value={localEvent.cate}>
                                                        <option>축제</option>
                                                        <option>공연</option>
                                                        <option>봉사</option>
                                                        <option>기타</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            
                                        </thead>
                                    </table>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="calendar-detail-btn" onClick={handleModaloff}>취소</button>
                                    <button className="calendar-detail-btn" onClick={handleModalClose}>확인</button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomeSide;

