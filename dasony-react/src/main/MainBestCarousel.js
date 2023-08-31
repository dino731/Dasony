import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import HeartIcon from "../heart";
import './MainBestCarousel.css';
const MainBestCarousel = () =>{

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <div className='home-best-carousel'>
                            <div className='home-best-box'>
                                <div>
                                    <img src='../resources/common-img/dasony-logo.png'/>
                                </div>
                                <div>작성자명<br/>글제목</div>
                            </div>
                            <div className='home-best-box'>
                                <div>
                                    <img src='../resources/common-img/dasony-logo.png'/>
                                </div>
                                <div>작성자명<br/>글제목</div>
                            </div>
                            <div className='home-best-box'>
                                <div>
                                    <img src='../resources/common-img/dasony-logo.png'/>
                                </div>
                                <div>작성자명<br/>글제목</div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='home-best-carousel'>
                            <div className='home-best-box'>
                                <div>
                                    <img src='../resources/common-img/dasony-logo.png'/>
                                </div>
                                <div>작성자명<br/>글제목</div>
                            </div>
                            <div className='home-best-box'>
                                <div>
                                    <img src='../resources/common-img/dasony-logo.png'/>
                                </div>
                                <div>작성자명<br/>글제목</div>
                            </div>
                            <div className='home-best-box'>
                                <div>
                                    <img src='../resources/common-img/dasony-logo.png'/>
                                </div>
                                <div>작성자명<br/>글제목</div>
                            </div>
                        </div>
                    </Carousel.Item>
        </Carousel>
    );
}

const MainLocalCarousel = () =>{

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return(
        <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <div className='local-carousel'>
                            <div className='local-box'>
                                <div className='local-box-img'>
                                    <img src='./resources/shop/product/3/001.png'/>
                                </div>
                                <div>
                                    <span>작성자명</span><br/>
                                    <span>글 제목</span>
                                </div>
                            </div>

                            <div className='local-box'>
                                <div className='local-box-img'>
                                    <img src='./resources/shop/product/3/001.png'/>
                                </div>
                                <div>
                                    <span>작성자명</span><br/>
                                    <span>글 제목</span>
                                </div>
                            </div>

                            <div className='local-box'>
                                <div className='local-box-img'>
                                    <img src='./resources/shop/product/3/001.png'/>
                                </div>
                                <div>
                                    <span>작성자명</span><br/>
                                    <span>글 제목</span>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='local-carousel'>
                            <div className='local-box'>
                                <div className='local-box-img'>
                                    <img src='./resources/shop/product/3/001.png'/>
                                </div>
                                <div>
                                    <span>작성자명</span><br/>
                                    <span>글 제목</span>
                                </div>
                            </div>

                            <div className='local-box'>
                                <div className='local-box-img'>
                                    <img src='./resources/shop/product/3/001.png'/>
                                </div>
                                <div>
                                    <span>작성자명</span><br/>
                                    <span>글 제목</span>
                                </div>
                            </div>

                            <div className='local-box'>
                                <div className='local-box-img'>
                                    <img src='./resources/shop/product/3/001.png'/>
                                </div>
                                <div>
                                    <span>작성자명</span><br/>
                                    <span>글 제목</span>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
        </Carousel>
    );
}

const MainShortsCarousel = () => {

    const [left, setLeft] = useState(0);
    const handleLeft = () => {
        if(-40*5<left && left< -29*5){
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

    return(
        <div className='mainShorts-container'>
            <span className='carousel-btn-left' onClick={handleRight}>
                {"<"}
            </span>
            <div className='mainShorts-box' style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/001.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>

            <div className='mainShorts-box' style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/002.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>

            <div className='mainShorts-box'  style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/003.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>

            <div className='mainShorts-box'  style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/004.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>

            <div className='mainShorts-box'  style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/005.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>
            <div className='mainShorts-box'  style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/006.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>
            <div className='mainShorts-box'  style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/007.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>
            <div className='mainShorts-box'  style={{left:left+'%'}}>
                <div>
                    <img src='./resources/shop/product/4/001.png'/>
                </div>
                <div>
                    <div>작성자명</div>
                </div>
            </div>
            <span className='carousel-btn-right' onClick={handleLeft}>
                {">"}
            </span>
        </div>
        
    );
}

const MainVsCarousel = () => {

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

    return(
        <div className='mainVs-container'>
            <span className='vs-carousel-btn-left' onClick={handleRight}>
                {"<"}
            </span>
            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                   치킨 
                </div>
                VS
                <div>
                    피자
                </div>
            </div>

            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                    불고기
                </div>
                VS
                <div>
                    제육
                </div>
            </div>

            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                    돼지 갈비
                </div>
                VS
                <div>
                    고추장 갈비
                </div>
            </div>

            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                
                </div>
                VS
                <div>
                    
                </div>
            </div>

            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                    
                </div>
                VS
                <div>
                    
                </div>
            </div>
            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                    
                </div>
                VS
                <div>
                    
                </div>
            </div>
            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                    
                </div>
                VS
                <div>
                    
                </div>
            </div>
            <div className='mainVs-box' style={{left:(left+'vw')}}>
                <div>
                    
                </div>
                VS
                <div>
                    
                </div>
            </div>
            <span className='vs-carousel-btn-right' onClick={handleLeft}>
                {">"}
            </span>
        </div>
        
    );
}


export {MainBestCarousel, MainLocalCarousel, MainShortsCarousel, MainVsCarousel};