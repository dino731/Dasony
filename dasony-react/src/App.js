
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';
import Chat from './Chat';
import {useEffect, useState} from 'react';
import Loading from './Loading';



function App() {
  
  const [loading, setLoading] = useState(true);
  const getPage = async()=>{
    setLoading(false);
  };
  useEffect(()=>{
    getPage();
  }, []);

  return (
    
    <Router>
    {loading ? (<Loading/>) : ''}

      {/*전체 창 영역 */}
      <div id="window">

        {/*헤더 영역(사이드 바) */}
        <Header/>

        {/*중간 창 영역 */}
        <div id="middle-window">
          <Routes>

            {/* 메인페이지 부분 */}
            <Route path="/" element={
                                      <div className="for-main">
                                        <div id="main-window">
                                          <Home/>
                                        </div>
                                        <div id="right-window">
                                        </div>
                                      </div> 
                                    }/>

            {/*메인페이지 외 부분*/ }
            <Route path="/chat" element={<div id="normal-window"><Chat/></div>}/>
          </Routes>
          
          {/*푸터 영역 */}
          <Footer/>
        </div>
      </div>
    </Router>
  );
}



export default App;
