import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './auth/getUser';

export const Homepage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getUser().then(status => {
            if (status != 'loggedin') {
                navigate('/register');
            }
        });
    });

    return (
        <div className='swipe'>
            <header>Home</header>
            <div>
                <p> Matches </p>
                {localStorage.getItem('user')}
            </div>
        </div>

    );
};