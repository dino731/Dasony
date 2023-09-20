import { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation} from 'react-router-dom';
import axios from 'axios';
import Loading from '../common/Loading';
import './customer.css';
import NoticeBoard from './NoticeBoard';
import ManagerNoticeBoard from './ManagerNoticeBoard';

const Notice = () => {
    const { pathname } = useLocation();
    const subPath = pathname.split('/');
    // scroll event 부여 대상
    const scrollTarget = useRef(null);
    const [data, setData] = useState([]);
    const [loadStatus, setLoadStatus] = useState(false);
    // rowBound를 위한 변수
    const [rowBound, setRowBound] = useState(0);
    const [apiAvailable, setApiAvailable] = useState(true);
    
    const loadData = () => {
        if(apiAvailable){
            setLoadStatus(true);
            const url = encodeURI('http://localhost:3000/dasony/notice/loadList');
            axios.post(url, {rowBound: rowBound})
                .then((res) => {
                    const response = res.data;
                    setLoadStatus(false);
                    // console.log("response : ",response );

                    if(response.length != 0){
                        setRowBound(rowBound + 1);
                        setData([...data, ...response]);
                    }else{
                        setApiAvailable(false); // true
                        // console.log(`load : ${loadStatus}, data : ${data}, row : ${rowBound}, api : ${apiAvailable}`);
                    }
                })
        }
    };

    useEffect(()=>{
        loadData();
    },[]);

    
    useEffect(()=>{
        // observer
        // notice/list 경로인 경우에만
        if(subPath[subPath.length-1]==="notice" && subPath[1]!="admin" && data.length != 0 ){
            // 관찰할 item 요소
            const items = document.querySelectorAll(".notice-content-body .row");
            // console.log(items);
            const callback = (entries, observer) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        observer.unobserve(entry.target);
                        if(!loadStatus) {
                            
                            loadData();
                            // 비동기 구현시 setTimeout 지울 것
                            // setTimeout(() => {
                            //     loadData();
                            //     // observeLastItem(observer, document.querySelectorAll(".notice-content-body row"));
                            // }, 2000);
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
    }, [loadStatus,rowBound, apiAvailable]);

    const observeLastItem = (io, items)=>{
        const lastItem = items[items.length-1];
        io.observe(lastItem);
    };

    return(
        <div className="notice-container" ref={scrollTarget} >
            {loadStatus ? <div className="loadingContainer">
                            <Loading />
                        </div> : null}
            { subPath[subPath.length-1]=="notice" ? 
                subPath.length != 3 ?
                    subPath[1]=="admin" ? <ManagerNoticeBoard /> : <Outlet />
                : <NoticeBoard context={{data, loadStatus}} />
            : <Outlet />}
        </div>
    );
    
};

export default Notice;