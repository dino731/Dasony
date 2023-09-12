import { useLocation, useParams } from "react-router-dom";
import EventCommonDetail from "./EventCommonDetail";
import LoginEvent08 from "./LoginEvent08";
import LoginEvent09 from "./LoginEvent09"
import axios from "axios";
import { useEffect, useState } from "react";

export default () => {
    const {no} = useParams();
    // console.log(useLocation());
    let {state} = useLocation();
    // page = page.split(".")[0];
    if(state!=null && state.length != 0){
        state = state.slice(0, -3);
    }
    
    // const [data, setData] = useState([]);
    // no로 게시글 정보 조회 로직 필요
    // let path = "";
    // const [path, setPath] = useState("LoginEvent08");

    // const loadData = () => {
    //     axios.get(`http://localhost:3000/dasony/event/selectEvent?no=${no}`)
    //     .then((res)=>{
    //         console.log("event detail data : ",res.data);
    //         setData([res.data]);
    //     }).then(()=>{
    //         // page 연결
    //         let pagePath = data.pageLink.split(".")[0];
    //         console.log("js 경로 : ", pagePath);
    //         setPath(pagePath);
    //     })
    // };
    
    // useEffect(()=>{
    //     loadData();
    // }, []);

    // -> 페이지 경로가 있으면 해당 컴포넌트 호출 / 아니면 공통 양식으로
    if(state==null) {
        console.log("no : " + no);
        return(
            <EventCommonDetail no={no} />
        );
    }else{ // 정적 페이지를 다 컴포넌트화 -> 이벤트 정보 경로에서 파일명만 가져오기 -> 컴포넌트 이름 매핑 호출
        if(state === "LoginEvent08") return(<LoginEvent08 no={no}/>);
        else if(state === "LoginEvent09") return(<LoginEvent09 no={no} />);
    }
}