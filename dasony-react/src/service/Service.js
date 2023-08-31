import { Outlet, useLocation } from 'react-router-dom';
import './customer.css';
import Notice from './Notice';

const Service = () => {
    /** return은 Outlet으로만 랜더링할 것 (추가X) */
    const { pathname } = useLocation();
    const subPath = pathname.split('/');

    return(
        <>
            {subPath.length == 3 && subPath[subPath.length - 1] == "notice"? <Notice /> : <Outlet /> }
        </>
    );
};

export default Service;