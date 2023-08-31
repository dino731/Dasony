import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './event.css';
import ManagerEventBoard from './ManagerEventBoard';
import EventBoard from './EventBoard';

const Event = ()=>{
    const { pathname } = useLocation();
    const subPath = pathname.split('/');

    console.log(subPath);
    return(
        <div className="event-container">
            {subPath.length == 3 ? subPath[1] === "admin" ? <ManagerEventBoard /> : <Outlet /> : 
            subPath.length == 2 ? <EventBoard /> : <Outlet />}
        </div> 
    );
}

export default Event;