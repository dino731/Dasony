
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
import HomeSide from './main/HomeSide';
import AdminMain from './admin/adminMain';
import AdminShop from './admin/shop/adminShop';
import { AdminShopDetail } from './admin/shop/adminShopDetail';




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
                        </Route>{/*shop 중첩 route 끝 */}  

                      
                  </Route>{/*shop 중첩 route 끝 */}
           
        </Routes>
      </AnimatePresence>

          {/*푸터 영역 */}
          <div className="for-main" style={{display:'none'}}><Footer/></div>
          

    </>                                  
  );
}



export default App;
