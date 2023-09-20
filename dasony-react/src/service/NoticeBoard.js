import {useEffect, useNavigate, useOutletContext} from 'react-router-dom';
import { Link } from 'react-router-dom';
/** 
    공지사항 목록 게시판
    - 스크롤 감지하여 다음 내용 출력 이벤트 부여되어 있음
 */
const NoticeBoard = ({context}) => {
    // const {data} = useOutletContext();
    const data = context.data;
    const navigate = useNavigate();
    // console.log("Board : ",data);
    
    return(
        <>
            <div className='goToReception'>
                <Link to={'./mypageReception'}><button className='btn'>문의하기</button></Link>
            </div>
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
        </>
    );
};

export default NoticeBoard;