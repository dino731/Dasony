import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './event.css';

const Event = ()=>{
    return(
        <div className="event-container">
            <Outlet />
        </div> 
    );
}

export default Event;