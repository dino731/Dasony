import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import './MainBestCarousel.css';
import { useRecoilState } from 'recoil';
import { bestListState, shortsListState, vsListState, localListState } from '../atoms';
import axios from 'axios';

const MainBestCarousel = () =>{

    
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");

    const [index, setIndex] = useState(0);

    const [bestList, setBestList] = useRecoilState(bestListState);

    console.log("bestList확인 - 전달?:", bestList);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/bestList")
            .then(res=>{
                setBestList(res.data);
                console.log("베스트 리스트 확인", res.data);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])

    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <div className='home-best-carousel'>
            {
                bestList&&bestList.filter(best=>(
                    best.user.userRegion == userRegion
                )).slice(0,3).map(best=>(
                    <div key={best.board.boardNo} className='home-best-box'>
                        <div style={{height:'9vw', width:'9vw',overflow:'hidden'}}>
                            {
                                best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </> 
                                :!best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </>
                                :best.boardVideo.videoModName&&!best.boardImg.boardImgModName
                                ?
                                <>
                                    <video id="vid" controls className="board-video" autoPlay loop>
                                        <source src={`http://localhost:8083/dasony${best.boardVideo.videoPath}${best.boardVideo.videoModName}`} type="video/mp4" />
                                    </video>
                                </>
                                :
                                <>
                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                </>
                            }
                        </div>
                        <div style={{fontSize:'100%'}}>{best.user.userNick}<br/>{best.board.boardTitle}</div>
                    </div>
                ))
            }
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className='home-best-carousel'>

            {
                bestList&&bestList?.filter(best=>(
                    best.user.userRegion == userRegion
                )).slice(3,6).map(best=>(
                    <div className='home-best-box'>
                        
                        <div style={{height:'9vw', width:'9vw',overflow:'hidden'}}>
                            {
                                best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </> 
                                :!best.boardVideo.videoModName&&best.boardImg.boardImgModName
                                ?
                                <>
                                    <img src={`http://localhost:8083/dasony${best.boardImg.boardImgPath}/${best.boardImg.boardImgModName}`}/>
                                </>
                                :best.boardVideo.videoModName&&!best.boardImg.boardImgModName
                                ?
                                <>
                                    <video id="vid" controls className="board-video" autoPlay loop muted>
                                        <source src={`http://localhost:8083/dasony${best.boardVideo.videoPath}${best.boardVideo.videoModName}`} type="video/mp4" />
                                    </video>
                                </>
                                :
                                <>
                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                </>
                            }
                        </div>
                        <div>{best.user.userNick}<br/>{best.board.boardTitle}</div>
                    </div>
                ))
            }
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

const MainLocalCarousel = () =>{

    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");

    const [index, setIndex] = useState(0);

    const [localList, setLocalList] = useRecoilState(localListState);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/localList")
            .then(res=>{
                setLocalList(res.data);
                console.log("localList 확인", res.data);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])


    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <div className='local-carousel'>
                            {
                                localList?.filter(local=>(
                                    local.user.userRegion == userRegion
                                ))
                                .slice(0,3)
                                .map(local=>(
                                    <div className='local-box'>
                                        <div className='local-box-img'>
                                            {
                                                local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </> 
                                                :!local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </>
                                                :local.boardVideo.videoModName&&!local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <video id="vid" controls className="board-video" autoPlay loop>
                                                        <source src={`http://localhost:8083/dasony${local.boardVideo.videoPath}${local.boardVideo.videoModName}`} type="video/mp4" />
                                                    </video>
                                                </>
                                                :
                                                <>
                                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                                </>
                                            }
                                        </div>
                                        <div className='local-box-text'>
                                            {local.user.userNick}<br/><br/>
                                            {local.board.boardTitle}
                                        </div >
                                    </div>
                                ))
                            }
                            </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='local-carousel'>
                            {
                                localList?.filter(local=>(
                                    local.user.userRegion == userRegion
                                ))
                                .slice(3,6)
                                .map(local=>(
                                    <div className='local-box'>
                                        <div className='local-box-img'>
                                            {
                                                local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </> 
                                                :!local.boardVideo.videoModName&&local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <img src={`http://localhost:8083/dasony${local.boardImg.boardImgPath}/${local.boardImg.boardImgModName}`}/>
                                                </>
                                                :local.boardVideo.videoModName&&!local.boardImg.boardImgModName
                                                ?
                                                <>
                                                    <video id="vid" controls className="board-video" autoPlay loop>
                                                        <source src={`http://localhost:8083/dasony${local.boardVideo.videoPath}${local.boardVideo.videoModName}`} type="video/mp4" />
                                                    </video>
                                                </>
                                                :
                                                <>
                                                    <img src='https://i.ibb.co/dPfbwqB/dasony-logo.png'/>
                                                </>
                                            }
                                        </div>
                                        <div className='local-box-text'>
                                            {local.user.userNick}<br/>
                                            {local.board.boardTitle}
                                        </div >
                                    </div>
                                ))
                            }
                            </div>
                    </Carousel.Item>
        </Carousel>
    );
}

