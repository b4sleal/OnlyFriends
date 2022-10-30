import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const navigate = useNavigate();

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