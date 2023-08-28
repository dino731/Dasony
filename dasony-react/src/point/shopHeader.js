import './shopHeader.css';
import { Link } from 'react-router-dom';

const ShopHeader = () => {
    
    return(
        <>
        <div className='shop-nav'>
            <div className="icon">
                <Link to='/shop/main'><i className="bi bi-shop-window"/></Link>
                <Link to='/shop/best'><i className="bi bi-hand-thumbs-up"/></Link>
                <Link to='/shop/coupon/list'><i className="bi bi-wallet2"/></Link>
                <Link to='/shop/heart'><i className="bi bi-heart"/></Link>
            </div>
            <div className='user-info'>
                <i className="bi bi-person"><span>userName</span></i>
                <i className="bi bi-coin"><span>1000000 다손</span></i>
            </div>
            
        </div>{/*shop-nav끝*/}
        </>
    );
}
export default ShopHeader;
