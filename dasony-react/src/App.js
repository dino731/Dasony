
import './App.css';
import Header from './common/Header';
import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import Home from './main/Home';
import Footer from './common/Footer';
import Chat from './chat/Chat';
import Event from './event/Event';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import PlzLogin from './main/PlzLogin';
import React, {Component, Fragment} from 'react';

/** 내파트 */
import ManagerEventBoard from './event/ManagerEventBoard';
import EventForm from './event/EventForm';
import EventDetailControl from './event/EventDetailControl';
import EventBoard from './event/EventBoard';

function App() {
  
  const [loading, setLoading] = useState(true);
  const getPage = async()=>{
    setLoading(false);
  };
  useEffect(()=>{
    getPage();
  }, []);

  const [mainPage, setMainPage] = '';

  const HandleMainPage = () => {
    if(1){
      setMainPage((<PlzLogin/>));
    } else {
      setMainPage((<Home/>));
    }
   
  }

  const location = useLocation();

  return (
    //loading ? (<Loading/>) : ''
    //전체 창 영역
    <>
    <Header/>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>

                  {/* 로그인 안 된 경우 */}
                  {/* 메인페이지 부분 */}
                  <Route path="/plzLogin" element={
                                                    <div className="plzLogin-container">
                                                      <PlzLogin/>
                                                    </div>
                                                  }/>
                  

                  {/* 로그인 된 경우 */}
                  {/* 메인페이지 부분 */}
                  <Route path="/" element={<motion.div
                                                initial = {{opacity:0, y:30}}
                                                animate = {{opacity:1, y:0}}
                                                end = {{opacity:1, y:0}}
                                                transition={{duration : 1}}>
                                              <div className="for-main">
                                                <div id="main-window">
                                                  <Home/>
                                                </div>
                                                <div id="right-window">
                                                  여기가 바로 롸이트 윈도우라네
                                                </div>
                                              </div>
                                              </motion.div>
                                          }/>
                  

                  {/*메인페이지 외 부분*/ }
                  <Route path="/chat" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Chat/>
                                                                        </motion.div></div></div>}/>
                  <Route path="/event" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Event/>
                                                                        </motion.div></div></div>}>
                      <Route path="list" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <EventBoard/>
                                                    </motion.div>}/>      
                      <Route path="detail/:no" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <EventDetailControl editStatus="등록"/>
                                                    </motion.div>}/>                                                    
                      <Route path="addNewEvent" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <EventForm editStatus="등록"/>
                                                    </motion.div>}/>
                      <Route path="modifyEvent" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <EventForm editStatus="수정"/>
                                                    </motion.div>}/>
                      <Route path="managerEvent" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ManagerEventBoard/>
                                                    </motion.div>}/>                                            
                  </Route>
           
        </Routes>
      </AnimatePresence>

          {/*푸터 영역 */}
          <div className="for-main" style={{display:'none'}}><Footer/></div>
          

    </>                                  
  );
}



export default App;
