import { useEffect, useLayoutEffect, useState } from "react";
import HeartIcon from "../heart";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './ShopCateProduct.css';
import axios from 'axios';


const ShopCateProduct = () => {
    
    const {store} = useParams();
    const [storeDisplay, setStoreDisplay] = useState('');
    const[storeTitle, setStoreTitle] = useState(store==null?'every':store);

{/*상점 이름 설정 - 서버*/}
    const handleStoreTitle = (store) => {
        axios.post(`/dasony/api/shopTitle`, {store:store})
        .then(res=>{
            setStoreTitle(res.data);
        })
        .catch(err=>{
            console.log(err);
            alert("상점 정보를 불러오지 못했습니다.");
        })
    }

{/*상품 정보 불러오기 */}
    {/*상품 정보 설정 */}
    const [product, setProduct] = useState([]);
    {/*상품 정보 불러오기 - 서버*/}
    const handleProductInfo = () => {
        axios.post("/dasony/api/admin/productInfo", {shopOkey:store})
        .then(res=>{
            setProduct(res.data.product);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }

    const navigate = useNavigate();

    const handleNoneStoreName = ()=> setStoreDisplay('none');
    const handleBlockStoreName = () => setStoreDisplay('block');

    const location = useLocation();

    useEffect(() => {
        
        if(storeTitle=='every'){
            handleNoneStoreName();
        }else {
            handleStoreTitle(store);
            handleBlockStoreName();
        }

        handleProductInfo();
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
                {product.filter(p=>{return(p.shopOkey == store)})
                        .map((p, index)=>{
                            return(
                                <div key={p.productNo} className="shopBest-item" onClick={handleNav}>
                                    <div className="shopBest-item-img">
                                        <img src= {p.productImg}/>
                                    </div>
                                    <div className='shopBest-item-shop'>{storeTitle}</div>
                                    <div className='shopBest-item-product'>{p.productName}</div>
                                    <div className='shopBest-item-point'>
                                        {p.productAmount} 다손{" "}
                                        <HeartIcon productNo={p.productNo} shopOkey={p.shopOkey}/>
                                    </div>
                            
                            </div>
                            )
                        })}
                
                    

            </div>{/* shopCate-best-box 끝*/}

        </div>
    );
}

export default ShopCateProduct;