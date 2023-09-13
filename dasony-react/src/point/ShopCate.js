import { Link, Outlet } from 'react-router-dom';
import './ShopCate.css';
import HeartIcon from "../heart";
import {useState, useEffect} from 'react';
import ShopCateProduct from './ShopCateProduct';

const ShopCate = ()=>{

/*카테고리 설정 */
    const [shopCate, setShopCate]= useState();
    const handleShopCate = (e) => {
        const allDivs = document.querySelectorAll('.shopCate-div');
        allDivs.forEach((div) => {
            div.style.backgroundColor = 'white';
            div.style.color = '#CB9DE7';
        });
    
        const clickedDiv = e.target;
        clickedDiv.style.backgroundColor = '#CB9DE7';
        clickedDiv.style.color = 'white';
    
        setShopCate(e.target.id);
        console.log(shopCate);
    }

/*검색어 설정 */
    const [keyword, setKeyword] = useState('');
    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }
   
    return(
        <div className="shopCate-container">
            <div className='shopCate-title-box'>
                <div className="shopCate-div" id="B" onClick={handleShopCate}>카페/베이커리</div>
                <div className="shopCate-div" id="O" onClick={handleShopCate}>외식</div>
                <div className="shopCate-div" id="C" onClick={handleShopCate}>편의점</div>
                <div className="shopCate-div" id="L" onClick={handleShopCate}>문화 생활</div>
            </div>{/* shopCate-title-box 끝*/}

            <div className="shopCate-search-box">
                <input type="search" onChange={handleKeyword} value={keyword}/>{" "}<input type='button' value='검색'/>
            </div>{/* shopCate-search-box 끝*/}
            <Outlet context={{store:'백년손님', shopCate:shopCate, keyword:keyword}}/>
        </div>/* shopCate-container 끝*/
    );
}

export default ShopCate;