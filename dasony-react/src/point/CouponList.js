import './CouponList.css';
import { Link } from 'react-router-dom';

const CouponList = () => {
    return(
        <div className="coupon-container">
            <div className="coupon-title">userName님의 쿠폰</div>
                <div className="coupon-list">
                    
                <Link to='/shop/coupon/list/왜 안 되는데...'>
                    <div className="coupon-item">
                            <div className='coupon-img'>
                                <img src="/resources/shop/product/4/002.png"></img>
                            </div>
                            <div className='coupon-info'>
                                <div>심스니 반할 도넛</div>
                                <div>망고 톡톡 도넛</div>
                            </div>
                            <div className='coupon-date'>
                                2023-10-05까지
                            </div>
                    </div>
                    </Link>
                </div>

                <div className="coupon-list">
                    <div className="coupon-item">
                        <div className='coupon-img'>
                            <img src="/resources/shop/product/4/003.png"></img>
                        </div>
                        <div className='coupon-info'>
                            <div>심스니 반할 도넛</div>
                            <div>호두 초코 도넛</div>
                        </div>
                        <div className='coupon-date'>
                            2023-10-05까지
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default CouponList;