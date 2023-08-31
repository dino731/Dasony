import {useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';

/** 공지사항 관리 게시판 */
const ManagerNoticeBoard = () => {
    const navigate = useNavigate();
    const btn = useRef(null);
    const keyword = useRef(null);
    const [selectedStatus, setSelectedStatus] = useState("선택");

    useEffect(()=>{
        // table 내 공지 제목 중 너비 넘기는 문자열 ... 처리
        const noticeTitle = document.querySelectorAll(".text-cut");
        noticeTitle.style = {"maxWidth" : `${noticeTitle.innerWidth}px`};
        
        return () => noticeTitle.style.maxWidth = '';
    }, []);

    /*
        공지사항 관리 
        -분류 선택시 키워드 입력창 띄우기
        -공지글 제목 선택시 해당 글로 이동
    */
    function selectCategory(item){
        setSelectedStatus(item);

        // input 띄우기
        keyword.current.style.display = "block";
    };

    const moveToNoticeDetail = no => {
        navigate(`/notice/detail/${no}`, {manager : "Y"});
    };

    function updateNotice(action, no){
        if(action === '수정') navigate('/notice/modify/' + no);
        else navigate('/notice/modify/' + no); // 삭제 처리하는 로직 추가
    }

    return(
        <>
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
                <tr className="notice-item">
                    <th scope="row">2</th>
                    <td>[안내] [재수정]</td>
                    <td className="text-cut" onClick={()=>moveToNoticeDetail(1)}>개인정보보호법 개정안에 따른 휴면 정책 변경 안내</td>
                    <td scope="row">2023-07-21</td>
                    <td scope="row">2023-08-21</td>
                    <td scope="row" className="notice-edit-button" onClick={()=>updateNotice('수정', 1)}><span>수정</span></td>
                    <td scope="row" className="notice-edit-button" onclick={()=>updateNotice('삭제', 1)}><span>삭제</span></td>
                </tr>
                <tr className="notice-item">
                    <th scope="row">1</th>
                    <td>[안내]</td>
                    <td className="text-cut" onClick={()=>moveToNoticeDetail(2)}>나도모름</td>
                    <td scope="row">2023-05-21</td>
                    <td scope="row">2023-06-21</td>
                    <td scope="row" className="notice-edit-button" onClick={()=>updateNotice('수정', 2)}><span>수정</span></td>
                    <td scope="row" className="notice-edit-button" onClick={()=>updateNotice('삭제', 2)}><span>삭제</span></td>
                </tr>
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
                                <li className="dropdown-item" onClick={()=>selectCategory("전체")}>전체</li>
                                <li className="dropdown-item" onClick={()=>selectCategory("제목")}>제목</li>
                                <li className="dropdown-item" onClick={()=>selectCategory("내용")}>내용</li>
                                <li className="dropdown-item" onClick={()=>selectCategory("제목 및 내용")}>제목 및 내용</li>
                            </ul>
                        </li>
                    </ul>
                    <input type="text" id="notice-search-keyword" ref={keyword} maxLength="5" placeholder="검색어입력"/>
                    <button className="notice-search-enter btn" onClick={() => {navigate("/notice/upload")}}>등록하기</button>
                </div>
            </div>
        </nav>
        </>
    );
};

export default ManagerNoticeBoard;