import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminBoardList from './adminBoardList';
import AdminBoardDelete from './adminBoardDelete';

const AdminBoard = ()=>{
    const { pathname } = useLocation();
    const subPath = pathname.split('/');

    console.log(subPath);
    return(
        <div className="board-container">
            {subPath.length == 3 ? subPath[1] === "admin" ? <AdminBoardList /> : <Outlet /> : 
            subPath.length == 2 ? <AdminBoardDelete /> : <Outlet />}
        </div> 
    );
}

export default AdminBoard;