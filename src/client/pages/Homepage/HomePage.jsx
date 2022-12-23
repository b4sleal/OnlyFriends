import React, { useEffect, useState, useReducer } from 'react';
import { Messaging } from './Messaging';
import { Match } from './Matching/Match';
import { Settings } from './Settings';
import { Navbar } from './Navbar';

import './HomePage.scss';

export const HomePage = ({ initPage }) => {
    const [page, setPage] = useState(initPage);

    return (
        <div className="section-container">
            <Navbar page={page} setPage={setPage} />

            <div className="pages-container">
                <div className="match-container position-relative" style={{ display: page == 1 ? 'flex' : 'none' }}>
                    <Match />
                </div>

                <div className="messaging-container" style={{ display: page == 2 || 'none' }}>
                    <Messaging />
                </div>

                <div className="settings-container" style={{ display: page == 3 || 'none' }}>
                    <Settings />
                </div>
            </div>
        </div>
    );
};