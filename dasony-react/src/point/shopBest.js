
import './shopBest.css';
import HeartIcon from "../heart";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ShopBest = ()=>{
    const userRegion = localStorage.getItem("loginUserRegion");

    const pathMap = {
        'B' : 'cafebakery',
        'L' : 'culture',
        'O' : 'eatout',
        'C' : 'convenient'
        }
    
{/*상품 정보 불러오기 */}
    {/*베스트 상품 정보 설정 */}
    const [bestProduct, setBestProduct] = useState([]);
    {/*베스트 상품 정보 불러오기 - 서버*/}
    const handleProductBestInfo = () => {
        console.log(bestProduct);
        axios.post("/dasony/api/productBestInfo", {userRegion:userRegion})
        .then(res=>{
            setBestProduct(res.data.product);
        })
        .catch(err=>{
            console.log(err);
            alert("다시 시도해주세요.");
        })
    }
    useEffect(()=>{
        handleProductBestInfo();
    }, [userRegion])

    return(
        <div className="shopBest-container">
            <div className="shopBest-title">실시간 Best</div>
            <div className="shopBest-box">
                {
                    bestProduct&&bestProduct.map(p=>{
                        return(
                            
                            <div className="shopBest-item">
                                <Link
                                    to={`/shop/cate/${pathMap[p.shopCate]}/${p.shopName}/${p.productName}`} 
                                    state= {{ product: p} }
                                >
                                    <div className="shopBest-item-img">
                                        <img src={p.productImg}></img>
                                    </div>
                                    <div className='shopBest-item-shop'>{p.shopName}</div>
                                    <div className='shopBest-item-product'>{p.productName}</div>
                                </Link>
                                <div className='shopBest-item-point'>{p.productAmount} 다손{" "}<HeartIcon  product={p}/></div>
                            </div>
                        )
                    })
                    .splice(0,100)
                    
                }
            </div>
        </div>
    );
}
export default ShopBest;