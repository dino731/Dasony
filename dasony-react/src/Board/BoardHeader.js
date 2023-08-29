import {Link} from 'react-router-dom';
import './Board.css';

const BoardHeader = ()=>{


  return(
    <>
        <div className="boardDetail-head-title">
          <Link to="/board/writer/dwriter" style={{textDecoration:'none', color: 'black'}}>
            <span className="boardDetail-head-title-text">일반 게시글</span>
          </Link>
          <Link to="/board/writer/vwriter" style={{textDecoration:'none', color: 'black'}}>
            <span className="boardDetail-head-title-text"> 투표 게시글</span>
          </Link>
          <Link to="/board/writer/swriter" style={{textDecoration:'none', color: 'black'}}>
            <span className="boardDetail-head-title-text"> 쇼츠 게시글</span>
          </Link>
          
        </div>
        {/* <div className="boardDetail-head-title">
          <Link to="/boardI">
            <span className="boardDetail-head-title-text">정보 게시글</span>
          </Link>          
        </div> */}
    </>
  )

}
export default BoardHeader;
