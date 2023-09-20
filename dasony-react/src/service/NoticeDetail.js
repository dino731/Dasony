import {useParams, Link, useNavigate, useLocation} from 'react-router-dom';
import {useRef, useEffect, useState} from 'react';
import axios from 'axios';

/** 공지사항 */
const NoticeDetail = () => {
    const {no} = useParams();
    const [data, setData] = useState([]); // [현재글, 이전글, 다음글] 정보가 담긴 배열
    // const {manager} = useLocation(); // managerNoticeBoard에서 넘긴 manager 유무 파라미터
    const textarea = useRef(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const mainPath = pathname.split('/').slice(0, -2).join("/");
    // console.log(mainPath);

    // no로 데이터 조회 로직 추가할 것 (이전, 이후 글 포함해 총 3개의 글)
    // const list = [0, 1, null];

    /* 
        text를 출력하기 위한 함수
        -<br> -> \n
    */ 
    const testText = "안녕하세요<br>이것은 테스트 용 문구입니다<br><br>반갑습니다.";
    const inputText = () => {
        if(data[1] && data[1].content){
            // const text = data[1].content.replaceAll("<br>", "\r\n");
            textarea.current.innerHTML = data[1].content;
        }
    };

    useEffect(()=>{
        // console.log("no " + no);
        axios.get("http://localhost:3000/dasony/notice/noticeDetailList/"+no)
            .then(response => {
                const res = response.data;
                // console.log(res, res[1].content);
                setData(res);
            });

            // console.log("data[1]", data[1], "context : " + data[1].content);
            // const content = data[1].content;
            // inputText(content);
    }, []);

    useEffect(()=>{
        inputText();

        return inputText();
    }, [data]);

    return(
        <div className="notice-detail dragging">
            <div className="notice-title">
                <p>{data[1]!=null && data[1].category.split(",").map((c, i) => (
                                <span key={i}>[{c}]</span>))} {data[1]!=null && data[1].title}</p>
                <span>{data[1]!=null && data[1].writeDate}</span>
            </div>
            <div className="notice-content">
                {/* <textarea className="dragging" ref={textarea} readOnly></textarea> */}
                <div className='dragging text-part' ref={textarea}></div> 
            </div>
            <div className="notice-content-nav">
                {data[0] != null ? <div className="notice-content-nav-item prev">
                                        <span>이전</span>
                                        <Link to={`${mainPath}/detail/${data[0].no}`}>
                                            {data[0]!=null && data[0].category.split(",").map((c, i) => (
                                                <span key={i}>[{c}]</span>))} {data[0]!=null && data[0].title}
                                        </Link>
                                    </div> : null
                }
                {data[2] != null ? <div className="notice-content-nav-item next">
                                        <span>다음</span>
                                        <Link to={`${mainPath}/detail/${data[2].no}`}>
                                            {data[2]!=null && data[2].category.split(",").map((c, i) => (
                                                <span key={i}>[{c}]</span>))} {data[2]!=null && data[2].title}
                                        </Link>
                                    </div> : null
                }
                
            </div>
            <button className="btn btn-outline-secondary" onClick={()=>navigate(mainPath)}>목록</button>
        </div>
    );
};

export default NoticeDetail;