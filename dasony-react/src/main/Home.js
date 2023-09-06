

import './Home.css';
import { useState } from 'react';
import {MainBestCarousel, MainLocalCarousel, MainShortsCarousel, MainVsCarousel} from "./MainBestCarousel";
import Weather from './Weather';
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../atoms';

const Home = () =>{

    const loginUserInfo = useRecoilValue(loginUserState);

    console.log("리코일에서 받아온 유저 정보-main(사용자):",loginUserInfo);

    return (
        <div className="home-container">
            <div className="home-weather">
               <div className='home-title'>오늘같은 날씨엔...</div> 
               <div className='home-content'>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <div>
                                        <Weather/>
                                    </div>
                                </td>
                                <td>
                                    <div className='weather-board-info'>
                                        <div>
                                            <img src='./resources/shop/product/2/002.png'></img>
                                        </div>
                                        <div>
                                            글 제목
                                        </div>
                                    </div>
                                    <div className='weather-board-info'>
                                        <div>
                                            <img src='./resources/shop/product/2/002.png'></img>
                                        </div>
                                        <div>
                                            글 제목
                                        </div>
                                    </div>
                                    <div className='weather-board-info'>
                                        <div>
                                            <img src='./resources/shop/product/2/002.png'></img>
                                        </div>
                                        <div>
                                            글 제목
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
               </div>
            </div>

            <br/>

            <div className="home-best">
                <div className='home-title'>실시간 인기글 Best</div>
                <div className='home-content'>
                    <MainBestCarousel/>
                </div>
            </div>

            <br/>
            
            <div className="home-shorts">
                <div className='home-title'>다쇼츠</div>
                <div className='home-content'>
                    <MainShortsCarousel/>
                </div>
            </div>

            <br/>

            <div className="home-info">
                <div className='home-title'>우리 지역 소식</div>
                <div className='home-content'>
                    <MainLocalCarousel/>
                </div>
            </div>

            <br/>

            <div className="home-vs">
                <div className='home-title'>다소니 세기의 대결</div>
                <div className='home-content'>
                    <MainVsCarousel/>
                </div>
            </div>
        </div>

    );
        
}
export default Home;