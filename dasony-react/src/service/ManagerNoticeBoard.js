import {useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Loading from '../common/Loading';

/** 공지사항 관리 게시판 */
const ManagerNoticeBoard = () => {
    const navigate = useNavigate();
    const btn = useRef(null);
    const keywordBtn = useRef(null);
    const [selectedStatus, setSelectedStatus] = useState("선택");
    const [data, setData] = useState([]);
    const [loadStatus, setLoadStatus] = useState(false);

    const loadData = (keyword) => {
        const url = encodeURI('http://localhost:3000/dasony/notice/loadList');
        const searchParams = {category: selectedStatus, keyword: keyword};
        setLoadStatus(true);
        axios.post(url, searchParams)
             .then((res) => {
                const response = res.data;
                setData(response);
                setLoadStatus(false);
             })
    };

    const enter = (e) => {
        if(e.keyCode == 13){
            let keyword = keywordBtn.current.value;
            loadData(keyword);
        }
    };

    useEffect(()=>{
        loadData();

        return loadData();
    },[]);

    useEffect(()=>{
        // table 내 공지 제목 중 너비 넘기는 문자열 ... 처리
        const noticeTitle = document.querySelectorAll(".text-cut");
        noticeTitle.style = {"maxWidth" : `${noticeTitle.innerWidth}px`};
        
        return () => noticeTitle.style.maxWidth = '';
    }, [data]);

    /*
        공지사항 관리 
        -분류 선택시 키워드 입력창 띄우기
        -공지글 제목 선택시 해당 글로 이동
    */
    function selectCategory(item){
        setSelectedStatus(item);

        // input 띄우기
        keywordBtn.current.style.display = "block";
    };

    const moveToNoticeDetail = no => {
        navigate(`detail/${no}`, {manager : "Y"});
    };

    function updateNotice(action, no, nowIndex){
        if(action === '수정') navigate('edit/' + no);
        else {
            if(window.confirm("정말 삭제하시겠습니까?")) {
                axios.get("http://localhost:3000/dasony/notice/delete/"+no)
                    .then(res => {
                        alert(res.data.msg);

                        if(res.data.result>0){
                            // const afterData = data;
                            // afterData.splice(nowIndex, 1);
                            // setData(afterData);
                            loadData();
                        };
                    })
            }

            // 삭제 처리하는 로직 추가
            // navigate(-2);
        }
    }

    return(
        <>
            {loadStatus ? <Loading /> : null}
            <table className="table" style={{"tableLayout":"fixed"}}>
            <thead>
                <tr>
                    <th scope="col" width="5%;">No</th>
                    <th scope="col" width="17%;">카테고리</th>
                    <th scope="col" width="25%;">제목</th>
                    <th scope="col" width="10%;">등록일</th>
                    <th scope="col" width="10%;">최종 수정일</th>
                    <th scope="col" width="8%;"></th>
                    <th scope="col" width="8%;"></th>
                </tr>
            </thead>
            <tbody>
                {/* 공지 리스트에 필요한 것 : rownum (공지번호글X), 카테고리( [안내] ), 제목, 등록일, 최종 수정일 */}
                {data.length!=0 && data.map((notice, index)=>{
                    return <tr className="notice-item" key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{notice.category!=null && notice.category!="" && notice.category.split(",").map((c, i) => (
                                        <span key={i}>[{c}] </span>
                                    ))}
                                </td>
                                <td className="text-cut" onClick={()=>moveToNoticeDetail(notice.no)}>{notice.title}</td>
                                <td scope="row">{notice.writeDate}</td>
                                <td scope="row">{notice.modifyDate}</td>
                                <td scope="row" className="notice-edit-button" onClick={()=>updateNotice('수정', notice.no, index)}><span>수정</span></td>
                                <td scope="row" className="notice-edit-button" onClick={()=>updateNotice('삭제', notice.no, index)}><span>삭제</span></td>
                            </tr>;
                })}
            </tbody>
            <tfoot>
            </tfoot>
        </table>

        <nav className="navbar navbar-expand-lg" id="notice-search-bar" style={{"backgroundColor": "transparent"}}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown dropdown-center dropend">
                            <button className="nav-link dropdown-toggle btn-sm" type="button" id="notice-category-btn" name="notice-category"
                                 value={selectedStatus} data-bs-toggle="dropdown" aria-expanded="false" style={{"border": "0.8px solid #344E41", 
                                        "backgroundColor": "transparent", "color": "#344E41"}} ref={btn}>
                                <span>{selectedStatus}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-middle" id="notice-search-category-menu" style={{"textAlign": "center", "cursor": "pointer"}}>
                                {/* <li className="dropdown-item" onClick={()=>selectCategory("전체")}>전체</li> */}
                                <li className="dropdown-item" onClick={()=>selectCategory("제목")}>제목</li>
                                <li className="dropdown-item" onClick={()=>selectCategory("내용")}>내용</li>
                                <li className="dropdown-item" onClick={()=>selectCategory("제목 및 내용")}>제목 및 내용</li>
                            </ul>
                        </li>
                    </ul>
                    <input type="text" id="notice-search-keyword" ref={keywordBtn} maxLength="5" placeholder="검색어입력"
                        onKeyDown={enter}/>
                    <button className="notice-search-enter btn" onClick={() => {navigate("new")}}>등록하기</button>
                </div>
            </div>
        </nav>
        </>
    );
};

export default ManagerNoticeBoard;