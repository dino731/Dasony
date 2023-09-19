import { useParams, useNavigate, Navigate } from "react-router-dom";
import CkEditor from "./OpenEditor";
import {useRef, useEffect, useState} from 'react';
import axios from "axios";

/** 공지사항 등록폼
-공지사항 등록하기 위한 경우 : 등록 버튼
-공지사항 수정하기 위한 경우 : 수정 버튼 */
const NoticeForm = () => {
    
    const submitBtn = useRef(null);
    const [menu, setMenu] = useState([]);
    const [data, setData] = useState({});
    const dropdown = useRef(null);
    const navi = useNavigate();
    let btnStatus = "등록";
    let url = "http://localhost:3000/dasony/notice/";

    // 제출 버튼 변경
    const {no} = useParams();
    if(no > 0) {
        btnStatus = "수정";
        url += "modifyNotice/"+no;
    }else{
        url += "addNotice";
    }

    // editor에서 값 가져오기
    const [content, setContent] = useState("");

    // 서버로 데이터 전송
    // 내용은 4000byte이나 에러 발생시 내용 길이를 줄여볼 것
    const sendForm = (e) => {
        e.preventDefault();

        const title = document.querySelector("#noticeTitle").value;
        // console.log("지금 menu : ", menu);
        let menuStr = menu.toString();
        const data = {category: menuStr, title, content};
        // console.log("content : " , content);
        // console.log("menu str : ", menuStr);

        axios.post(url, data)
             .then(response => {
                let result = response.data;
                alert(result);

                if(result.includes("성공") || result.includes("수정")) navi(-1);
            }).catch(console.log);
    };

    /*
    공지 등록폼에서 선택한 분류 삭제 기능
    */  
    const selectCate = (e) => {
        if(menu.length<2){
            // console.log(e.target.innerText);
            // console.log([...menu, e.target.innerText]);
            const nowMenus = [...menu, e.target.innerText];
            setMenu(nowMenus);
        }
    };
    const noticeCateClose = (index) => {
        let menuCopy = [...menu];
        menuCopy.splice(index, 1);
        setMenu(menuCopy);
    };

    useEffect(()=>{
        // 수정 case인 경우 로딩
        if(no>0) {
            axios.get("http://localhost:3000/dasony/notice/noticeDetail/"+ no)
                .then(response => {
                    const res = response.data;
                    const getMenu = res.category.split(",");
                    // console.log(res);
                    setData(res);
                    setMenu([...getMenu]);
                    setContent(res.content);
                })
        }
    }, []);

    useEffect(()=>{
        submitBtn.current.addEventListener('click', sendForm);

        return () => {
            if(submitBtn.current != null) submitBtn.current.removeEventListener('click', sendForm);
        }
    },[content, data, menu]);

    useEffect(()=>{
        document.querySelectorAll(".dropdown-item").forEach(
            (item) => {
                    item.addEventListener('click', selectCate);
            }
        );

        // 값을 출력하는 곳에서 div + innerHtml로 태그 적용하여 내용 출력할 것
        // editContent.current.innerHTML = `${content}`;

        return () => {
            document.querySelectorAll(".dropdown-item").forEach(
                (item) => {
                        item.removeEventListener('click', selectCate);
                }
            );
        };
    }, [menu, data]);

    

    return(
        <form className="noticeForm">
            <div className="mb-3 row">
                <label htmlFor="noticeCategory" className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-7" id="noticeCategory">
                    <nav className="navbar navbar-expand-lg" id="notice-form-bar" style={{"backgroundColor": "transparent"}}>
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown" ref={dropdown}>
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
                                {menu.length!=0 && menu.map((value, index) => {
                                    return <span key={index} className="notice-category-choice notice-category-choice-item">
                                                {value}
                                                <i className="bi bi-x-circle notice-category-close notice-category-choice-item" onClick={()=> noticeCateClose(index)}></i>
                                            </span>;
                                })}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="row mb-3 noticeTitlePart">
              <label htmlFor="noticeTitle" className="col-sm-2 col-form-label">제목</label>
              <input type="text" className="form-control" id="noticeTitle" defaultValue={data!=null && data.title}/>
            </div>
            
            <div className="mb-3 noticeContentPart">
                <label htmlFor="noticeContent" className="col-sm-2 col-form-label">내용</label><br />
                <div id="noticeContent" className="form-control" style={{width: "100%", height: "100%"}}>
                    <CkEditor className="ck-editor" editContent={{content, setContent}} />
                </div>
            </div>
            <button type="submit" ref={submitBtn} className="btn btn-primary">{btnStatus}</button>
        </form>
    );
};

export default NoticeForm;