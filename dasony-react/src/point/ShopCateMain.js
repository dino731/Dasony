import './ShopCateMain.css';
import HeartIcon from "./heart";
import { Link } from 'react-router-dom';

const ShopCateMain = ()=>{
   
   
   
    return(
        <div className='shopCate-main-container'>

            <div className="shopCate-box-head">
                <div>상점</div>
                <div>더 보기</div>
            </div>{/* shopCate-box-head 끝*/}

            <div className="shopCate-store-box">
                <div><Link to='/shop/cate/store'>백년 손님 고깃집</Link></div>
                <div>룽바오네 마라탕</div>
                <div>마시리 카페</div>
                <div>마시리 카페</div>
            </div>{/* shopCate-store-box 끝*/}

            <div className="shopCate-box-head">
                <div>상품</div>
                <div>더 보기</div>
            </div>{/* shopCate-box-head 끝*/}
            <div className="shopBest-box">
                
                    <div className="shopBest-item">
                        <Link to='/shop/cate/product'>
                        <div className="shopBest-item-img">
                            <img src='/resources/shop/product/1/001.png'/>
                        </div>
                        <div className='shopBest-item-shop'>뜨끈 전골</div>
                        <div className='shopBest-item-product'>몸보신 전복 장어 전골</div>
                        <div className='shopBest-item-point'>35000 다손{" "}<HeartIcon/></div>
                        </Link>
                    </div>

                    <div className="shopBest-item">
                        <div className="shopBest-item-img">
                            <img src="/resources/shop/product/5/005.png"/>
                        </div>
                        <div className='shopBest-item-shop'>마시리 카페</div>
                        <div className='shopBest-item-product'>카페라떼(hot)</div>
                        <div className='shopBest-item-point'>5000 다손{" "}<HeartIcon/></div>
                    </div>

                    <div className="shopBest-item">
                        <div className="shopBest-item-img">
                            <img src="/resources/shop/product/6/006.png"/>
                        </div>
                        <div className='shopBest-item-shop'>화산루</div>
                        <div className='shopBest-item-product'>칠리 새우</div>
                        <div className='shopBest-item-point'>21000 다손{" "}<HeartIcon/></div>
                    </div>

                    <div className="shopBest-item">
                        <div className="shopBest-item-img">
                            <img src="/resources/shop/product/2/004.png"/>
                        </div>
                        <div className='shopBest-item-shop'>아사기 샐러드</div>
                        <div className='shopBest-item-product'>닭가슴살 치즈 샐러드</div>
                        <div className='shopBest-item-point'>13000 다손{" "}<HeartIcon/></div>
                    </div>
            </div>{/* shopCate-best-box 끝*/}
        </div>
    );
}

export default ShopCateMain;