import { Outlet, useLocation } from 'react-router-dom';
import './customer.css';
import Notice from './Notice';

const Service = () => {
    /** return은 Outlet으로만 랜더링할 것 (추가X) */
    const { pathname } = useLocation();
    const subPath = pathname.split('/');

    return(
        <>
            {subPath[2] == "notice"? <Notice /> : null }
        </>
    );
};

export default Service;