import { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation} from 'react-router-dom';
import Loading from '../common/Loading';
import './customer.css';
import NoticeBoard from './NoticeBoard';

const Notice = () => {
    const { pathname } = useLocation();
    const subPath = pathname.split('/');
    const scrollTarget = useRef(null);
    const [data, setData] = useState([{no: 1, title: "초기값", cate: "안내"}]);
    const [loadStatus, setLoadStatus] = useState(false);
    
    const loadData = () => {
        const newData = [{no: "N0001", title: "개인정보보호법 개정안에 따른 휴먼 정책 변경 안내", cate: "안내, 재수정"}, 
                            {no: "N0002", title: "카카오페이지 원스토어 앱 출시 안내", cate: "안내"}, 
                            {no: "N0003", title: "개인정보처리방침 통합 안내", cate: "안내"},
                            {no: "N0004", title: "구글 인앱 결제 서비스 장애 안내", cate: '수정'},
                            {no: "N0002", title: "카카오페이지 원스토어 앱 출시 안내", cate: "안내"}, 
                            {no: "N0003", title: "개인정보처리방침 통합 안내", cate: "안내"},
                            {no: "N0004", title: "구글 인앱 결제 서비스 장애 안내", cate: '수정'},
                            {no: "N0002", title: "카카오페이지 원스토어 앱 출시 안내", cate: "안내"}, 
                            {no: "N0003", title: "개인정보처리방침 통합 안내", cate: "안내"},
                            {no: "N0004", title: "구글 인앱 결제 서비스 장애 안내", cate: '수정'},
                            {no: "N0002", title: "카카오페이지 원스토어 앱 출시 안내", cate: "안내"}, 
                            {no: "N0003", title: "개인정보처리방침 통합 안내", cate: "안내"},
                            {no: "N0004", title: "구글 인앱 결제 서비스 장애 안내", cate: '수정'}];

        setData([...data, ...newData]);
        setLoadStatus(false);
    };

    
    useEffect(()=>{
        // observer
        // notice/list 경로인 경우에만
        if(subPath[subPath.length-1]==="notice"){
            // 관찰할 item 요소
            const items = document.querySelectorAll(".notice-content-body .row");
            console.log(items.length);

            const callback = (entries, observer) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        observer.unobserve(entry.target);
                        if(!loadStatus) {
                            setLoadStatus(true);

                            // 비동기 구현시 setTimeout 지울 것
                            setTimeout(() => {
                                loadData();
                                console.log(loadStatus);
                                // observeLastItem(observer, document.querySelectorAll(".notice-content-body row"));
                            }, 3000);
                        }
                    }
                });
            };

            // 관찰 영역
            const option = {
                root : scrollTarget.current, 
                rootMargin: "2%",
                threshold: 0.6
            };

            const observer = new IntersectionObserver(callback, option);
            observeLastItem(observer, items);

            return ()=>{
                observer.disconnect();
            };
        }
    }, [loadStatus]);

    const observeLastItem = (io, items)=>{
        const lastItem = items[items.length-1];
        io.observe(lastItem);
    };

    return(
        <div className="notice-container" ref={scrollTarget} >
            {loadStatus ? <Loading /> : null}
            {subPath.length == 3 ? <NoticeBoard context={{data, loadStatus}} /> : <Outlet />}
        </div>
    );
    
};

export default Notice;