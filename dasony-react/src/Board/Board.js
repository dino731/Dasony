import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Heart from '../heart';

const Board = ()=>{


    return(
        <div className='Board-origin-container'>
        <Outlet/>
        </div>
    );
}

export default Board;