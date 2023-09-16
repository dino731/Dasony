import './AnotherHeader.css';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useRecoilState } from 'recoil';
import {boardVsState} from '../atoms';


export const AnotherHeader = () => {

    /*boardTitle, boardTag, boardCateNo, userNo 정보 설정 */
    const location = useLocation();

    const [boardCateNo, setBoardCateNo] = useState(
        location.pathname.includes('vwriter')?1103
        :location.pathname.includes('swriter')?1102
        :1101
    );
    const [boardTitle, setBoardTitle] = useState('');
    const [boardTag, setBoardTag] = useState('');

    const userNo = parseInt(localStorage.getItem('loginUserNo'));

    /*boardVs - atom */
    const [boardVs, setBoardVs] = useRecoilState(boardVsState);
    const handleBoardVs = (e)=>{
        let {id, value} = e.target;
        if(id=='boardTag'){
            value = handleTag(value);
        }
        setBoardVs(prev=>({
            ...prev,
            [id]:value,
            boardCateNo : boardCateNo,
            userNo : userNo
        }));
    }

    /*boardTag - 띄어쓰기를 '_'로 바꿔주기 */
    const handleTag = (e) => {
        let modifiedString = '';
        
        for (let i = 0; i < e.length; i++) {
            const char = e[i];
            if (char === ' ' && (e[i + 1] === ',' || e[i - 1] === ',')) {
              modifiedString += ' ';
            } else if (char === ' ') {
              modifiedString += '_';
            } else {
              modifiedString += char;
            }
          }
        return modifiedString;
    }


    useEffect(()=>{
        console.log("boardCateNo, boardTitle, boardTag, boardVs", boardCateNo, boardTitle, boardTag, boardVs);
    }, [boardCateNo, boardTitle, boardTag])
    return(
        <div className="another-header-container">

            <div className="another-header-cate">
                <Link to='/board/general/daily/dwriter'>일반 게시글</Link>
                <Link to='/board/general/daily/vwriter'>투표 게시글</Link> 
                <Link to='/board/general/daily/swriter'>쇼츠 게시글</Link>
            </div>


            <div className="another-header-box">
                <div className="another-header-title">
                    <input id='boardTitle' placeholder='제목을 입력하세요'
                            onChange={handleBoardVs} value={boardVs.boardTitle}/>
                </div>
                <div className="another-header-tag">
                    <input id='boardTag' placeholder='태그를 입력하세요'
                            onChange={handleBoardVs} value={boardVs.boardTag}/>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}