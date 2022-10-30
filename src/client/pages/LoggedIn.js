import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LoggedIn = () => {
    const navigate = useNavigate();

    return (
        <div className="App" >
            <header className="App-header">
                <p>
                    YOU are logged in
                </p>
            </header>
        </div>
    );
};