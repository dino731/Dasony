import { useParams } from "react-router-dom";
import EventIframe from "./EventIframe";
import EventDetail from "./EventCommonDetail";

export default () => {
    const {no} = useParams();

    // no로 게시글 정보 조회 로직 필요
    if(no == 1) {
        return(
            <EventDetail data={no} />
        );
    }else{ // 정적 페이지를 다 컴포넌트화 -> 이벤트 정보 경로에서 파일명만 가져오기 -> 컴포넌트 이름 매핑 호출
        return(
            <EventIframe />
        );
    }
    
}