import './shopBest.css';
import HeartIcon from './heart';

const ShopHeart = ()=>{
    return(
        <div className="shopBest-container">
            <div className="shopBest-title">userName님의 마음에 든 상품</div>
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

                <div className="shopBest-item">
                    <div className="shopBest-item-img">
                        <img src="../resources/shop/product/2/002.png"></img>
                    </div>
                    <div className='shopBest-item-shop'>아사기 샐러드</div>
                    <div className='shopBest-item-product'>딸기 리코타 샐러드</div>
                    <div className='shopBest-item-point'>13000 다손{" "}<HeartIcon/></div>
                </div>
            </div>
        </div>
    );
}

export default ShopHeart;