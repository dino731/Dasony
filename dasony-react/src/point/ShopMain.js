import './ShopMain.css';
import ControlledCarousel from './shopBanner';
import { Link } from 'react-router-dom';
import HeartIcon from './heart';

const ShopMain = ()=>{
    return(
        <div className="shop-container">

            <ControlledCarousel/>

            <div className="shop-cate">
                <div className='shop-title'>상품 카테고리</div>
                <div className='cate-box'>
                    <div><Link to='/shop/cate/main'>카페<br/>베이커리</Link></div>
                    <div style={{paddingTop:'7vh'}}><Link to='/shop/cate/main'>외식</Link></div>
                    <div style={{paddingTop:'7vh'}}><Link to='/shop/cate/main'>편의점</Link></div>
                    <div><Link to='/shop/cate/main'>문화<br/>생활</Link></div>
                </div>
            </div>{/*shop-cate끝*/}

            <div className="shop-title">실시간 Best</div>
            <div className="shopBest-box">
                <div className="shopBest-item">
                    <div className="shopBest-item-img">
                        <img src="../resources/shop/product/4/004.png"></img>
                    </div>
                    <div className='shopBest-item-shop'>심스니 반할 도넛</div>
                    <div className='shopBest-item-product'>초코 도넛</div>
                    <div className='shopBest-item-point'>4000 다손{" "}<HeartIcon/></div>
                </div>

                <div className="shopBest-item">
                    <div className="shopBest-item-img">
                        <img src="../resources/shop/product/8/008.png"></img>
                    </div>
                    <div className='shopBest-item-shop'>마시리 카페</div>
                    <div className='shopBest-item-product'>영양 만점 석류 주스</div>
                    <div className='shopBest-item-point'>5000 다손{" "}<HeartIcon/></div>
                </div>

                <div className="shopBest-item">
                    <div className="shopBest-item-img">
                        <img src="../resources/shop/product/7/002.png"></img>
                    </div>
                    <div className='shopBest-item-shop'>룽바오네 마라탕</div>
                    <div className='shopBest-item-product'>마라탕(모듬)</div>
                    <div className='shopBest-item-point'>12000 다손{" "}<HeartIcon/></div>
                </div>

                <div className="shopBest-item">
                    <div className="shopBest-item-img">
                        <img src="../resources/shop/product/11/003.png"></img>
                    </div>
                    <div className='shopBest-item-shop'>백년 손님 고깃집</div>
                    <div className='shopBest-item-product'>숙성 갈비(600g)</div>
                    <div className='shopBest-item-point'>40000 다손{" "}<HeartIcon/></div>
                </div>

            </div>
            <div className="shop-new">
                <div className='shop-title'>새로 입점한 상점 </div>
                <div className='new-box'>
                    <div>백년 손님 고깃집</div>
                    <div>룽바오네 마라탕</div>
                    <div>마시리 카페</div>
                </div>
            </div>{/*shop-new끝*/}
            
        </div>//shop-container끝
    );
}

export default ShopMain;