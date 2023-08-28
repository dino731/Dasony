import 'bootstrap/dist/css/bootstrap.min.css';
import {motion} from 'framer-motion';
import { Link} from 'react-router-dom';
import './PlzLogin.css';
import {React, useState, useEffect} from 'react';

const TypingTitle = ({initialWord, fontSize, delay}) =>{
    const[word, setWord] = useState('');
    const[count, setCount] = useState(0);
    const completeWord = initialWord;
    const exist = Math.ceil(Math.random()*500+delay);

    useEffect(()=>{
        if(count<completeWord.length){
            const typingInterval = setInterval(()=>{
                setWord((prevTitleValue)=>{
                    
                    let result = prevTitleValue ? prevTitleValue + completeWord[count] : completeWord[0];
                    setCount(count+1);

                    if(count >= completeWord.length){
                        return prevTitleValue;
                    }
                    
                    return result;
                });
            }, delay);
            return () => clearInterval(typingInterval);
        }
    },[count, completeWord, delay]);

    return (<h1 style={{fontSize:`${fontSize}`}}>{word}</h1>);    
}









const PlzLogin = () => {
   
    return(
        
        <div className='window hero-container'>
            <video src="/resources/main-vedio/main-background.mp4" autoPlay loop muted />
            <div className="container">
                    <motion.div
                    initial = {{opacity:0, x:100}}
                    animate = {{opacity:1, x:0}}
                    end = {{opacity:1}}
                    transition={{duration : 1}}>
                    <div className='container2'>
                    <div className='login'>{/*로그인 창 */}
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <img className='logo-img' src='/resources/common-img/dasony-logo.png'/>
                                        <br/><br/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th style={{letterSpacing:9}}>아이디</th>
                                    <td colSpan={2}>
                                        <input type='text'></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비밀번호</th>
                                    <td colSpan={2}>
                                        <input type='password'></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <button type='submit'>로그인</button>
                                        <hr/>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={3} style={{paddingBottom:'2vh'}}>*다소니는 로그인 후 이용가능합니다.*</th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        <Link to='/signUp'>회원 가입</Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        <Link to='/finding'>아이디/비밀번호 찾기</Link>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <motion.div
                                initial = {{opacity:0, y:100}}
                                animate = {{opacity:1, y:0}}
                                end = {{opacity:1}}
                                transition={{delay:1, duration : 1}}>
                        <div className="container-right">
                            <div>
                                <TypingTitle initialWord='다소니를 찾아주셔서 감사합니다.' fontSize='3vw' delay='200'/>
                                <br/>
                                <motion.div
                                            initial = {{opacity:0, x:100}}
                                            animate = {{opacity:1, x:0}}
                                            end = {{opacity:1}}
                                            transition={{delay:4, duration : 1}}>
                                    <div>주변의 이웃과 즐거운 이야기를 나눠보세요.</div>
                                </motion.div>
                                <motion.div
                                            initial = {{opacity:0}}
                                            animate = {{opacity:1}}
                                            end = {{opacity:1}}
                                            transition={{delay:5.5, duration : 1}}>
                                    <div style={{paddingTop:'40vh', fontSize:'1.5vw'}}>"다소니 : 사랑하는 사람을 뜻하는 순 우리말"</div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                    </motion.div>
            </div>
        </div>
    );
}

export default PlzLogin;