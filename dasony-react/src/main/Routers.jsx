
import React from 'react';
import { Route } from 'react-router-dom';
import { IsAdmin, IsLogin } from './loginChk';
import PlzLogin from './PlzLogin';






//privateRoute : 로그인한 상태에서만 접근 가능
//AdminRoute : 관리자만 접근 가능
const PrivateRoute = ({component: Component, ...rest}) => {
    
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            IsLogin() ?
                <Component {...props} />
            : <Component PlzLogin />
        )} />
    );
};

const AdminRoute = ({component: Component, ...rest}) => {

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            IsAdmin() ?
            <Component {...props} />
            : <Component PlzLogin />
        )} />
    );
};

export  {PrivateRoute, AdminRoute};