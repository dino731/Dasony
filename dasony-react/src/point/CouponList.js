import './CouponList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CouponList = () => {
    const userNo = localStorage.getItem("loginUserNo");

    const statusMap = {
        'Y': '사용 완료',
        'N': '미사용'
    }

    const [couponList, setCouponList] = useState([]);
    const [product, setProduct] = useState([]);

    const handleCouponList = () => {
        axios.post('/dasony/api/couponList', { userNo: userNo })
            .then(res => {
                setCouponList(res.data.couponList);
                setProduct(res.data.productMap.product);
            })
            .catch(err => {
                console.error(err);
                alert("다시 시도해주세요");
            });
    }

    useEffect(() => {
        if (!couponList.length || !product.length) {
            handleCouponList();
        }

        console.log(couponList);
        console.log(product);
    }, [userNo]);

    return (
        <div className="coupon-container">
            <div className="coupon-title">userName님의 쿠폰</div>
            {couponList.length === 0 ? (
                <span style={{ width: '300px', textAlign: 'left', fontWeight: 900, fontSize: '30px', letterSpacing: '0.2vw' }}>
                    아직 준비중입니다.
                </span>
            ) : (
                couponList.map((coupon) => (
                    <div key={coupon.couponNo} className="coupon-list">
                        {product
                            .filter(p => p.productNo === coupon.productNo)
                            .map(p => (
                                <Link key={p.productNo} to={`/shop/coupon/${coupon.couponOkey}`} state={{ coupon: coupon, product:p }}>
                                    <div className="coupon-item">
                                        <div className="coupon-img">
                                            <img src={p.productImg} alt={p.productName} />
                                        </div>
                                        <div className="coupon-info">
                                            <div>{coupon.productName}</div>
                                            <div>{coupon.couponName}</div>
                                        </div>
                                        <div className="coupon-date">{coupon.couponExpireDate}까지</div>
                                        <div className="coupon-use">{statusMap[coupon.couponUseStatus]}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                ))
            )}
        </div>
    );
}

export default CouponList;