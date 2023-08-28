import './ShopMyCoupon.css';

const ShopMyCoupon = () => {
    return(
        <>
        <div className="shopMyCoupon-container">
            <div className="myCoupon-info">
                <div className='myCoupon-img'>
                    <img src='/resources/shop/product/4/004.png'/>
                </div>
                <div className='myCoupon-info-head'>
                    상점 이름
                </div>
                
                <div className='myCoupon-info-middle'>
                    상품 이름
                </div>
                
            </div>
            <div className="myCoupon-code"> 
                <div>
                    바코드입니다.
                </div>
                <div>0840651061064 코드 번호 복사</div>
                <span>유효 기간 2023-10-05까지</span>
                <div>카카오톡으로 공유하기 <i className="bi bi-wechat"/></div>
            </div>
            
        </div>
        <div className='coupon-alert1'>쿠폰은 교환, 환불, 연장이 불가능합니다.</div>
        <div className='coupon-alert2'>1+1, 2+1, 덤 증정, 할인 등의 행사 적용은 되지 않을 수 있습니다.</div>
        </>
    );
}

export default ShopMyCoupon;