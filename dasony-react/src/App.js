import './App.css';
import Header from './common/Header';
import {Outlet, Route, Routes, useLocation, Navigate} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import Home from './main/Home';
import Footer from './common/Footer';
import Chat from './chat/Chat';
import Event from './event/Event';
import Shop from './point/shop';
import ShopBest from './point/shopBest';
import Coupon from './point/Coupon';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import PlzLogin from './main/PlzLogin';
import SignUp from './main/signUp';
import React, {Component, Fragment} from 'react';
import Finding from './main/Finding';
import ShopHeart from './point/ShopHeart';
import ShopCate from './point/ShopCate';
import ShopMain from './point/ShopMain';
import ShopCateMain from './point/ShopCateMain';
import ShopCateStore from './point/ShopCateStore';
import ShopCateProduct from './point/ShopCateProduct';
import ShopProductDetail from './point/ShopProductDetail';
import ShopMyCoupon from './point/ShopMyCoupon';
import CouponList from './point/CouponList';
import UserLocation from './main/UserLocation';
import BoardDailyList from './Board/BoardDailyList';
import Board from './Board/Board';
import BoardDailyWriter from './Board/BoardDailyWriter';
import BoardVoteUploader from './Board/BoardVoteUploader';
import BoardShortsUploader from './Board/BoardShortsUploader';
import BoardDetail from './Board/BoardDetail';
import General from './Board/General';
import Info from './Board/Info';
import ManagerEventBoard from './event/ManagerEventBoard';
import EventForm from './event/EventForm';
import EventDetailControl from './event/EventDetailControl';
import EventBoard from './event/EventBoard';
import HomeSide from './main/HomeSide';
import AdminMain from './admin/adminMain';
import AdminShop from './admin/shop/adminShop';
import { AdminShopDetail } from './admin/shop/adminShopDetail';
import { AdminUser } from './admin/user/adminUser';
import { AdminUserDetail } from './admin/user/adminUserDetail';
import { AdminCalendar } from './admin/board/adminCalendar';
import Mypage from './mypage/mypage';
import MypageHeader from './mypage/mypageHeader';
import MypageAct from './mypage/mypageAct';
import MypageInfo from './mypage/mypageInfo';
import MypageMyshopCoupon from './mypage/mypageMyshopCoupon';
import MypageMyshopPoint from './mypage/mypageMyshopPoint';
import MypageMyshopLikes from './mypage/mypageMyshopLikes';
import MypageMyshops from './mypage/mypageMyshops';
import MypageAlert from './mypage/mypageAlert';
import MypageMydonation from './mypage/mypageMydonation';
import MypageMyshopUsedPoint from './mypage/mypageMyshopUsedPoint';
import Gamestart from './mypage/realgame';
import { RecoilEnv } from 'recoil';
import ChatList from './chat/ChatList';
import MyChatListModal from './chat/MyChatListModal';
import NewChatModal from './chat/NewChatModal';
import AdminDonaDetail from './admin/donation/AdminDonaDetail';
import AdminDonaEnroll from './admin/donation/AdminDonaEnroll';
import AdminDonaList from './admin/donation/AdminDonaList';
import AdminUpdate from './admin/donation/AdminUpdate';
import DonaDetail from './donation/DonaDetail';
import DonaDona from './donation/DonaDona';
import DonaList from './donation/DonaList';
import DonaTotal from './donation/DonaTotal';
import { ChatDataProvider } from './chat/ChatDataContext';
import { DonaDataProvider } from './donation/DonaDataContext';
import { DonationProvider } from './donation/DonationContext';
import { AdminDonaListContext } from './admin/donation/AdminDonaListContext';
import Notice from './service/Notice';
import NoticeBoard from './service/NoticeBoard';
import NoticeDetail from './service/NoticeDetail';
import ManagerNoticeBoard from './service/ManagerNoticeBoard';
import Service from './service/Service';
import AdminReport from './admin/user/adminReport';
import NoticeForm from './service/NoticeForm';
import AdminReception from './admin/user/adminReception';
import AdminReportDetail from './admin/user/adminReportDetail';
import AdminAlert from './admin/user/adminAlert';
import AdminReceptionDetail from './admin/user/adminReceptionDetail';
import AdminBoardList from './admin/board/adminBoardList';
import AdminBoard from './admin/board/adminBoard';
import AdminBoardDelete from './admin/board/adminBoardDelete';
import BoardEdit from './Board/BoardEdit';
import ChartManager from './admin/chart/ChartManager';
import { Share } from './share/share';

import MypageReception from './mypage/mypageReception';

