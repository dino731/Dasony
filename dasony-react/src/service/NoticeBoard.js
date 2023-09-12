import {useEffect, useNavigate, useOutletContext} from 'react-router-dom';

/** 
    공지사항 목록 게시판
    - 스크롤 감지하여 다음 내용 출력 이벤트 부여되어 있음
 */
const NoticeBoard = ({context}) => {
    // const {data} = useOutletContext();
    const data = context.data;
    const navigate = useNavigate();
    console.log("Board : ",data);
    
    return(
        <div className="notice-content dragging">
            <div className="row justify-content-md-center">
                <div className="col col-3">
                    카테고리
                </div>
                <div className="col col-9">
                    제목
                </div>
            </div>
            <div className="notice-content-body">
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("detail/1")}>
                        개인정보보호법 개정안에 따른 휴먼 정책 변경 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        카카오페이지 원스토어 앱 출시 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title"  onClick={()=>navigate("#")}>
                        AI 키토크 검색 기능 종료 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [안내]
                    </div>
                    <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                        개인정보처리방침 통합 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [복구완료]
                    </div>
                    <div className="col col-9 notice-board-title">
                        카카오페이 결제 서비스 장애 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [수정]
                    </div>
                    <div className="col col-9 notice-board-title">
                        구글 인앱 결제 서비스 장애 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [수정][안내]
                    </div>
                    <div className="col col-9 notice-board-title">
                        레전드패스 서비스 종료 안내
                    </div>
                </div>
        
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [복구완료]
                    </div>
                    <div className="col col-9 notice-board-title">
                        카카오페이 결제 서비스 장애 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [수정]
                    </div>
                    <div className="col col-9 notice-board-title">
                        구글 인앱 결제 서비스 장애 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [수정][안내]
                    </div>
                    <div className="col col-9 notice-board-title">
                        레전드패스 서비스 종료 안내
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-3">
                        [여기가 끝]
                    </div>
                    <div className="col col-9 notice-board-title">
                        레전드패스 서비스 종료 안내
                    </div>
                </div>
                {data!=null && data.length != 0 ? data.map((element, index) => {
                    return  <div className='row justify-content-md-center' key={index}>
                                <div className="col col-3">
                                    {element.category.split(",").map((c, index) => (
                                        <span key={index}>[{c}] </span>
                                    ))}
                                </div>
                                <div className="col col-9 notice-board-title" onClick={()=>navigate(`detail/${element.no}`)}>
                                    {element.title}
                                </div>
                            </div>
                }) : null}
            </div>
        </div>
    );
};

export default NoticeBoard;