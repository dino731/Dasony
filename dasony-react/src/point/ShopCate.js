import { Link, Outlet } from 'react-router-dom';
import './ShopCate.css';
import HeartIcon from "../heart";

const ShopCate = ()=>{
   
   
   
    return(
        <div className="shopCate-container">
            <div className='shopCate-title-box'>
                <div>카페/베이커리</div>
                <div>외식</div>
                <div>편의점</div>
                <div>문화 생활</div>
            </div>{/* shopCate-title-box 끝*/}

            <div className="shopCate-search-box">
                <input type="search"/>{" "}<input type='button' value='검색'/>
            </div>{/* shopCate-search-box 끝*/}
            <Outlet context={{store:'백년손님'}}/>
        </div>/* shopCate-container 끝*/
    );
}

export default ShopCate;