import { ShopMyCouponImg } from './point/ShopMyCouponImg';

import {VoteWrite} from './Board/VoteWrite';
import { AnotherHeader } from './Board/AnotherHeader';
import { ShareHeader } from './share/ShareHeader';
import { ShareWriter } from './Board/ShareWriter';
import { VoteEdit } from './Board/VoteEdit';
import { ShortsEdit } from './Board/ShortsEdit';
import MypageChangeLocation from './mypage/mypageChangeLocation';



RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

//로그인 확인 - PrivateRoute
export let isLogin = localStorage.getItem("loginUserNo")?true:false;
console.log("APP확인", isLogin);
  export const PrivateRoute =() =>{
    const location = useLocation();
    if(isLogin&&!isAdmin){
      return <Outlet/>;
    } else if(isLogin&&isAdmin){
      return <Navigate to="/admin/chart"/>;
    }else {
      return <Navigate to="/"/>;
    }
  }

//관리자 확인 - AdminRoute
  const isAdmin = localStorage.getItem("loginUserLevel")=='Z'?true:false;

  export const AdminRoute = () => {
    return isAdmin?<Outlet/> : <Navigate to="/"/>;
  }

function App() {

  const location = useLocation();
  
  return (

    <>
    <ChatDataProvider>
    <DonaDataProvider>
    <DonationProvider>
    <AdminDonaListContext>
    <Header/>

    <div id='game'> 


    <Gamestart/>
      </div>
      <div id='gameDiv'></div>
      

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>

                  {/* 로그인 안 된 경우 */}
                  {/* 메인페이지 부분 */}
              
                  <Route path="/" element={
                                            <div className="main-container">
                                              <PlzLogin/>
                                              <PrivateRoute/>
                                            </div>
                                          }/>
                
                  

                  {/* 로그인 된 경우 */}
                  {/*관리자로 로그인 한 경우 */}
                <Route element = {<AdminRoute/>}>
                  <Route path="/admin/chart" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                        <ChartManager/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>
                  <Route path="/admin/shop" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminShop/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>
                  <Route path="/admin/shop/:shopOkey" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminShopDetail/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/user" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminUser/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>                                                       
                  <Route path="/admin/user/:userNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminUserDetail/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/calendar" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminCalendar/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/report" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminReport/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>  
                  <Route path="/admin/reception" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminReception/>
                                                                        </motion.div></div></div>}/>
                </Route>  

                <Route element = {<AdminRoute/>}>  
                  <Route path="/admin/reportDetail" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminReportDetail/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>  
                    <Route path="/admin/receptionDetail" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminReceptionDetail/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/alert" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                            <AdminAlert/>
                                                                        </motion.div></div></div>}/>
                </Route>

                <Route element={<AdminRoute/>}>
                  <Route path="/admindonalist" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <AdminDonaList/>
                                                                      </motion.div></div></div>}/>
              </Route>

              <Route element={<AdminRoute/>}>
                  <Route path="/admindonaenroll" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <AdminDonaEnroll/>
                                                                      </motion.div></div></div>}/> 
              </Route>

              <Route element={<AdminRoute/>}>
                  <Route path="/admindonadetail/:donaNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <AdminDonaDetail/>
                                                                      </motion.div></div></div>}/>
              </Route>

              <Route element={<AdminRoute/>}>
                  <Route path="/admindonadetail/:donaNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <AdminDonaDetail/>
                                                                      </motion.div></div></div>}/>
              </Route>

              <Route element={<AdminRoute/>}>
                  <Route path="/admindonaupdate/:donaNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <AdminUpdate/>
                                                                      </motion.div></div></div>}/>                                                                                                                                                                                                                                                          
              </Route>                                                     

                  {/* 
                    이벤트 관리자 페이지
                    -기본 : 목록 게시판 
                    -상세 조회시 수정 및 삭제 가능한 폼으로 이동 
                    -등록버튼 클릭시 이벤트 등록폼으로
                  */}
                <Route element = {<AdminRoute/>}>   
                  <Route path="/admin/event" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Event />
                                                                        </motion.div></div></div>}>
              
                      <Route path="detail/:no" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <EventForm editStatus="수정"/>
                                                      </motion.div>}/>
                      <Route path="new" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <EventForm editStatus="등록"/>
                                                      </motion.div>}/>                           
                  </Route>
                </Route> 
                  {/* 
                    고객센터 관리자 페이지
                    -기본 : 공지 게시판 
                    -신고
                    -문의
                  */}
                <Route element = {<AdminRoute/>}>  
                  <Route path="/admin/service" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Service />
                                                                        </motion.div></div></div>}>
                      {/* notice 중첩 route 시작 */}
                      <Route path="notice" element={<Notice/>}>
                            <Route path="detail/:no" element={<NoticeDetail/>}/>                                                                      
                            <Route path="edit/:no" element={<NoticeForm/>}/>                                                                      
                            <Route path="new" element={<NoticeForm/>}/>                                                                      
                      </Route>                          
                  </Route>
                </Route>

                  {/* Admin Board */}
                <Route element = {<AdminRoute/>}> 
                  <Route path="/admin/board" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminBoard />
                                                                        </motion.div></div></div>}>
                 {/* <Route path="delete" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <AdminBoardDelete/>
                                                      </motion.div>}/> */}
                      <Route path="new" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <BoardDailyList/>
                                                      </motion.div>}/>        
                                    
                  </Route>
                </Route>

                                                                        
                  {/* 메인페이지 부분 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/main" element={<motion.div
                                                initial = {{opacity:0, y:30}}
                                                animate = {{opacity:1, y:0}}
                                                end = {{opacity:1, y:0}}
                                                transition={{duration : 1}}>
                                              <div className="for-main">
                                                <div id="main-window">
                                                  <Home/>
                                                </div>
                                                <div id="right-window">
                                                  <HomeSide/>
                                                </div>
                                              </div>
                                              </motion.div>
                                          }/>
                </Route>

                  <Route path="/signUp" element={<motion.div
                                                      initial = {{opacity:0, x:30}}
                                                      animate = {{opacity:1, x:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                    <div className="main-container">
                                                      <SignUp/>
                                                    </div>
                                                    </motion.div>
                                                  }/>
                  <Route path="/location" element={<motion.div
                                                      initial = {{opacity:0, x:30}}
                                                      animate = {{opacity:1, x:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                    <div className="main-container">
                                                      <UserLocation/>
                                                    </div>
                                                    </motion.div>
                                                  }/>
                  <Route path="/finding" element={<motion.div
                                                      initial = {{opacity:0, x:30}}
                                                      animate = {{opacity:1, x:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                    <div className="main-container">
                                                      <Finding/>
                                                    </div>
                                                    </motion.div>
                                                  }/>

                  {/*메인페이지 외 부분*/ }
                <Route element={<PrivateRoute/>}>
                  <Route path="/chat" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Chat/>
                                                                        </motion.div></div></div>}/>
                </Route>


                  {/*shop 중첩 route 시작 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/shop/*" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Shop/>
                                                                        </motion.div></div></div>}>
                      <Route path="main" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ShopMain/>
                                                    </motion.div>}/>
                      <Route path="best" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ShopBest/>
                                                    </motion.div>}/>
                             
                      <Route path="coupon/list/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <CouponList/>
                                                      </motion.div>}/>  
                      <Route path="coupon/:id" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopMyCoupon/>
                                                      </motion.div>}/> 
                      <Route path="coupon/:id/img" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopMyCouponImg/>
                                                      </motion.div>}/>
                      {/*coupon중첩 route 끝 */}


                      <Route path="heart" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopHeart/>
                                                      </motion.div>}/>
                      <Route path="cate/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopCate/>
                                                      </motion.div>}>
                        {/*shopCate 중첩 route 시작 */}
                        <Route path=":cate/main" element={<ShopCateMain/>}/>
                        <Route path=":cate/store" element={<ShopCateStore/>}/>
                        <Route path=':cate/:store/product' element={<ShopCateProduct/>}/>
                        <Route path=':cate/every/product' element={<ShopCateProduct/>}/>
                        <Route path=":cate/:store/:product" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopProductDetail/>
                                                      </motion.div>}/>
                      </Route>
                    </Route>{/*shop 중첩 route 끝 */}  
                  </Route>



                  {/* event 중첩 route 시작 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/event" element={<div className=".for-main">
                                                  <div className='for-normal-page'><motion.div
                                                                          initial = {{opacity:0, y:30}}
                                                                          animate = {{opacity:1, y:0}}
                                                                          end = {{opacity:1, y:0}}
                                                                          transition={{duration : 1}}>
                                                                            <Event/>
                                                                          </motion.div></div></div>}>     
                    <Route path="detail/:no" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <EventDetailControl editStatus="등록"/>
                                                      </motion.div>}/>  
                    </Route>
                  </Route>




                  {/*Board 중첩 route 시작 */}
                <Route element={<PrivateRoute/>}>
                  <Route path="/board/*" element={<div className=".for-main">

                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Board/>
                                                                        </motion.div></div></div>}>
                      <Route path="share/hwriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <ShareWriter/>
                                                              </motion.div>}/>
                      <Route path="general/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <General/>
                                                    </motion.div>}>
                          <Route path="daily/" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                           <BoardDailyList/>
                                                        </motion.div>}/>
                                <Route path="daily/dwriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <BoardDailyWriter/>
                                                              </motion.div>}/>
                                <Route path="daily/*" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <AnotherHeader/>
                                                              </motion.div>}>
                                  <Route path="vwriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <VoteWrite/>
                                                              </motion.div>}/>
                                  <Route path="swriter" element={<motion.div
                                                              initial = {{opacity:0, y:30}}
                                                              animate = {{opacity:1, y:0}}
                                                              end = {{opacity:1, y:0}}
                                                              transition={{duration : 1}}>
                                                                <BoardShortsUploader/>
                                                              </motion.div>}/>
                                </Route>
                                
                                <Route path="daily/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>
                                <Route path="daily/vs/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>
                                <Route path="daily/shorts/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>
                                <Route path="daily/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>
                                <Route path="daily/vs/edit/*" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <AnotherHeader/>
                                                                              </motion.div>}>
                                  <Route path=":boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <VoteEdit/>
                                                                              </motion.div>}/>
                                </Route>
                                                                              
                                <Route path="daily/shorts/edit/*" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <AnotherHeader/>
                                                                              </motion.div>}>
                                  <Route path=":boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <ShortsEdit/>
                                                                              </motion.div>}/>                           
                                </Route>                   
                          <Route path="interest/" element={<motion.div
                                                          initial = {{opacity:0, y:30}}
                                                          animate = {{opacity:1, y:0}}
                                                          end = {{opacity:1, y:0}}
                                                          transition={{duration : 1}}>
                                                            <BoardDailyList/>
                                                          </motion.div>}/>        
                                <Route path="interest/dwriter" element={<motion.div
                                                                initial = {{opacity:0, y:30}}
                                                                animate = {{opacity:1, y:0}}
                                                                end = {{opacity:1, y:0}}
                                                                transition={{duration : 1}}>
                                                                  <BoardDailyWriter/>
                                                                </motion.div>}/>
                                <Route path="interest/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/> 
                                <Route path="interest/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>                    
                      </Route>
                      <Route path="info/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <Info/>
                                                    </motion.div>}>
                          <Route path="jmt/" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <BoardDailyList/>
                                                      </motion.div>}/>
                                <Route path="jmt/dwriter" element={<motion.div
                                                                initial = {{opacity:0, y:30}}
                                                                animate = {{opacity:1, y:0}}
                                                                end = {{opacity:1, y:0}}
                                                                transition={{duration : 1}}>
                                                                  <BoardDailyWriter/>
                                                                </motion.div>}/>
                                <Route path="jmt/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>  
                                <Route path="jmt/edit/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>    
                          <Route path="fashion/" element={<motion.div
                                                          initial = {{opacity:0, y:30}}
                                                          animate = {{opacity:1, y:0}}
                                                          end = {{opacity:1, y:0}}
                                                          transition={{duration : 1}}>
                                                            <BoardDailyList/>
                                                          </motion.div>}/>
                                    <Route path="fashion/dwriter" element={<motion.div
                                                                    initial = {{opacity:0, y:30}}
                                                                    animate = {{opacity:1, y:0}}
                                                                    end = {{opacity:1, y:0}}
                                                                    transition={{duration : 1}}>
                                                                      <BoardDailyWriter/>
                                                                    </motion.div>}/>
                                    <Route path="fashion/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/>    
                                    <Route path="fashion/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>  
                          <Route path="local/" element={<motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <BoardDailyList/>

                                                                        </motion.div>}/> 
                                <Route path="local/dwriter" element={<motion.div
                                                                initial = {{opacity:0, y:30}}
                                                                animate = {{opacity:1, y:0}}
                                                                end = {{opacity:1, y:0}}
                                                                transition={{duration : 1}}>
                                                                  <BoardDailyWriter/>
                                                                </motion.div>}/>  
                                <Route path="local/detail/:boardNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardDetail/>
                                                                              </motion.div>}/> 
                                <Route path="local/edit/:boardNo/:boardCateNo" element={<motion.div
                                                                              initial = {{opacity:0, y:30}}
                                                                              animate = {{opacity:1, y:0}}
                                                                              end = {{opacity:1, y:0}}
                                                                              transition={{duration : 1}}>
                                                                                <BoardEdit/>
                                                                              </motion.div>}/>                                   
                    </Route>
                    {/*share중첩 시작 */}
                    <Route path="share/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <ShareHeader/>
                                                    </motion.div>}>
                      <Route path="list" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <Share/>
                                                    </motion.div>}/>


                    </Route>{/*share중첩 끝 */}
                    <Route path="share/list/:boardNo" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <BoardDetail/>
                                                    </motion.div>}/>

                  </Route>
                </Route>{/*Board 중첩 route 끝 */}


                    {/*mypage 중첩 route 시작 */}
                  <Route element={<PrivateRoute/>}>
                        <Route path="/MypageChangeLocation" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <MypageChangeLocation/>
                                                      </motion.div>}/>                                
                    <Route path="/mypage/*" element={<div className=".for-main">
                                                  <div className='for-normal-page'><motion.div
                                                                          initial = {{opacity:0, y:30}}
                                                                          animate = {{opacity:1, y:0}}
                                                                          end = {{opacity:1, y:0}}
                                                                          transition={{duration : 1}}>
                                                                            <Mypage/>
                                                                          </motion.div></div></div>}>
                        <Route path="Info/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <MypageInfo/>
                                                      </motion.div>}></Route>
                                                      
                        <Route path="myshop/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <MypageMyshops/>
                                                      </motion.div>}>
                        {/*myshop중첩 route 시작 */}                                 
                        <Route path="Coupon" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageMyshopCoupon/>
                                                        </motion.div>}/>
                          {/* Point 중첩 route 시작 */}
                          <Route path="Point" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageMyshopPoint/>
                                                        </motion.div>}/>
                          <Route path="MyUsedPoint" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageMyshopUsedPoint/>
                                                        </motion.div>}/>  
                         {/* Point 중첩 route 끝 */}                     
                          <Route path="Likes" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageMyshopLikes/>
                                                        </motion.div>}/>
                        </Route>
                        {/*myshop중첩 route 끝 */}
                        <Route path="myAct" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageAct/>
                                                        </motion.div>}/>
                        
                        <Route path="Mydonation" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageMydonation/>
                                                        </motion.div>}/>
                        <Route path="Alert" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <MypageAlert/>
                                                        </motion.div>}/>
                 </Route>
                </Route>{/*mypage 중첩 route 끝 */}


                {/* 
                고객센터(service) 중첩 route 시작
                path : /service/notice/*
                */}
              <Route element={<PrivateRoute/>}>
                <Route path="/service" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                        <Service/>
                                                                        </motion.div></div></div>}>
                    {/* notice 중첩 route 시작 */}
                    <Route path="notice" element={<Notice/>}>
                        <Route path="detail/:no" element={<NoticeDetail/>}/>                                                                        
                    <Route path="mypageReception" element={<MypageReception/>}/>                                                                       
                    
                    </Route>
                </Route>
              </Route>


              {/*chat */}
              <Route element={<PrivateRoute/>}>
                <Route path="/chat/:chatRoomNo/:chatRoomTitle" element={<div className=".for-main">
                                                            <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Chat/>
                                                                        </motion.div></div></div>}/>
              </Route>

              <Route element={<PrivateRoute/>}>
                <Route path="/chatlist" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <ChatList/>
                                                                      </motion.div></div></div>}/>
              </Route>

              <Route element={<PrivateRoute/>}>
                <Route path="/donalist" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <DonaList/>
                                                                      </motion.div></div></div>}/>
              </Route>     

              <Route element={<PrivateRoute/>}>
                   <Route path="/donatotal" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <DonaTotal/>
                                                                      </motion.div></div></div>}/> 
              </Route>

              <Route element={<PrivateRoute/>}>
                  <Route path="/donadetail/:donaNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <DonaDetail/>
                                                                      </motion.div></div></div>}/>
              </Route>

              <Route element={<PrivateRoute/>}>
                  <Route path="/donadona/:donaNo" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                      initial = {{opacity:0, y:30}}
                                                                      animate = {{opacity:1, y:0}}
                                                                      end = {{opacity:1, y:0}}
                                                                      transition={{duration : 1}}>
                                                                        <DonaDona/>
                                                                      </motion.div></div></div>}/> 
              </Route>
              {/* <Route element={<PrivateRoute/>}>
                <Route path='*' element={<div className="main-container">
                                              <PlzLogin/>
                                        </div>}/>  
              </Route>                                                                                                                                                                            */}
          </Routes>
        </AnimatePresence>

            {/*푸터 영역 */}
            <div className="for-main" style={{display:'none'}}><Footer/></div>
        </AdminDonaListContext>
      </DonationProvider>
      </DonaDataProvider>
      </ChatDataProvider> 
        </>                                  
    );
  }

export default App;