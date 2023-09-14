import './ShopMain.css';
import ControlledCarousel from './shopBanner';
import { Link, useNavigate } from 'react-router-dom';
import HeartIcon from '../heart';
import {useState, useEffect} from 'react';
import axios from 'axios';

const ShopMain = ()=>{

    const userRegion = localStorage.getItem("loginUserRegion");

    const pathMap = {
        'B' : 'cafebakery',
        'L' : 'culture',
        'O' : 'eatout',
        'C' : 'convenient'
        }

    {/*샵 정보 설정 */}
    const [shopList, setShopList] = useState([]);
    {/*샵 리스트 가져오기 - 서버 */}
  const handleShopList = ()=> {
    axios.post('/dasony/api/shopList/', {userRegion:userRegion})
    .then(res => {
        setShopList(res.data.shopList);
    })
    .catch(err => {
        console.log(err);
        alert("다시 시도해주세요.");
    });
    };

    useEffect(()=>{
        handleShopList();
    },[])

    {/*해당 매장으로 이동 */}
    const navigate = useNavigate();
    const handleShopNavi = (s)=>{
        navigate(`/shop/cate/${pathMap[s.shopCate]}/${s.shopName}/product`, {state:{shopOkey:s.shopOkey}});
    }

    return(
        <div className="shop-container">

            <ControlledCarousel/>

            <div className="shop-cate">
                <div className='shop-title'>상품 카테고리</div>
                <div className='cate-box'>
                    <Link to='/shop/cate/cafebakery/main' state={{shopCate:'B'}}>카페<br/>베이커리</Link>
                    <Link to='/shop/cate/eatout/main' state={{shopCate:'O'}} style={{paddingTop:'6.5%'}}>외식</Link>
                    <Link to='/shop/cate/convenient/main' state={{shopCate:'C'}} style={{paddingTop:'6.5%'}}>편의점</Link>
                    <Link to='/shop/cate/culture/main' state={{shopCate:'L'}}>문화<br/>생활</Link>
                </div>
            </div>{/*shop-cate끝*/}

            <div className="shop-title">실시간 Best</div>
            <div className="shopBest-box">
                {/*<div className="shopBest-item">
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
                </div> */}

            </div>
            <div className="shop-new">
                <div className='shop-title'>새로 입점한 상점 </div>
                <div className='new-box'>
                {
                    shopList.splice(0, 3)
                            .map(s=>{
                                return(
                                    <div key={s.shopOkey} onClick={()=>{handleShopNavi(s);}}>{s.shopName}</div>
                                )
                            })
                }
                  
                </div>
            </div>{/*shop-new끝*/}
            
        </div>//shop-container끝
    );
}

export default ShopMain;