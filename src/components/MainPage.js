import { Navigate } from 'react-router-dom';
import React from 'react';
import { useCookies } from 'react-cookie';

export const MainPage = () => {
    const [cookies] = useCookies(['email']);

    return (
        <div>
            <header className="App-header">
                <div className="navbar">
                    {cookies.email && <Navigate replace to="/loggedin" />}
                    <div className="login-button"><a href="/login">Login</a></div>
                    <div className="register-button"><a href="/register">Register</a></div>
                </div>
            </header>
        </div>
    );
};