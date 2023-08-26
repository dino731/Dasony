import 'bootstrap/dist/css/bootstrap.min.css';
import {motion} from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import './PlzLogin.css';
import * as React from 'react';


const PlzLogin = () => {
   
    return(
        
        <div className='window hero-container'>
            <video src="/resources/main-vedio/main-background.mp4" autoPlay loop muted />
            <div className="container">
                {/* <div className="head">
                    <div></div>
                    <div><img src='/resources/common-img/dasony-logo6.png'/></div>
                    <div><button type="button" className="btn btn-success">로그인</button></div>  
                </div> */}
                <div className="body"> 
                    <motion.div
                    initial = {{opacity:0, x:100}}
                    animate = {{opacity:1, x:0}}
                    end = {{opacity:1}}
                    transition={{duration : 1}}>
                    <div className='login'>
                        로그인 창
                    </div>
                    </motion.div>
                    {/* <div className="body-first">
                        <img src='/resources/common-img/dasony-logo6.png'/> 
                        <div className="body-first-child">
                            아무래도... 다소니만한....<br/>지역 어플이 없제...
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default PlzLogin;