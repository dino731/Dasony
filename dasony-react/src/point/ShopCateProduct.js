import { useEffect, useLayoutEffect, useState } from "react";
import HeartIcon from "../heart";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './ShopCateProduct.css';


const ShopCateProduct = () => {
    
    const {store} = useParams();
    const [storeDisplay, setStoreDisplay] = useState('');
    const[storeTitle, setStoreTitle] = useState(store==null?'every':store);

    const navigate = useNavigate();

    const handleNoneStoreName = ()=> setStoreDisplay('none');
    const handleBlockStoreName = () => setStoreDisplay('block');

    const location = useLocation();

    useEffect(() => {
        
        if(storeTitle=='every'){
            handleNoneStoreName();
        }else {
            handleBlockStoreName();
        }
    }, [storeDisplay, location.pathname, storeTitle]);

    
    const handleNav = (event) => {
        
        const clickedElement = event.currentTarget;
        const storeName = clickedElement.querySelector('.shopBest-item-shop').textContent;
        const productName = clickedElement.querySelector('.shopBest-item-product').textContent;

        console.log('Shop Name:', storeName);
        console.log('Product Name:', productName);
        
        navigate(`/shop/cate/${storeName}/${productName}`);

    }
    return(
        <div className="shopCate-product-container">
            <div className="shopCate-store-title">
                <div>상품</div>
            </div>{/* shopCate-box-head 끝*/}
            <div className="title-for-product" style={{display:storeDisplay}}>
                <div>{storeTitle}</div>
            </div>{/* shopCate-box-head 끝*/}

            <div className="shopBest-box">
                
                
                    <div className="shopBest-item" onClick={handleNav}>
                            <div className="shopBest-item-img">
                                <img src='/resources/shop/product/1/001.png'/>
                            </div>
                            <div className='shopBest-item-shop'>뜨끈 전골</div>
                            <div className='shopBest-item-product'>몸보신 전복 장어 전골</div>
                            <div className='shopBest-item-point'>35000 다손{" "}<HeartIcon/></div>
                       
                    </div>

                    <div className="shopBest-item" onClick={handleNav}>
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

                    <div className="shopBest-item">
                        <div className="shopBest-item-img">
                            <img src="/resources/shop/product/1/003.png"/>
                        </div>
                        <div className='shopBest-item-shop'>뜨끈 전골</div>
                        <div className='shopBest-item-product'>만두 전골</div>
                        <div className='shopBest-item-point'>19000 다손{" "}<HeartIcon/></div>
                    </div>

                    <div className="shopBest-item">
                        <div className="shopBest-item-img">
                            <img src="/resources/shop/product/2/001.png"/>
                        </div>
                        <div className='shopBest-item-shop'>아사기 샐러드</div>
                        <div className='shopBest-item-product'>호밀 치즈 샐러드</div>
                        <div className='shopBest-item-point'>12000 다손{" "}<HeartIcon/></div>
                    </div>

                    <div className="shopBest-item">
                        <div className="shopBest-item-img">
                            <img src="/resources/shop/product/9/001.png"/>
                        </div>
                        <div className='shopBest-item-shop'>토종 신토불이야 국밥</div>
                        <div className='shopBest-item-product'>순대 국밥</div>
                        <div className='shopBest-item-point'>9000 다손{" "}<HeartIcon/></div>
                    </div>
            </div>{/* shopCate-best-box 끝*/}

        </div>
    );
}

export default ShopCateProduct;