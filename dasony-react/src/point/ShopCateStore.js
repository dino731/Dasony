import { useState } from 'react';
import './ShopCateStore.css';
import { Link, useNavigate } from 'react-router-dom';

const ShopCateStore = () => {

    const navigate = useNavigate();
    const handleStore = (event)=>{
        const selectedStore = event.target.innerHTML;
        console.log(event.target.innerHTML);
        navigate(`/shop/cate/${selectedStore}/product`);
    }
    return(
        <div className="shopCate-store-main">
            <div className="shopCate-store-title">
                <div>상점</div>
            </div>{/* shopCate-box-head 끝*/}

            <div className="shopCate-store-box">
                <div onClick={handleStore}>백년 손님 고깃집</div>
                <div>룽바오네 마라탕</div>
                <div>마시리 카페</div>
                <div>마시리 카페</div>
                <div><Link to='/shop/cate/store/product'>백년 손님 고깃집</Link></div>
                <div>룽바오네 마라탕</div>
                <div>마시리 카페</div>
                <div>마시리 카페</div>
                <div><Link to='/shop/cate/store/product'>백년 손님 고깃집</Link></div>
                <div>룽바오네 마라탕</div>
                <div>마시리 카페</div>
                <div>마시리 카페</div>
                <div><Link to='/shop/cate/store/product'>백년 손님 고깃집</Link></div>
                <div>룽바오네 마라탕</div>
                <div>마시리 카페</div>
                <div>마시리 카페</div>
            </div>
        </div>
    );
}

export default ShopCateStore;