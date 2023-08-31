import CkEditor from "./OpenEditor";
import {useRef, useEffect} from 'react';

/** 공지사항 등록폼
-공지사항 등록하기 위한 경우 : 등록 버튼
-공지사항 수정하기 위한 경우 : 수정 버튼 */
const NoticeForm = () => {

    const submitBtn = useRef(null);
    const sendForm = (e) => {
        e.preventDefault();

        alert("submit");
    };

    useEffect(()=>{
        submitBtn.current.addEventLister('click', sendForm);

        return () => submitBtn.current.removeEventLister('click', sendForm);
    }, []);

    return(
        <form className="noticeForm">
            <div className="mb-3 row">
                <label for="noticeCategory" className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-7" id="noticeCategory">
                    <nav className="navbar navbar-expand-lg" id="notice-form-bar" style={{"backgroundColor": "transparent"}}>
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown dropdown-center dropend">
                                        <button className="nav-link dropdown-toggle btn-sm" type="button" id="notice-category-btn" name="notice-category" value="선택" 
                                                data-bs-toggle="dropdown" aria-expanded="false" style={{"border":"0.8px solid #344E41", "backgroundColor": "transparent", "color": "#344E41"}}>
                                            <span>선택</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-middle" id="notice-form-category-menu" style={{"textAlign": "center", "cursor":"pointer"}}>
                                            <li className="dropdown-item">안내</li>
                                            <li className="dropdown-item">재안내</li>
                                            <li className="dropdown-item">수정</li>
                                            <li className="dropdown-item">복구완료</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="row mb-3 noticeTitlePart">
              <label for="noticeTitle" className="col-sm-2 col-form-label">제목</label>
              <input type="text" className="form-control" id="noticeTitle"/>
            </div>
            
            <div className="mb-3 noticeContentPart">
                <label for="noticeContent" className="col-sm-2 col-form-label">내용</label><br />
                <div id="noticeContent" className="form-control" >
                    <CkEditor />
                </div>
            </div>
            <button type="submit" ref={submitBtn} className="btn">등록 / 수정</button>
        </form>
    );
};

export default NoticeForm;