import {useParams, Link, useNavigate, useLocation} from 'react-router-dom';
import {useRef, useEffect} from 'react';

/** 공지사항 */
const NoticeDetail = () => {
    const no = useParams();
    // const {manager} = useLocation(); // managerNoticeBoard에서 넘긴 manager 유무 파라미터
    const textarea = useRef(null);
    const navigate = useNavigate();

    // no로 데이터 조회 로직 추가할 것 (이전, 이후 글 포함해 총 3개의 글)
    const list = [0, 1, null];

    /* 
        text를 출력하기 위한 함수
        -<br> -> \n
    */ 
    const testText = "안녕하세요<br>이것은 테스트 용 문구입니다<br><br>반갑습니다.";
    const inputText = (text) => {
        text = text.replaceAll("<br>", "\r\n");
        textarea.current.value = text;
    };

    useEffect(()=>{
        inputText(testText);
    }, []);

    return(
        <div className="notice-detail dragging">
            <div className="notice-title">
                <p>[안내] 개인정보보호법 개정안에 따른 휴면 정책 변경 안내</p>
                <span>2023-08-22</span>
            </div>
            <div className="notice-content">
                <textarea className="dragging" ref={textarea} readOnly></textarea>
            </div>
            <div className="notice-content-nav">
                {list[1] != null ? <div className="notice-content-nav-item prev">
                                        <span>이전</span>
                                        <Link to={`${no}-1`}>[안내] AI 키토크 검색 기능 종료 안내</Link>
                                    </div> : null
                }
                {list[2] != null ? <div className="notice-content-nav-item next">
                                        <span>다음</span>
                                        <Link to={`${no}+1`}>[안내] 개인정보처리방침 통합 안내</Link>
                                    </div> : null
                }
                
            </div>
            <button className="btn btn-outline-secondary" onClick={()=>navigate(-1)}>목록</button>
        </div>
    );
};

export default NoticeDetail;