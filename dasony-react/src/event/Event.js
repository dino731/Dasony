import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import ShopBest from './shopBest';
// import './event.css';

const Event = ()=>{
    return(
        <div className="event-container container">
            <Outlet />
        </div> 
    );
}

export default Event;