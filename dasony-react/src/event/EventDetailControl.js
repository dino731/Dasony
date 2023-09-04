import { useParams } from "react-router-dom";
import EventDetail from "./EventCommonDetail";
import LoginEvent08 from "./LoginEvent08";
import LoginEvent09 from "./LoginEvent09"

export default () => {
    const {no} = useParams();
    // no로 게시글 정보 조회 로직 필요
    const path = "LoginEvent09";

    // -> 페이지 경로가 있으면 해당 컴포넌트 호출 / 아니면 공통 양식으로
    if(path.length == 0) {
        return(
            <EventDetail data={no} />
        );
    }else{ // 정적 페이지를 다 컴포넌트화 -> 이벤트 정보 경로에서 파일명만 가져오기 -> 컴포넌트 이름 매핑 호출
        if(path === "LoginEvent08") return(<LoginEvent08 />);
        else if(path === "LoginEvent09") return(<LoginEvent09 />);
    }
    
}