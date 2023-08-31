import {useEffect, useNavigate, useOutletContext} from 'react-router-dom';
import {useLayoutEffect} from 'react';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from 'react-window-infinite-loader';

/** 
    공지사항 목록 게시판
    - 스크롤 감지하여 다음 내용 출력 이벤트 부여되어 있음
 */
const NoticeBoard = () => {
    const { data } = useOutletContext();
    console.log(data);
    const navigate = useNavigate();

    const Row = ({ index, style }) => (
        <div className="row justify-content-md-center">
            <div className="col col-3">
                [수정][안내]
            </div>
            <div className="col col-9 notice-board-title" onClick={()=>navigate("#")}>
                레전드패스 서비스 종료 안내{index}
            </div>
        </div>
    );

    return (
        <div className="notice-content dragging">
            <div className="row justify-content-md-center">
                <div className="col col-3">
                    카테고리
                </div>
                <div className="col col-9">
                    제목
                </div>
            </div>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            className='notice-content-body'
                            height={height}
                            itemCount={data.length || 0}
                            itemSize={50}
                            width={width}>
                            {Row}
                        </List>
                    )}
                </AutoSizer>
        </div>
    );
};

export default NoticeBoard;