const MainShortsCarousel = () => {

    
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");


    const [shortsList, setShortsList] = useRecoilState(shortsListState);
    const [index, setIndex] = useState(0);

    const [left, setLeft] = useState(0);
    const handleLeft = () => {
        if(-40*(index)<left && left< -29*(index)){
            setLeft(0);
        } else {
            setLeft(left-33);
        }
    }
    const handleRight = () => {
        if(-30<left && left < 30){
            setLeft(0);
        } else {
            setLeft(left+33);
        }
    }



    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/shortsList")
            .then(res=>{
                setShortsList(res.data);
                setIndex(shortsList.length);
                console.log("베스트 리스트 확인", res.data);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])


    return(
        <div className='mainShorts-container'>
            <span className='carousel-btn-left' onClick={handleRight}>
                    {"<"}
            </span>
            {shortsList?.filter(shorts=>(
                    shorts.user.userRegion == userRegion
                )).slice(0, 6).map(shorts=>{
                return(
                    <div key={shorts.board.boardNo} className='mainShorts-box' style={{left:left+'%'}}>
                        <div>
                        <video id="vid" controls className="board-video" autoPlay loop muted>
                            <source src={`http://localhost:8083/dasony${shorts.boardVideo.videoPath}${shorts.boardVideo.videoModName}`} type="video/mp4" />
                        </video>
                        </div>
                        <div>
                            <div>
                                {shorts.user.userNick}
                                <br/>
                                {shorts.board.boardTitle}
                            </div>
                        </div>
                    </div>
                )
            })}
            <span className='carousel-btn-right' onClick={handleLeft}>
                {">"}
            </span>
        </div>
        
    );
}

const MainVsCarousel = () => {

    
    const userNo = localStorage.getItem("loginUserNo");
    const userRegion = localStorage.getItem("loginUserRegion");


    const [vsList, setVsList] = useRecoilState(vsListState);
    const [index, setIndex] = useState(0);
    const [left, setLeft] = useState(0);

    
    const handleLeft = () => {
        let changedLeft = 0;
        if(-18*6<left&& left<=-18*5){
            changedLeft = 0;
            setLeft(changedLeft);
        } else {
            changedLeft = left-19.25;
            setLeft(left-19.25);
            console.log(changedLeft);
        }
    }
    const handleRight = () => {
        let changedLeft = 0;
        if(-17<=left && left<17){
            changedLeft = 0;
            setLeft(changedLeft);
            console.log(changedLeft);
        } else {
            changedLeft=left+19.25;
            setLeft(changedLeft);
            console.log(changedLeft);
        }
    }

    useEffect(()=>{
        const fetchData = async()=>{
            
            await axios.post("/dasony/board/vsList")
            .then(res=>{
                setVsList(res.data);
                setIndex(vsList.length);
                console.log("vsList확인", res.data);
            })
            .catch(err=>{
                console.log(err);
            });
            
        }

        fetchData();
    },[])

    return(
        <div className='mainVs-container'>
            <span className='vs-carousel-btn-left' onClick={handleRight}>
                {"<"}
            </span>
            {vsList?.filter(vs=>(
                    vs.user.userRegion == userRegion
                )).slice(0, 6).map(vs=>{
                return(
                    <div key={vs.boardVs.boardNo} className='mainVs-box' style={{left:(left+'vw')}}>
                        <span>{vs.boardVs.boardTitle}</span><br/>
                        <div>
                            <div>
                                {vs.boardVs.boardOptionLeft} 
                            </div>
                            <div>VS</div>
                            <div>
                                {vs.boardVs.boardOptionRight} 
                            </div>
                        </div>
                    </div>
                )
            })}
            <span className='vs-carousel-btn-right' onClick={handleLeft}>
                {">"}
            </span>
        </div>
        
    );
}


export {MainBestCarousel, MainLocalCarousel, MainShortsCarousel, MainVsCarousel};