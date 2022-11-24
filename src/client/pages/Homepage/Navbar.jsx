import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.scss";

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = ({ page, setPage }) => {
    const navigate = useNavigate();

    return (
        <nav className="d-flex justify-content-between align-items-center home-navbar">
            <Click>
                <span className="logo-name">OnlyFriends</span>
            </Click>

            <div>
                <div>
                    <Click onClick={e => navigate('/home')} style={{ color: page == 1 ? 'black' : 'grey' }}>
                        Search
                        <span className="selected-page" style={{ display: page == 1 || 'none' }} />
                    </Click>
                </div>
            </div>
            <div>
                <div>
                    <Click onClick={e => navigate('/home/messaging')} style={{ color: page == 2 ? 'black' : 'grey' }}>
                        Messages
                        <span className="selected-page" style={{ display: page == 2 || 'none' }} />
                    </Click>
                </div>
            </div>
            <div>
                <div>
                    <Click onClick={e => navigate('/home/settings')} style={{ color: page == 3 ? 'black' : 'grey' }}>
                        Profile
                        <span className="selected-page" style={{ display: page == 3 || 'none' }} />
                    </Click>
                </div>
            </div>

            <button className="logout-button" type="submit" onClick={() => navigate("/loginpage") || localStorage.removeItem('user')}>Logout</button>
        </nav >
    );
};

export const Click = ({ children, onClick, href = "", className = "", style, redirect }) => {
    const handleClick = (event) => {
        if (!redirect) {
            event.preventDefault();
            onClick && onClick(event);
        }
    };

    return (
        <>
            <a target={redirect ? '_blank' : ''} rel={redirect ? 'noreferrer noopener' : ''} style={style} className={className + " text-decoration-none"} onClick={handleClick} href={href}>
                {children}
            </a>
        </>
    );
};