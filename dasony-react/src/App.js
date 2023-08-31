
import './App.css';
import Header from './common/Header';
import {Route, Routes, useLocation} from 'react-router-dom';
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
import {gamestart} from './mypage/realgame';





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
                                                    <div className="main-container">
                                                      <PlzLogin/>
                                                    </div>
                                                  }/>
                  

                  {/* 로그인 된 경우 */}
                  {/*관리자로 로그인 한 경우 */}
                  <Route path="/admin/main" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminMain/>
                                                                        </motion.div></div></div>}/>
                  <Route path="/admin/shop" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminShop/>
                                                                        </motion.div></div></div>}/>
                  <Route path="/admin/shop/detail" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminShopDetail/>
                                                                        </motion.div></div></div>}/>
                  <Route path="/admin/user" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminUser/>
                                                                        </motion.div></div></div>}/> 
                  <Route path="/admin/user/detail" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <AdminUserDetail/>
                                                                        </motion.div></div></div>}/>                                                                                        
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
                                                  <HomeSide/>
                                                </div>
                                              </div>
                                              </motion.div>
                                          }/>
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
                                                                        </motion.div></div></div>}/>
                  {/*shop 중첩 route 시작 */}
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
                      {/*coupon중첩 route 시작 */}                                 
                      <Route path="coupon/*" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <CouponList/>
                                                      </motion.div>}>
                        <Route path="list" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <CouponList/>
                                                      </motion.div>}/>
                      </Route>
                      {/*coupon중첩 route 끝 */}
                      <Route path="coupon/list/:id" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopMyCoupon/>
                                                      </motion.div>}/>
                      
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
                        <Route path="main" element={<ShopCateMain/>}/>
                        <Route path="store" element={<ShopCateStore/>}/>
                        <Route path=':store/product' element={<ShopCateProduct/>}/>
                        <Route path='every/product' element={<ShopCateProduct/>}/>
                        <Route path=":store/:product" element={<motion.div
                                                      initial = {{opacity:0, y:30}}
                                                      animate = {{opacity:1, y:0}}
                                                      end = {{opacity:1, y:0}}
                                                      transition={{duration : 1}}>
                                                        <ShopProductDetail/>
                                                      </motion.div>}/>
                          </Route>
                        </Route>{/*shop 중첩 route 끝 */}  
                      
                    
                    {/* event 중첩 route 시작 */}
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
                        <Route path="modifyEvent/:no" element={<motion.div
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


                  {/*Board 중첩 route 시작 */}
                  <Route path="/board/*" element={<div className=".for-main">
                                                <div className='for-normal-page'><motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <Board/>
                                                                        </motion.div></div></div>}>
                      <Route path="general/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <General/>
                                                    </motion.div>}>
                          <Route path="daily" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                           <BoardDailyList/>
                                                        </motion.div>}/>
                          <Route path="interest" element={<motion.div
                                                          initial = {{opacity:0, y:30}}
                                                          animate = {{opacity:1, y:0}}
                                                          end = {{opacity:1, y:0}}
                                                          transition={{duration : 1}}>
                                                            <BoardDailyList/>
                                                          </motion.div>}/>                                
                          <Route path="daily/detail" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                           <BoardDetail/>
                                                        </motion.div>}/>
                                                        </Route>

                      <Route path="info/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <Info/>
                                                    </motion.div>}>
                          <Route path="jmt"/* 임시로 지정 DB랑 맞추기 */ element={<motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <BoardDailyList/>
                                                                        </motion.div>}/>
                          <Route path="fashion" element={<motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <BoardDailyList/>
                                                                        </motion.div>}/>
                          <Route path="local" element={<motion.div
                                                                        initial = {{opacity:0, y:30}}
                                                                        animate = {{opacity:1, y:0}}
                                                                        end = {{opacity:1, y:0}}
                                                                        transition={{duration : 1}}>
                                                                          <BoardDailyList/>
                                                                        </motion.div>}/>                                  
                                                                        </Route>
                      <Route path="writer/*" element={<motion.div
                                                    initial = {{opacity:0, y:30}}
                                                    animate = {{opacity:1, y:0}}
                                                    end = {{opacity:1, y:0}}
                                                    transition={{duration : 1}}>
                                                      <BoardDailyWriter/>
                                                    </motion.div>}>                                                 
                          <Route path="dwriter" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <BoardDailyWriter/>
                                                        </motion.div>}/>
                          <Route path="vwriter" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <BoardVoteUploader/>
                                                        </motion.div>}/>
                          <Route path="swriter" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <BoardShortsUploader/>
                                                        </motion.div>}/>
                                                        </Route>

</Route>
                    {/*mypage 중첩 route 시작 */}
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
                                                      </motion.div>}/>
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
                                                        </motion.div>}>
                          {/*shopCate 중첩 route 시작 */}
                          <Route path="main" element={<ShopCateMain/>}/>
                          <Route path="store" element={<ShopCateStore/>}/>
                          <Route path='store/product' element={<ShopCateProduct/>}/>
                          <Route path='product' element={<ShopCateProduct/>}/>
                          </Route>{/*shop 중첩 route 끝 */}  

                        <Route path="product/:storeName/:productName" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <ShopProductDetail/>
                                                        </motion.div>}/>
                        <Route path="product/:productName" element={<motion.div
                                                        initial = {{opacity:0, y:30}}
                                                        animate = {{opacity:1, y:0}}
                                                        end = {{opacity:1, y:0}}
                                                        transition={{duration : 1}}>
                                                          <ShopProductDetail/>
                                                        </motion.div>}/>
                        
                    </Route>{/*mypage 중첩 route 끝 */}
                  
 
          </Routes>
        </AnimatePresence>

            {/*푸터 영역 */}
            <div className="for-main" style={{display:'none'}}><Footer/></div>
            

      </>                                  
    );
  }

export default App;